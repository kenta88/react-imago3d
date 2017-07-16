import React from 'react';
import {
    Entity,
} from 'aframe-react';

class GhostObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
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
        );
    }
}

export default GhostObject;
