import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import * as THREE from 'three';
import {
    Entity,
} from 'aframe-react';

import {
    getObjects,
    getIsAddingMode,
    getCurrentObject,
    getIsEditMode,
    getObjectWillSelected,
} from '../../../reducers/editor';
import {
    createObject,
    deleteObject,
    setObjectWillSelected,
} from '../../../actions/editor';
import '../aframe-components/csg';
import {
    Floor,
    Window,
    Wall,
} from '../components3D';
import getRelativeMouseCoords from '../helper/getRelativeMouseCoords';

type Props = {
    canvas: Object, // eslint-disable-line
    objects: Array <Object>,
    onItemsRendered: (Array <Object>) => void,
    isAddingMode: boolean,
    isEditMode: boolean,
    objectWillSelected: string,
    setObjectWillSelected: () => void,
    createObject: () => void,
    deleteObject: () => void,
    isViewer: boolean,
};

@connect(
    store => ({
        objects: getObjects(store),
        currentObject: getCurrentObject(store),
        isAddingMode: getIsAddingMode(store),
        isEditMode: getIsEditMode(store),
        objectWillSelected: getObjectWillSelected(store),
    }),
    {
        createObject,
        deleteObject,
        setObjectWillSelected,
    }
)
class Environment extends React.Component {
    constructor(props: Props) {
        super(props);
        this.mainEntity = null;
        this.canvas = null;
        this.renderedObject = [];
        this.state = {};
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
    }
    componentWillReceiveProps(nextProps: Props) {
        if (!this.canvas && nextProps.canvas) {
            this.canvas = nextProps.canvas;
            this.camera = this.mainEntity.sceneEl.camera;
            this.bindEvent();
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.objects !== this.props.objects) {
            const objects = this.props.objects.toJS();
            this.renderedObject = this.renderedObject.filter((object3d) => {
                return objects.find((item) => {
                    return object3d.getAttribute('uuid') === item.uuid;
                });
            });
            this.props.onItemsRendered(this.renderedObject);
        }
    }

    onMouseMove(event: Event) {
        event.preventDefault();
        const relativeMouseCoords = getRelativeMouseCoords(event, this.canvas);
        if (!this.props.isAddingMode && !this.props.isEditMode) {
            this.highlightObjects(relativeMouseCoords);
        }
    }
    onMouseDbClick(event: Event) {
        event.preventDefault();
        if (!this.props.isAddingMode && !this.props.isEditMode && this.props.objectWillSelected) {
            const object = this.props.objects.find((obj) => {
                return obj.uuid === this.props.objectWillSelected;
            });
            this.props.deleteObject(object.uuid);
            this.props.createObject(object);
        }
    }

    @autobind
    onRefObj(obj: Object) {
        this.renderedObject.push(obj);
    }
    @autobind
    highlightObjects(relativeMouseCoords) {
        this.mouse.x = relativeMouseCoords.x;
        this.mouse.y = relativeMouseCoords.y;
        this.raycaster.setFromCamera(this.mouse.clone(), this.camera);
        const renderedMesh = this.renderedObject.map((entity) => {
            return entity.object3D;
        });
        const intersects = this.raycaster.intersectObjects(renderedMesh, true);
        if (intersects.length) {
            const uuid = intersects[0].object.el.getAttribute('uuid');
            if (this.props.objectWillSelected !== uuid) {
                this.props.setObjectWillSelected(uuid);
            }
        } else if (this.props.objectWillSelected) {
            this.props.setObjectWillSelected(null);
        }
    }

    bindEvent() {
        if (this.props.isViewer) {
            return;
        }
        this.canvas.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        }, false);
        this.canvas.addEventListener('dblclick', () => {
            this.onMouseDbClick(event);
        }, false);
    }

    render() {
        return (
            <Entity
                _ref={(item) => {
                    this.mainEntity = item;
                }}
            >
                {this.props.objects.toJS().map((object, index) => {
                    if (object.type === 'FLOOR') {
                        return (
                            <Floor
                                key={index}
                                uuid={object.uuid}
                                position={object.position}
                                rotation={object.rotation}
                                _onRef={this.onRefObj}
                                willSelected={object.uuid === this.props.objectWillSelected}
                            />
                        );
                    }
                    if (object.type === 'WINDOW') {
                        return (
                            <Window
                                key={index}
                                uuid={object.uuid}
                                position={object.position}
                                rotation={object.rotation}
                                _onRef={this.onRefObj}
                                willSelected={object.uuid === this.props.objectWillSelected}
                            />
                        );
                    }
                    if (object.type === 'WALL') {
                        return (
                            <Wall
                                key={index}
                                uuid={object.uuid}
                                position={object.position}
                                rotation={object.rotation}
                                _onRef={this.onRefObj}
                                willSelected={object.uuid === this.props.objectWillSelected}
                            />
                        );
                    }
                    return (
                        <Entity
                            key={index}
                            uuid={object.uuid}
                            type={object.type}
                            geometry={{
                                primitive: 'box',
                                buffer: false,
                                width: object.width,
                                height: object.height,
                                depth: object.depth,
                            }}
                            shadow={{
                                receive: true,
                                cast: true,
                            }}
                            material={{
                                color: object.color,
                            }}
                            csg={{
                                windows: object.windows,
                            }}
                            position={object.position}
                            _ref={(item) => {
                                this.onRefObj(item);
                            }}
                        />
                    );
                })}
            </Entity>
        );
    }
}

export default Environment;
