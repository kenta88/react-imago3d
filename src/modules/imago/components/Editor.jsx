import React from 'react';
import * as THREE from 'three';
import { connect } from 'react-redux';
import UUID from 'uuid/v4';

import {
    getIsAddingMode,
    getCurrentObject,
    getObjects,
} from '../../../reducers/editor';
import {
    addObject,
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
    currentObject: Object,
    objects: Array<Object>, // eslint-disable-line
    addObject: (Object) => void,
};

@connect(
    store => ({
        isAddingMode: getIsAddingMode(store),
        currentObject: getCurrentObject(store),
        objects: getObjects(store),
    }),
    {
        addObject,
    }
)
class Editor extends React.Component {

    constructor(props: Props) {
        super(props);
        this.fog = new THREE.Fog(0xcce0ff, 500, 10000);
        this.camera = null;
        this.scene = null;
        this.grid = null;
        this.intersected = null;
        this.mouse = new THREE.Vector2();
        this.auxVector2 = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.objects = [];

        this.state = {
            currentObject: this.props.currentObject,
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
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.currentObject !== this.props.currentObject) {
            this.setState({
                currentObject: nextProps.currentObject
            });
        }
    }

    onMouseMove(event) {
        event.preventDefault();
        const relativeMouseCoords = this.getRelativeMouseCord(event);
        if (this.props.isAddingMode) {
            this.movingBoundigBox(relativeMouseCoords);
        }
        if (!this.props.isAddingMode) {
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
        if (!this.props.isAddingMode) {
            this.editObject();
        }
    }

    onItemsRendered(refs) {
        console.log(refs, this.state);
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
        const intersects = this.raycaster.intersectObject(this.grid, true);
        if (intersects.length) {
            const vector = intersects[0].point;
            Object.keys(vector).forEach((coord) => {
                if (coord !== 'y') {
                    const n = intersects[0].point[coord];
                    intersects[0].point[coord] = Math.ceil(n / 5.0) * 5;
                }
            });
            intersects[0].point.y = currentObject.position.y;
            currentObject.position = intersects[0].point;
            this.setState({
                currentObject,
            });
        }
    }

    highlightObjects(relativeMouseCoords) {
        this.mouse.x = relativeMouseCoords.x;
        this.mouse.y = relativeMouseCoords.y;
        this.raycaster.setFromCamera(this.mouse.clone(), this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length) {
            if (intersects[0].object.name.length) {
                if (this.intersected) {
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                }
                this.intersected = intersects[0].object;
                this.intersected.currentHex = this.intersected.material.emissive.getHex();
                this.intersected.material.emissive.setHex(0xff0000);
            } else {
                if (this.intersected) {
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                }
                this.intersected = null;
            }
        } else {
            if (this.intersected) {
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
            }
            this.intersected = null;
        }
    }

    addObject() {
        const uuid = UUID();
        this.props.addObject({
            ...this.state.currentObject,
            uuid,
        });
        this.setState({
            currentObject: null,
        });
    }

    editObject() {
        console.log(this.intersected);
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
                    />
                    <Ensemble
                        objects={this.props.objects}
                        onItemsRendered={this.onItemsRendered}
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
                        onRef={(camera) => {
                            this.camera = camera;
                        }}
                        controlsEnabled
                    />
                </scene>
            </Canvas>
        );
    }
}

export default Editor;
