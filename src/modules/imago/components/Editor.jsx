import React from 'react';
import * as THREE from 'three';

type Props = {
    isAddingCube: boolean,
    camera: Object,
    floor: Object,
};

class Editor extends React.Component {

    constructor(props: Props) {
        super(props);
        this.mouse = new THREE.Vector2();
        this.auxVector2 = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.state = {
            position: new THREE.Vector3(0, 3.1, 0),
            cubes: [],
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        }, false);
        window.addEventListener('dblclick', (event) => {
            this.onMouseClick(event);
        }, false);
    }

    onMouseMove(event) {
        event.preventDefault();
        if (this.props.isAddingCube) {
            const relativeMouseCoords = this.getRelativeMouseCord(event);
            this.movingBoundigBox(relativeMouseCoords);
        }
    }

    onMouseClick(event) {
        event.preventDefault();
        if (this.props.isAddingCube) {
            this.addCube();
        }
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
        this.raycaster.setFromCamera(this.mouse.clone(), this.props.camera);
        const intersects = this.raycaster.intersectObject(this.props.floor, true);
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
    }

    render() {
        return (
            <group>
                {this.props.isAddingCube ? (
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
                {this.state.cubes.map(position => (
                    <mesh
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
        );
    }
}

export default Editor;
