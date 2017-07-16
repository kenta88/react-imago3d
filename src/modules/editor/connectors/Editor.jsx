import React from 'react';
import autobind from 'autobind-decorator';
import 'aframe';
import {
    Row,
    Col,
} from 'react-materialize';

import Layout from '../../../connectors/Layout';
import EditorScene from '../components/editorScene';
import Grid from '../components/grid';
import OrthoCamera from '../components/orthoCamera';
import GhostObject from '../components/ghostObject';
import SunLight from '../components/sunLight';
import Environment from '../components/environment';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: null,
            canvasContainerSize: null,
            renderedObject: [],
        };
    }

    @autobind
    onCanvasReady(canvas) {
        this.setState({
            canvasRef: canvas,
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
        const canvasContainer = container.querySelector('#canvasContainer');
        this.setState({
            canvasContainerSize: canvasContainer.getBoundingClientRect(),
        });
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
