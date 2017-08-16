import React from 'react';
import {
    Entity,
} from 'aframe-react';

type Props = {
    uuid: string,
    position: Object,
    rotation: Object,
    _onRef: () => void,
    notAllowed: boolean,
    isGhost: boolean,
    willSelected: boolean,
};

class Wall extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Entity
                uuid={this.props.uuid}
                type="WALL"
                position={this.props.position}
                rotation={this.props.rotation}
                _ref={this.props._onRef}
            >
                <Entity
                    uuid={this.props.uuid}
                    type="WALL"
                    geometry={{
                        primitive: 'box',
                        buffer: true,
                        width: 10,
                        height: 20,
                        depth: 1,
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
                    position={{
                        x: 0,
                        y: 0,
                        z: 5,
                    }}
                    // rotation={this.props.rotation}
                    _ref={this.props._onRef}
                />
            </Entity>
        );
    }
}

export default Wall;
