import React from 'react';
import { connect } from 'react-redux';
import {
    Scene,
} from 'aframe-react';

import {
    exitAddingMode,
    exitEditingMode,
} from '../../../actions/editor';

type Props = {
    width: number,
    height: number,
    children: React.PropTypes.node,
    onCanvasReady: () => void,
    exitAddingMode: (Object) => void,
    exitEditingMode: (Object) => void,
};

@connect(
    null,
    {
        exitAddingMode,
        exitEditingMode,
    }
)
class EditorScene extends React.Component {
    constructor(props: Props) {
        super(props);
        this.canvas = null;
        this.state = {};
    }

    bindEvents() {
        window.addEventListener('keydown', () => {
            // esc
            if (event.keyCode === 27) {
                this.props.exitAddingMode();
                this.props.exitEditingMode();
            }
        }, false);
    }

    render() {
        const {
            width,
            height,
        } = this.props;
        return (
            <Scene
                inspector={{
                    url: 'https://aframe.io/aframe-inspector/dist/aframe-inspector.js',
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
                        this.canvas = event.target.canvas;
                        this.props.onCanvasReady(event);
                        this.bindEvents();
                    },
                }}
            >
                {this.props.children}
            </Scene>
        );
    }
}

export default EditorScene;
