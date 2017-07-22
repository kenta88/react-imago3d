import React from 'react';
import {
    Entity,
} from 'aframe-react';
import * as THREE from 'three';

type Props = {
    uuid: string,
    position: Object,
    rotation: Object,
    _onRef: () => void,
    notAllowed: boolean,
};

class Window extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Entity
                uuid={this.props.uuid}
                type="WINDOW"
                position={this.props.position}
                rotation={this.props.rotation}
                _ref={this.props._onRef}
            >
                <Entity
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 2,
                        depth: 1,
                        skipCache: true,
                    }}
                    shadow={{
                        receive: true,
                        cast: true,
                    }}
                    material={{
                        color: (this.props.notAllowed) ? 0xff0000 : 0xFFD54F,
                    }}
                    position={new THREE.Vector3(0, 19, 0)}
                />
                <Entity
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 15,
                        depth: 0.5,
                        skipCache: true,
                    }}
                    shadow={{
                        receive: true,
                        cast: false,
                    }}
                    material={{
                        transparent: true,
                        color: (this.props.notAllowed) ? 0xff0000 : 0xCFD8DC,
                        opacity: 0.1,
                    }}
                    position={new THREE.Vector3(0, 12, 0)}
                />
                <Entity
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 5,
                        depth: 1,
                        skipCache: true,
                    }}
                    shadow={{
                        receive: true,
                        cast: true,
                    }}
                    material={{
                        color: (this.props.notAllowed) ? 0xff0000 : 0xFFD54F,
                    }}
                    position={new THREE.Vector3(0, 2.5, 0)}
                />
            </Entity>
        );
    }
}

export default Window;
