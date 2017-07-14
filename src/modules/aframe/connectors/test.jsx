import React from 'react';
import autobind from 'autobind-decorator';
import 'aframe';
import {
    Entity,
    Scene,
} from 'aframe-react';
import {
    Row,
    Col,
} from 'react-materialize';

import '../helper/ortographicCamera';
import Layout from '../../../connectors/Layout';

class Test extends React.Component {
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
                                <Scene
                                    width={width}
                                    height={height}
                                    fog={{
                                        type: 'linear',
                                        color: 0xcce0ff,
                                        density: 0.3,
                                    }}
                                >
                                    <Entity
                                        geometry={{
                                            primitive: 'plane',
                                            width: 1000,
                                            height: 1000,
                                            segmentsWidth: 100,
                                            segmentsHeight: 100,
                                        }}
                                        material={{
                                            color: 0x000000,
                                            opacity: 0.1,
                                            wireframe: true,
                                            transparent: true,
                                        }}
                                        position={{ x: 0, y: 0, z: -5 }}
                                        rotation={{ x: -90, y: 0, z: 0 }}
                                    />
                                    <Entity
                                        orto={{
                                            width,
                                            height,
                                        }}
                                    />
                                </Scene>
                            ) : null}
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default Test;
