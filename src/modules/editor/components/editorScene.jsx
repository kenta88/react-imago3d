import React from 'react';
import {
    Scene,
} from 'aframe-react';

type Props = {
    width: number,
    height: number,
    children: React.PropTypes.node,
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
                vr-mode-ui={{ enabled: false }}
                width={width}
                height={height}
                fog={{
                    type: 'linear',
                    color: 0xcce0ff,
                    density: 0.3,
                }}
                events={{
                    'render-target-loaded': (event) => {
                        console.log('renderer ready', event);
                    },
                }}
                _ref={(scene) => {
                    console.log(scene.canvas);
                }}
            >
                {this.props.children}
            </Scene>
        );
    }
}

export default EditorScene;
