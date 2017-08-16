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
    isGhost: boolean,
    willSelected: boolean,
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
                    uuid={this.props.uuid}
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 2,
                        depth: 1,
                        skipCache: false,
                    }}
                    shadow={{
                        receive: true,
                        cast: true,
                    }}
                    material={{
                        color: (this.props.notAllowed || this.props.willSelected) ? 0xff0000 : 0x26A69A,
                        transparent: this.props.isGhost,
                        opacity: (this.props.isGhost) ? 0.5 : 1,
                    }}
                    position={new THREE.Vector3(0, 19, 5)}
                />
                <Entity
                    uuid={this.props.uuid}
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 18,
                        depth: 0.5,
                        skipCache: false,
                    }}
                    shadow={{
                        receive: true,
                        cast: false,
                    }}
                    material={{
                        transparent: true,
                        color: (this.props.notAllowed || this.props.willSelected) ? 0xff0000 : 0xCFD8DC,
                        opacity: 0.2,
                    }}
                    position={new THREE.Vector3(0, 10, 5)}
                />
                <Entity
                    uuid={this.props.uuid}
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 5,
                        depth: 1,
                        skipCache: false,
                    }}
                    shadow={{
                        receive: true,
                        cast: true,
                    }}
                    material={{
                        color: (this.props.notAllowed || this.props.willSelected) ? 0xff0000 : 0x26A69A,
                        transparent: this.props.isGhost,
                        opacity: (this.props.isGhost) ? 0.5 : 1,
                    }}
                    position={new THREE.Vector3(0, 2.5, 5)}
                />
            </Entity>
        );
    }
}

export default Window;
