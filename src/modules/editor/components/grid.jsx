import React from 'react';
import {
    Entity,
} from 'aframe-react';
import { connect } from 'react-redux';

import {
    getLevel,
} from '../../../reducers/editor';

type Props = {
    level: number,
};

@connect(
    store => ({
        level: getLevel(store),
    })
)
class Grid extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            yPosition: this.props.level,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.level !== this.props.level) {
            const yPosition = (nextProps.level > 0) ? nextProps.level * 21 : 0;
            this.setState({
                yPosition
            });
        }
    }
    render() {
        return (
            <Entity
                id="grid"
                geometry={{
                    primitive: 'plane',
                    width: 1000,
                    height: 1000,
                    segmentsWidth: 100,
                    segmentsHeight: 100,
                }}
                shadow={{
                    receive: false,
                    cast: false,
                }}
                material={{
                    color: 0x000,
                    opacity: 0.2,
                    wireframe: true,
                    transparent: true,
                }}
                position={{ x: 0, y: this.state.yPosition, z: 0 }}
                rotation={{ x: -90, y: 0, z: 0 }}
            />
        );
    }
}

export default Grid;
