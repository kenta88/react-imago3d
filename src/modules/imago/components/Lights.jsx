import React from 'react';
import * as THREE from 'three';

class Lights extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const d = 60;
        return (
            <group>
                <ambientLight
                    color={0x666666}
                />
                <directionalLight
                    color={0xccbbaa}
                    intensity={0.75}
                    castShadow
                    shadowMapWidth={2048}
                    shadowMapHeight={2048}
                    shadowCameraLeft={-d}
                    shadowCameraRight={d}
                    shadowCameraTop={d}
                    shadowCameraBottom={-d}
                    shadowCameraFar={30 * d}
                    shadowCameraNear={d}
                    position={new THREE.Vector3(45, 90, 90)}
                    lookAt={new THREE.Vector3(0, 0, 0)}
                />
            </group>
        );
    }
}

export default Lights;
