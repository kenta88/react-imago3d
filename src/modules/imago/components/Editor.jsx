import React from 'react';
import autobind from 'autobind-decorator';
import * as THREE from 'three';
import { connect } from 'react-redux';
import UUID from 'uuid/v4';

import {
    getIsAddingMode,
    getCurrentObject,
    getObjects,
    getIsEditMode,
} from '../../../reducers/editor';
import {
    addObject,
    editObject,
} from '../../../actions/editor';

import Canvas from './Canvas';
import Lights from './Lights';
import Grid from './Grid';
import BoundingBox from './BoundingBox';
import Ensemble from './Ensemble';
import OrtographicCamera from './OrtographicCamera';

type Props = {
    width: number,
    height: number,
    isAddingMode: boolean,
    isEditMode: boolean, // eslint-disable-line
    currentObject: Object,
    objects: Array<Object>, // eslint-disable-line
    addObject: (Object) => void,
    editObject: (Object) => void, // eslint-disable-line
};

@connect(
    store => ({
        isAddingMode: getIsAddingMode(store),
        currentObject: getCurrentObject(store),
        objects: getObjects(store),
        isEditMode: getIsEditMode(store),
    }),
    {
        addObject,
        editObject,
    }
)
class Editor extends React.Component {

    constructor(props: Props) {
        super(props);
        this.fog = new THREE.Fog(0xcce0ff, 500, 10000);
        this.camera = null;
        this.scene = null;
        this.grid = null;
        this.plane = null;
        this.planeRaycaster = new THREE.Raycaster();
        this.intersected = null;
        this.boundingBox = null;
        this.mouse = new THREE.Vector2();
        this.auxVector2 = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.objects = [];
        this.vertexHelper = [];
        this.mouseDown = false;

        this.renderedItems = [];

        this.state = {
            controlsEnabled: true,
            currentObject: this.props.currentObject,
            current3dItem: null,
        };
    }

    componentDidMount() {
        this.canvas.addEventListener('mousemove', () => {
            this.onMouseMove(event);
        }, false);
        this.canvas.addEventListener('dblclick', () => {
            this.onMouseDbClick(event);
        }, false);
        this.canvas.addEventListener('click', () => {
            this.onMouseClick(event);
        }, false);
        this.canvas.addEventListener('mousedown', () => {
            this.mouseDown = true;
        }, false);
        this.canvas.addEventListener('mouseup', () => {
            this.mouseDown = false;
        }, false);
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log('isEditMode', nextProps.isEditMode);
        if (nextProps.currentObject !== this.props.currentObject) {
            this.setState({
                currentObject: nextProps.currentObject
            });
        }

        if (nextProps.isAddingMode !== this.props.isAddingMode) {
            // const cursor = (nextProps.isAddingMode) ? 'none' : 'auto';
            // document.body.style.cursor = cursor;
            this.setState({
                controlsEnabled: !nextProps.isAddingMode,
            });
        }
    }

    onMouseMove(event) {
        event.preventDefault();
        const relativeMouseCoords = this.getRelativeMouseCord(event);
        if (this.props.isAddingMode) {
            this.movingBoundigBox(relativeMouseCoords);
        }
        if (this.props.isEditMode) {
            this.highlightVertex(relativeMouseCoords);
        }
        if (!this.props.isAddingMode && !this.props.isEditMode) {
            this.highlightObjects(relativeMouseCoords);
        }
    }

    onMouseDbClick(event) {
        event.preventDefault();
        if (this.props.isAddingMode) {
            this.addObject();
        }
    }

    onMouseClick(event) {
        event.preventDefault();
        if (!this.props.isAddingMode && !this.props.isEditMode) {
            this.editObject();
        }
    }

    @autobind
    onItemsRendered(refs) {
        this.renderedItems = refs;
    }

    getRelativeMouseCord(event) {
        const containerRect = event.target.getBoundingClientRect();
        let relativeMouseCoords = new THREE.Vector2();
        relativeMouseCoords.x = event.clientX;
        relativeMouseCoords.y = event.clientY;
        relativeMouseCoords = relativeMouseCoords.clone()
        .sub(this.auxVector2.set(containerRect.left, containerRect.top))
        .divide(this.auxVector2.set(containerRect.width, containerRect.height));
        relativeMouseCoords.x = (relativeMouseCoords.x * 2) - 1;
        relativeMouseCoords.y = (-relativeMouseCoords.y * 2) + 1;
        return relativeMouseCoords;
    }

    movingBoundigBox(relativeMouseCoords) {
        const currentObject = this.state.currentObject;
        this.mouse.x = relativeMouseCoords.x;
        this.mouse.y = relativeMouseCoords.y;
        this.raycaster.setFromCamera(this.mouse.clone(), this.camera);

        const gridIntersect = this.raycaster.intersectObject(this.grid, true)[0];

        if (gridIntersect) {
            const vector = gridIntersect.point;
            Object.keys(vector).forEach((coord) => {
                if (coord !== 'y') {
                    let n = gridIntersect.point[coord];
                    n = Math.ceil(n / 5.0) * 5.0;
                    n = !(n % 10) ? n + 5 : n;
                    gridIntersect.point[coord] = n;
                }
            });
            gridIntersect.point.y = currentObject.position.y;
            currentObject.position = gridIntersect.point;
            // get the items with the same type
            const boundingBoxCollide = this.renderedItems ? this.renderedItems.some((item3d) => {
                const logicObj = this.props.objects.find((logicItem) => {
                    return logicItem.uuid === item3d.name;
                });
                if (logicObj.type === currentObject.type) {
                    return item3d.position.equals(this.boundingBox.position);
                }
                return false;
            }) : [];
            // the object collide with another one
            currentObject.notAllowed = false;
            if (boundingBoxCollide) {
                currentObject.notAllowed = true;
            }
            this.setState({
                currentObject,
            }, () => {
                if (this.mouseDown && !this.state.currentObject.notAllowed) {
                    this.addObject();
                }
            });
        }
    }

    highlightObjects(relativeMouseCoords) {
        this.mouse.x = relativeMouseCoords.x;
        this.mouse.y = relativeMouseCoords.y;
        this.raycaster.setFromCamera(this.mouse.clone(), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length) {
            if (intersects[0].object.name !== 'grid') {
                if (this.intersected) {
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                }
                this.intersected = intersects[0].object;
                this.intersected.currentHex = this.intersected.material.emissive.getHex();
                this.intersected.material.emissive.setHex(0xff0000);
                document.body.style.cursor = 'pointer';
            } else {
                if (this.intersected) {
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                }
                this.intersected = null;
                document.body.style.cursor = 'auto';
            }
        } else {
            if (this.intersected) {
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
            }
            this.intersected = null;
            document.body.style.cursor = 'auto';
        }
    }

    addObject() {
        const uuid = UUID();
        this.props.addObject({
            ...this.state.currentObject,
            uuid,
        });
    }

    addVertexHelper() {
        this.plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(150, 150, 150, 1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.1,
            depthWrite: false,
            side: THREE.DoubleSide,
        }));
        this.plane.visible = true;
        this.scene.add(this.plane);
        const object = this.intersected;
        this.vertexHelpers = [];
        for (let i = 0; i < object.geometry.vertices.length; i++) {
            const sphere = new THREE.Mesh(
                new THREE.SphereGeometry(0.5, 0.5, 0.5, 8, 8),
                new THREE.MeshLambertMaterial({ color: 0x000000 })
            );
            const vertexHelper = sphere.clone();
            const vertexPosition = object.geometry.vertices[i];
            vertexHelper.position.copy(vertexPosition).add(object.position);
            vertexHelper.visible = true;
            object.vertexHelpers = this.vertexHelpers;
            this.scene.add(vertexHelper);
            this.vertexHelpers.push(vertexHelper);
        }
    }

    editObject() {
        if (this.intersected) {
            document.body.style.cursor = 'auto';
            this.addVertexHelper();
            const objectToEdit = this.props.objects.find((obj) => { // eslint-disable-line
                return obj.uuid === this.intersected.name;
            });
            this.setState({
                current3dItem: this.intersected,
            });

            const {
                x,
                z,
            } = this.intersected.position;

            this.camera.position.x = x - 150;
            this.camera.position.z = z - 150;
            this.camera.position.y = 100;
            this.controls.target = this.intersected.position.clone();
            this.camera.lookAt(this.intersected.position);
            this.controls.controlsEnabled = false;
            this.controls.update();
            this.props.editObject(objectToEdit);
        }
    }

    render() {
        return (
            <Canvas
                width={this.props.width}
                height={this.props.height}
                fog={this.fog}
                canvasRef={(canvas) => {
                    this.canvas = canvas;
                }}
            >
                <scene
                    fog={this.fog}
                    ref={(scene) => {
                        this.scene = scene;
                    }}
                >
                    <Lights />
                    <BoundingBox
                        object={this.state.currentObject}
                        isVisible={this.props.isAddingMode}
                        onRef={(boundingBox) => {
                            this.boundingBox = boundingBox;
                        }}
                    />
                    <Ensemble
                        objects={this.props.objects}
                        onItemsRendered={this.onItemsRendered}
                        scene={this.scene}
                    />
                    <Grid
                        onRef={(grid) => {
                            this.grid = grid;
                        }}
                    />
                    <OrtographicCamera
                        name="camera"
                        width={this.props.width}
                        height={this.props.height}
                        onRef={(camera, controls) => {
                            this.camera = camera;
                            this.controls = controls;
                        }}
                        controlsEnabled={this.state.controlsEnabled}
                    />
                </scene>
            </Canvas>
        );
    }
}

export default Editor;
