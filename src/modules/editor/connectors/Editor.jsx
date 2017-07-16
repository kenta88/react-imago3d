import React from 'react';
import autobind from 'autobind-decorator';
import 'aframe';
import {
    Entity,
} from 'aframe-react';
import {
    Row,
    Col,
} from 'react-materialize';

import '../aframe-components/orthographicCamera';
import Layout from '../../../connectors/Layout';
import EditorScene from '../components/editorScene';
import Grid from '../components/grid';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasContainerSize: null,
        };
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
                                >
                                    <Grid />
                                    <Entity
                                        orthocamera={{
                                            width,
                                            height,
                                        }}
                                    />
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
