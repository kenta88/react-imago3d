import React from 'react';
import autobind from 'autobind-decorator';
import * as THREE from 'three';
import { connect } from 'react-redux';
import 'aframe';
import {
    Row,
    Col,
} from 'react-materialize';

import {
    getIsAddingMode,
    getIsEditMode,
    getCurrentObject,
    getObjects,
} from '../../../reducers/editor';
import {
    editObject,
    deleteObject,
    exitEditingMode,
} from '../../../actions/editor';
import Layout from '../../../connectors/Layout';
import EditorScene from '../components/editorScene';
import Grid from '../components/grid';
import OrthoCamera from '../components/orthoCamera';
import GhostObject from '../components/ghostObject';
import SunLight from '../components/sunLight';
import AmbientLight from '../components/AmbientLight';
import Environment from '../components/environment';
import getRelativeMouseCoords from '../helper/getRelativeMouseCoords';

type Props = {
    isAddingMode: boolean,
    isEditMode: boolean,
    currentObject: Object, // eslint-disable-line
    objects: Array<Object>,// eslint-disable-line
    editObject:() => void,// eslint-disable-line
    deleteObject:() => void,// eslint-disable-line
    exitEditingMode:() => void,// eslint-disable-line
};

@connect(
    store => ({
        isAddingMode: getIsAddingMode(store),
        isEditMode: getIsEditMode(store),
        currentObject: getCurrentObject(store),
        objects: getObjects(store),
    }),
    {
        editObject,
        deleteObject,
        exitEditingMode,
    }
)

class Editor extends React.Component {
    constructor(props: Props) {
        super(props);
        this.canvas = null;
        this.camera = null;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.highlightedObject = null;

        this.state = {
            canvasRef: null,
            canvasContainerSize: null,
            renderedObject: [],
        };
    }

    onMouseMove(event) {
        event.preventDefault();
        const relativeMouseCoords = getRelativeMouseCoords(event, this.canvas);
        if (!this.props.isAddingMode && !this.props.isEditMode) {
            this.highlightObjects(relativeMouseCoords);
        }
    }

    onMouseDbClick(event) {
        event.preventDefault();
        if (!this.props.isAddingMode && !this.props.isEditMode && this.highlightedObject) {
            this.editObject();
        }
    }

    @autobind
    onCanvasReady(event) {
        this.canvas = event.target.canvas;
        this.camera = event.target.camera;
        this.setState({
            canvasRef: this.canvas,
        });
        this.bindEvent();
    }
    @autobind
    onItemsRendered(renderedObject: Array<Object>) {
        this.setState({
            renderedObject,
        });
    }
    @autobind
    onRefCanvasContainer(container) {
        const canvasContainer = container.querySelector('#canvasContainer');
        this.setState({
            canvasContainerSize: canvasContainer.getBoundingClientRect(),
        });
    }

    highlightObjects(relativeMouseCoords) {
        this.mouse.x = relativeMouseCoords.x;
        this.mouse.y = relativeMouseCoords.y;
        this.raycaster.setFromCamera(this.mouse.clone(), this.camera);
        const renderedObject3D = this.state.renderedObject.map((obj) => {
            return obj.object3D;
        });
        const intersects = this.raycaster.intersectObjects(renderedObject3D, true);
        if (intersects.length) {
            if (this.highlightedObject) {
                this.highlightedObject.material.color.setHex(this.highlightedObject.color);
            }
            this.highlightedObject = intersects[0].object;
            this.highlightedObject.color = this.highlightedObject.material.color.getHex();
            this.highlightedObject.material.color.setHex(0xff0000);
        } else {
            if (this.highlightedObject) {
                this.highlightedObject.material.color.setHex(this.highlightedObject.color);
            }
            this.highlightedObject = null;
        }
    }

    editObject() {
        if (this.highlightedObject) {
            const uuidToFind = this.highlightedObject.parent.el.getAttribute('uuid');
            const objectToEdit = this.props.objects.find((obj) => { // eslint-disable-line
                return obj.uuid === uuidToFind;
            });
            this.props.editObject(objectToEdit);
            this.highlightedObject.material.color.setHex(this.highlightedObject.color);
            this.highlightedObject = null;
        }
    }

    deleteObject() {
        const currentObject = this.props.currentObject;
        if (this.props.isEditMode && currentObject) {
            this.props.deleteObject(currentObject.uuid);
            this.props.exitEditingMode();
        }
    }

    bindEvent() {
        this.canvas.addEventListener('mousemove', () => {
            this.onMouseMove(event);
        }, false);
        this.canvas.addEventListener('dblclick', () => {
            this.onMouseDbClick(event);
        }, false);
        window.addEventListener('keydown', () => {
            // back || canc - delete object
            if (event.keyCode === 8 || event.keyCode === 46) {
                this.deleteObject();
            }
        }, false);
    }

    render() {
        let width = 0;
        let height = 0;
        if (this.state.canvasContainerSize) {
            width = this.state.canvasContainerSize.width - 24;
            height = window.innerHeight - 84;
        }
        return (
            <Layout>
                <div ref={this.onRefCanvasContainer}>
                    <Row>
                        <Col
                            s={12}
                            id="canvasContainer"
                        >
                            {this.state.canvasContainerSize ? (
                                <EditorScene
                                    width={width}
                                    height={height}
                                    onCanvasReady={this.onCanvasReady}
                                >
                                    <Grid />
                                    <OrthoCamera
                                        width={width}
                                        height={height}
                                    />
                                    <GhostObject
                                        canvas={this.state.canvasRef}
                                        renderedObject={this.state.renderedObject}
                                    />
                                    <Environment
                                        onItemsRendered={this.onItemsRendered}
                                    />
                                    <SunLight />
                                    <AmbientLight />
                                </EditorScene>
                            ) : null}
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default Editor;
