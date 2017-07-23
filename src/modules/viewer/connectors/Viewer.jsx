import React from 'react';
import autobind from 'autobind-decorator';
import {
    Scene,
    Entity,
} from 'aframe-react';

import Environment from '../../editor/components/environment';
import SunLight from '../../editor/components/sunLight';
import AmbientLight from '../../editor/components/ambientLight';

class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: null,
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
    render() {
        return (
            <Scene
                inspector={{
                    url: 'https://aframe.io/aframe-inspector/dist/aframe-inspector.js',
                }}
                vr-mode-ui={{ enabled: true }}
                shadow
                fog={{
                    type: 'linear',
                    color: 0xcce0ff,
                    density: 0.3,
                }}
                events={{
                    'render-target-loaded': this.onCanvasReady,
                }}
            >
                <Environment
                    isViewer
                    canvas={this.state.canvasRef}
                    onItemsRendered={() => {}}
                />
                <Entity
                    camera={{
                        userHeight: 12,
                    }}
                    look-controls
                    wasd-controls={{
                        acceleration: 500,
                    }}
                />
                <SunLight />
                <AmbientLight />
            </Scene>
        );
    }
}

export default Viewer;
