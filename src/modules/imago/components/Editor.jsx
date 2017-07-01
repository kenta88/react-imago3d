import React from 'react';
import * as THREE from 'three';

import Canvas from './Canvas';
import Lights from './Lights';
import Floor from './Floor';
import OrtographicCamera from './OrtographicCamera';

type Props = {
    width: number,
    height: number,
};


class Editor extends React.Component {

    constructor(props: Props) {
        super(props);
        this.fog = new THREE.Fog(0xcce0ff, 500, 10000);
        this.camera = null;
        this.floor = null;
        this.mouse = new THREE.Vector2();
        this.auxVector2 = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.objects = [];
        this.state = {
            position: new THREE.Vector3(0, 3.1, 0),
            cubes: [],
        };
    }

    componentDidMount() {
        console.log(this.camera, this.floor);
        window.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        }, false);
        window.addEventListener('dblclick', (event) => {
            this.onMouseDbClick(event);
        }, false);
    }

    onMouseMove(event) {
        event.preventDefault();
        const relativeMouseCoords = this.getRelativeMouseCord(event);
        console.log(relativeMouseCoords);
        // if (this.props.store.isEditMode) {
        //     this.movingBoundigBox(relativeMouseCoords);
        // }
    }

    onMouseDbClick(event) {
        event.preventDefault();
        console.log(this.addCube);
        // if (this.props.store.isEditMode) {
        //     this.addCube();
        // }
    }

    getRelativeMouseCord(event) {
        const containerRect = event.target.getBoundingClientRect();
        let relativeMouseCoords = new THREE.Vector2();
        relativeMouseCoords.x = event.clientX;
        relativeMouseCoords.y = event.clientY;
        relativeMouseCoords = relativeMouseCoords.clone()
        .sub(this.auxVector2.set(containerRect.left, containerRect.top))
        .divide(this.auxVector2.set(containerRect.width, containerRect.height));
        relativeMouseCoords.x = (relativeMouseCoords.x * 2) - 1;
        relativeMouseCoords.y = (-relativeMouseCoords.y * 2) + 1;
        return relativeMouseCoords;
    }

    movingBoundigBox(relativeMouseCoords) {
        this.mouse.x = relativeMouseCoords.x;
        this.mouse.y = relativeMouseCoords.y;
        this.raycaster.setFromCamera(this.mouse.clone(), this.camera);
        const intersects = this.raycaster.intersectObject(this.floor, true);
        if (intersects.length) {
            const vector = intersects[0].point;
            Object.keys(vector).forEach((coord) => {
                if (coord !== 'y') {
                    const n = intersects[0].point[coord];
                    intersects[0].point[coord] = Math.ceil(n / 5.0) * 5;
                }
            });
            intersects[0].point.y = 3.1;
            this.setState({
                position: intersects[0].point,
            });
        }
    }

    addCube() {
        const cubes = this.state.cubes;
        cubes.push(this.state.position);
        this.setState({
            cubes,
        });
        // this.props.actions.exitEditMode();
    }

    render() {
        return (
            <Canvas
                width={this.props.width}
                height={this.props.height}
                fog={this.fog}
            >
                <scene
                    fog={this.fog}
                >
                    <Lights />
                    <Floor
                        onRef={(floor) => {
                            this.floor = floor;
                        }}
                    />
                    <OrtographicCamera
                        name="camera"
                        width={this.props.width}
                        height={this.props.height}
                        onRef={(camera) => {
                            this.camera = camera;
                        }}
                    />

                    <group>
                        {false ? (
                            <mesh
                                position={this.state.position}
                                castShadow
                                receiveShadow
                            >
                                <boxGeometry
                                    width={10}
                                    height={5}
                                    depth={10}
                                />
                                <meshLambertMaterial
                                    color={0xffbbaa}
                                    opacity={0.5}
                                    transparent
                                />
                            </mesh>
                        ) : null}
                        {this.state.cubes.map((position, index) => (
                            <mesh
                                key={index}
                                position={position}
                                castShadow
                                receiveShadow
                            >
                                <boxGeometry
                                    width={10}
                                    height={5}
                                    depth={10}
                                />
                                <meshLambertMaterial
                                    color={0xffbbaa}
                                />
                            </mesh>
                        ))}
                    </group>
                </scene>
            </Canvas>
        );
    }
}

export default Editor;
