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
            <div>
                <Scene
                    vr-mode-ui={{ enabled: true }}
                    shadow
                    width={300}
                    height={300}
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
                        rotation={{
                            x: 0,
                            y: 0,
                            z: 0,
                        }}
                        position={{
                            x: -4,
                            y: 12,
                            z: 74,
                        }}
                        look-controls
                        wasd-controls={{
                            acceleration: 500,
                        }}
                    />
                    <SunLight />
                    <AmbientLight />
                </Scene>
            </div>
        );
    }
}

export default Viewer;
