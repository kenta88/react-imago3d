import React from 'react';
import autobind from 'autobind-decorator';
import {
    Row,
    Col,
} from 'react-materialize';

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
        console.log(width, height);
        return (
            <Layout>
                <div ref={this.onRefCanvasContainer}>
                    <Row>
                        <Col
                            s={12}
                            id="canvasContainer"
                        >
                            {this.state.canvasContainerSize ? (
                                <h2>test is ready</h2>
                            ) : null}
                        </Col>
                    </Row>
                </div>
            </Layout>
        );
    }
}

export default Test;
