import React from 'react';
import { connect } from 'react-redux';
import {
    Entity,
} from 'aframe-react';

import '../aframe-components/orthographicCamera';
import {
    getIsAddingMode,
    getIsEditMode,
} from '../../../reducers/editor';


type Props = {
    width: number,
    height: number,
    isAddingMode: boolean, // eslint-disable-line
    isEditMode: boolean, // eslint-disable-line
};

@connect(
    store => ({
        isAddingMode: getIsAddingMode(store),
        isEditMode: getIsEditMode(store),
    })
)
class OrthoCamera extends React.Component {
    constructor(props: Props) {
        super(props);
        this.mainEntity = null;
        this.state = {};
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.isAddingMode !== this.props.isAddingMode) {
            if (this.mainEntity) {
                this.mainEntity.components.orthocamera.controls.enabled = !nextProps.isAddingMode;
            }
        }

        if (nextProps.isEditMode !== this.props.isEditMode) {
            if (this.mainEntity) {
                this.mainEntity.components.orthocamera.controls.enabled = !nextProps.isEditMode;
            }
        }
    }

    render() {
        const {
            width,
            height,
        } = this.props;
        return (
            <Entity
                type="camera"
                orthocamera={{
                    width,
                    height,
                }}
                _ref={(entity) => {
                    this.mainEntity = entity;
                }}
            />
        );
    }
}

export default OrthoCamera;
