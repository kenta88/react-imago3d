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
                    color: (this.props.notAllowed) ? 0xff0000 : 0xFFD54F,
                }}
                position={this.props.position}
                rotation={this.props.rotation}
                _ref={this.props._onRef}
            />
        );
    }
}

export default Wall;
