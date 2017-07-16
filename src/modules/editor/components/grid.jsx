import React from 'react';
import {
    Entity,
} from 'aframe-react';
import { connect } from 'react-redux';

import {
    getIsAddingMode,
} from '../../../reducers/editor';


type Props = {
    isAddingMode: boolean,
};

@connect(
    store => ({
        isAddingMode: getIsAddingMode(store),
    }),
)

class Grid extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps: Props) {
        console.log('this is the grid');
        console.log(nextProps.isAddingMode, this.props.isAddingMode);
    }

    render() {
        return (
            <Entity
                geometry={{
                    primitive: 'plane',
                    width: 1000,
                    height: 1000,
                    segmentsWidth: 100,
                    segmentsHeight: 100,
                }}
                material={{
                    color: 0x000000,
                    opacity: 0.1,
                    wireframe: true,
                    transparent: true,
                }}
                position={{ x: 0, y: 0, z: -5 }}
                rotation={{ x: -90, y: 0, z: 0 }}
            />
        );
    }
}

export default Grid;
