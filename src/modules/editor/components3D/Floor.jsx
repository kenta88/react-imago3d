import React from 'react';
import autobind from 'autobind-decorator';
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
    level: number,
};

class Floor extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    @autobind
    onEntityReady(entity) {
        this.entity = entity;
        this.props._onRef(entity);
    }

    render() {
        return (
            <Entity
                uuid={this.props.uuid}
                type="FLOOR"
                level={this.props.level}
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
                    color: (this.props.notAllowed || this.props.willSelected) ? 0xff0000 : 0xCFD8DC,
                    transparent: this.props.isGhost,
                    opacity: (this.props.isGhost) ? 0.5 : 1,
                }}
                position={this.props.position}
                rotation={this.props.rotation}
                _ref={this.onEntityReady}
            />
        );
    }
}

export default Floor;
