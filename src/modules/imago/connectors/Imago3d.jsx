import React from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import * as THREE from 'three';
import {
    Row,
    Col,
} from 'react-materialize';

import Layout from '../../../connectors/Layout';
import Canvas from '../components/Canvas';
import Lights from '../components/Lights';
import Floor from '../components/Floor';
import Editor from '../components/Editor';
import OrtographicCamera from '../components/OrtographicCamera';
import PerspectiveCamera from '../components/PerspectiveCamera';
import { getAddingCube } from '../../../reducers/editor';

type Props = {
    isAddingCube: boolean,
};

@connect(
    store => ({
        isAddingCube: getAddingCube(store),
    }),
)
class Imago3d extends React.Component {
    constructor(props: Props) {
        super(props);
        this.camera = null;
        this.floor = null;
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
        const fog = new THREE.Fog(0xcce0ff, 500, 10000);
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
                                <Canvas
                                    width={width}
                                    height={height}
                                    fog={fog}
                                >
                                    <scene
                                        fog={fog}
                                    >
                                        <Lights />
                                        <Editor
                                            isAddingCube={this.props.isAddingCube}
                                            camera={this.camera}
                                            floor={this.floor}
                                        />
                                        <Floor
                                            onRef={(floor) => {
                                                this.floor = floor;
                                            }}
                                        />
                                        <OrtographicCamera
                                            name="camera"
                                            width={width}
                                            height={height}
                                            onRef={(camera) => {
                                                this.camera = camera;
                                            }}
                                        />
                                        <PerspectiveCamera
                                            isActive={false}
                                            name="cameraxx"
                                            width={width}
                                            height={height}
                                        />
                                    </scene>
                                </Canvas>
                            ) : null}
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default Imago3d;
