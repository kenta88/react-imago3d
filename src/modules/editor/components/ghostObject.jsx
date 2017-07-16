import React from 'react';
import { connect } from 'react-redux';
import * as THREE from 'three';
import {
    Entity,
} from 'aframe-react';
import UUID from 'uuid/v4';

import {
    getIsAddingMode,
    getCurrentObject,
} from '../../../reducers/editor';
import {
    addObject,
} from '../../../actions/editor';
import getRelativeMouseCoords from '../helper/getRelativeMouseCoords';

type Props = {
    canvas: Object, // eslint-disable-line
    isAddingMode: boolean,
    currentObject: Object,
    addObject: (Object) => void,
    renderedObject: Array<Object>
};

@connect(
    store => ({
        isAddingMode: getIsAddingMode(store),
        currentObject: getCurrentObject(store),
    }),
    {
        addObject,
    }
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
            currentObject: this.props.currentObject,
        };
    }
    componentWillReceiveProps(nextProps: Props) {
        if (!this.canvas && nextProps.canvas) {
            this.canvas = nextProps.canvas;
            this.camera = this.mainEntity.sceneEl.camera;
            this.grid = document.querySelector('#grid');
            this.bindEvent();
        }
        if (nextProps.currentObject !== this.state.currentObject) {
            console.log('updated by props!!');
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
    onMouseDbClick(event: Event) {
        event.preventDefault();
        if (this.props.isAddingMode) {
            this.addObject();
        }
    }

    getPositionStep(gridIntersect: Object) {
        const vector = gridIntersect.point;
        const step = this.state.currentObject.step;
        const objectPosition = gridIntersect.point.clone();
        Object.keys(vector).forEach((coord) => {
            if (coord !== 'y') {
                let n = gridIntersect.point[coord];
                n = Math.ceil(n / step.size) * step.size;
                n = !(n % step.round) ? n + step.size : n;
                if (step.orientation && coord === step.orientation) {
                    n += step.size;
                }
                objectPosition[coord] = n;
            }
        });
        objectPosition.y = this.state.currentObject.position.y;
        return objectPosition;
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
            currentObject.position = this.getPositionStep(gridIntersect);

            const boundingBoxCollide = this.props.renderedObject ? this.props.renderedObject.some((item3d) => {
                if (item3d.getAttribute('type') === currentObject.type) {
                    return item3d.object3D.position.equals(currentObject.position);
                }
                return false;
            }) : [];

            currentObject.notAllowed = false;
            if (boundingBoxCollide) {
                console.log('boundingBoxCollide');
                currentObject.notAllowed = true;
            }
            console.log('notAllowed?', currentObject);

            this.setState({
                currentObject,
            });
        }
    }

    addObject() {
        const uuid = UUID();
        this.props.addObject({
            ...this.state.currentObject,
            uuid,
        });
    }

    bindEvent() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        }, false);
        this.canvas.addEventListener('dblclick', () => {
            this.onMouseDbClick(event);
        }, false);
    }

    render() {
        const currentObject = this.state.currentObject;
        console.log(currentObject);
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
                            width: currentObject.width,
                            height: currentObject.height,
                            depth: currentObject.depth,
                        }}
                        shadow={{
                            receive: true,
                            cast: true,
                        }}
                        material={{
                            color: (currentObject.notAllowed) ? currentObject.notAllowedColor : currentObject.color,
                        }}
                        position={currentObject.position}
                    />
                ) : null}
            </Entity>
        );
    }
}

export default GhostObject;
