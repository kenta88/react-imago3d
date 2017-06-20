import React from 'react';
import * as THREE from 'three';

class Floor extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const groundQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        return (
            <group>
                <mesh
                    position={new THREE.Vector3(0, 10, 0)}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry
                        width={10}
                        height={20}
                        depth={10}
                    />
                    <meshLambertMaterial
                        color={0xffbbaa}
                    />
                </mesh>
                <mesh
                    quaternion={groundQuaternion}
                    position={new THREE.Vector3(0, 0, 0)}
                >
                    <planeBufferGeometry
                        width={1000}
                        height={1000}
                        widthSegments={100}
                        heightSegments={100}
                    />
                    <meshBasicMaterial
                        color={0x000000}
                        opacity={0.1}
                        transparent
                        wireframe
                    />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    quaternion={groundQuaternion}
                    position={new THREE.Vector3(0, 0.3, 0)}
                >
                    <planeBufferGeometry
                        width={100}
                        height={100}
                        widthSegments={1}
                        heightSegments={1}
                    />
                    <meshLambertMaterial
                        color={0x777777}
                    />
                </mesh>
            </group>
        );
    }
}

export default Floor;
