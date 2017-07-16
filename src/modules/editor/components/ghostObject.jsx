import React from 'react';
import {
    Entity,
} from 'aframe-react';

import getRelativeMouseCoords from '../helper/getRelativeMouseCoords';

type Props = {
    canvas: Object,
};

class GhostObject extends React.Component {
    constructor(props: Props) {
        super(props);
        this.mainEntity = null;
        this.canvas = null;
        this.state = {};
    }
    componentWillReceiveProps(nextProps: Props) {
        if (!this.canvas && nextProps.canvas) {
            this.canvas = nextProps.canvas;
            this.bindEvent();
        }
    }

    onMouseMove(event) {
        event.preventDefault();
        const relativeMouseCoords = getRelativeMouseCoords(event, this.canvas);
        console.log(relativeMouseCoords, this);
    }

    bindEvent() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        }, false);
    }

    render() {
        return (
            <Entity
                _ref={(item) => {
                    this.mainEntity = item;
                }}
            >
                <Entity
                    geometry={{
                        primitive: 'box',
                        width: 10,
                        height: 1,
                        depth: 10,
                    }}
                    shadow={{
                        receive: true,
                        cast: true,
                    }}
                    material={{
                        color: 0xff0000,
                        opacity: 1,
                        wireframe: false,
                        transparent: false,
                    }}
                    position={{
                        x: 5,
                        y: 0.5,
                        z: 10,
                    }}
                />
            </Entity>
        );
    }
}

export default GhostObject;
