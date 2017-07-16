import React from 'react';
import {
    Scene,
} from 'aframe-react';

type Props = {
    width: number,
    height: number,
    children: React.PropTypes.node,
    onCanvasReady: () => void,
};

class EditorScene extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            width,
            height,
        } = this.props;
        return (
            <Scene
                inspector={{
                    url: 'https://aframe.io/releases/0.3.0/aframe-inspector.min.js',
                }}
                vr-mode-ui={{ enabled: false }}
                light={{
                    defaultLightsEnabled: true,
                }}
                width={width}
                height={height}
                shadow
                fog={{
                    type: 'linear',
                    color: 0xcce0ff,
                    density: 0.3,
                }}
                events={{
                    'render-target-loaded': (event) => {
                        console.log('renderer ready', event.target.canvas);
                        this.props.onCanvasReady(event.target.canvas);
                    },
                }}
                _ref={(scene) => {
                    console.log('here the canvas');
                    console.log(scene.canvas);
                }}
            >
                {this.props.children}
            </Scene>
        );
    }
}

export default EditorScene;
