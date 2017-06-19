import React from 'react';
import autobind from 'autobind-decorator';
import {
    Row,
    Col,
} from 'react-materialize';

import Layout from '../../../connectors/Layout';
import Canvas from '../components/Canvas';

class Imago3d extends React.Component {
    constructor() {
        super();
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
                                    width={this.state.canvasContainerSize.width - 24}
                                    height={window.innerHeight - 84}
                                />
                            ) : null}
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default Imago3d;
