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

class Floor extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Entity
                uuid={this.props.uuid}
                type="FLOOR"
                geometry={{
                    primitive: 'box',
                    buffer: true,
                    width: 10,
                    height: 1,
                    depth: 10,
                }}
                shadow={{
                    receive: true,
                    cast: true,
                }}
                material={{
                    color: (this.props.notAllowed) ? 0xff0000 : 0xCFD8DC,
                }}
                position={this.props.position}
                rotation={this.props.rotation}
                _ref={this.props._onRef}
            />
        );
    }
}

export default Floor;
