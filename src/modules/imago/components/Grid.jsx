import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

class Grid extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const groundQuaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
        return (
            <group>
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
                {/* <mesh
                    castShadow
                    receiveShadow
                    // quaternion={groundQuaternion}
                    position={new THREE.Vector3(0, 0.3, 0)}
                    ref={this.props.onRef}
                >
                    <boxGeometry
                        width={100}
                        height={1}
                        depth={100}
                    />
                     <planeBufferGeometry
                        width={100}
                        height={100}
                        widthSegments={1}
                        heightSegments={1}
                    />
                    <meshLambertMaterial
                        color={0x777777}
                        opacity={0.6}
                        transparent
                    />
                </mesh>*/}
            </group>
        );
    }
}

Grid.propTypes = {
    onRef: PropTypes.func,
};

export default Grid;
