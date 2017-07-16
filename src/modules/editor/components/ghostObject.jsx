import React from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';
import {
    Entity,
} from 'aframe-react';

import {
    getIsAddingMode,
    getCurrentObject,
} from '../../../reducers/editor';
import getRelativeMouseCoords from '../helper/getRelativeMouseCoords';

type Props = {
    canvas: Object, // eslint-disable-line
    isAddingMode: boolean,
    currentObject: Object, // eslint-disable-line
};


@connect(
    store => ({
        isAddingMode: getIsAddingMode(store),
        currentObject: getCurrentObject(store),
    }),
)
class GhostObject extends React.Component {
    constructor(props: Props) {
        super(props);
        this.mainEntity = null;
        this.canvas = null;
        this.camera = null;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        this.state = {
            currentObject: null,
        };
    }
    componentWillReceiveProps(nextProps: Props) {
        if (!this.canvas && nextProps.canvas) {
            this.canvas = nextProps.canvas;
            this.camera = this.mainEntity.sceneEl.camera;
            this.grid = document.querySelector('#grid');
            this.bindEvent();
        }
        if (nextProps.currentObject !== this.props.currentObject) {
            this.setState({
                currentObject: nextProps.currentObject
            });
        }
    }

    onMouseMove(event: Event) {
        event.preventDefault();
        const relativeMouseCoords = getRelativeMouseCoords(event, this.canvas);
        if (this.props.isAddingMode) {
            this.moveGhostObject(relativeMouseCoords);
        }
    }

    bindEvent() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        }, false);
    }

    moveGhostObject(relativeMouseCoords: Object) {
        const currentObject = this.state.currentObject;
        if (!currentObject) {
            return;
        }
        this.mouse.x = relativeMouseCoords.x;
        this.mouse.y = relativeMouseCoords.y;
        this.raycaster.setFromCamera(this.mouse.clone(), this.camera);

        const gridIntersect = this.raycaster.intersectObject(this.grid.object3D, true)[0];
        if (gridIntersect) {
            const vector = gridIntersect.point;
            const step = currentObject.step;
            Object.keys(vector).forEach((coord) => {
                if (coord !== 'y') {
                    let n = gridIntersect.point[coord];
                    n = Math.ceil(n / step.size) * step.size;
                    n = !(n % step.round) ? n + step.size : n;
                    if (step.orientation && coord === step.orientation) {
                        n += step.size;
                    }
                    gridIntersect.point[coord] = n;
                }
            });
            gridIntersect.point.y = currentObject.position.y;
            currentObject.position = gridIntersect.point;
            this.setState({
                currentObject,
            });
        }
    }

    render() {
        return (
            <Entity
                _ref={(item) => {
                    this.mainEntity = item;
                }}
            >
                {this.props.isAddingMode ? (
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
                        position={this.props.currentObject.position}
                    />
                ) : null}
            </Entity>
        );
    }
}

export default GhostObject;
