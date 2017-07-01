import React from 'react';
import autobind from 'autobind-decorator';
import {
    Row,
    Col,
} from 'react-materialize';

import Layout from '../../../connectors/Layout';
import Editor from '../components/Editor';

type Props = {
    editorStore: Object,
    exitEditMode: () => void,
};


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
                                <Editor
                                    width={width}
                                    height={height}
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
