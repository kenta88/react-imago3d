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

    @autobind
    onCanvasReady(event) {
        this.canvas = event.target.canvas;
        this.camera = event.target.camera;
        this.setState({
            canvasRef: this.canvas,
        });
    }
    @autobind
    onItemsRendered(renderedObject: Array<Object>) {
        this.setState({
            renderedObject,
        });
    }
    @autobind
    onRefCanvasContainer(container) {
        if (container) {
            const canvasContainer = container.querySelector('#canvasContainer');
            this.setState({
                canvasContainerSize: canvasContainer.getBoundingClientRect(),
            });
        }
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
                                        canvas={this.state.canvasRef}
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
