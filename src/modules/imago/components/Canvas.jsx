import React from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const d = 60;
        return (
            <React3
                antialias
                mainCamera="camera"
                width={this.props.width}
                height={this.props.height}
                shadowMapEnabled
                clearColor={0x666666}
            >
                <scene>
                    <mesh
                        position={new THREE.Vector3(0, 0, 0)}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry
                            width={10}
                            height={10}
                            depth={10}
                        />
                        <meshLambertMaterial
                            color={0xffbbaa}
                        />
                    </mesh>
                    <ambientLight
                        color={0x666666}
                    />
                    <spotLight
                        color={0xadddaa}
                        intensity={0.75}
                        shadowMapWidth={512}
                        shadowMapHeight={512}
                        shadowCameraFar={30}
                        shadowCameraNear={d}
                        position={new THREE.Vector3(10, 10, 10)}
                        lookAt={new THREE.Vector3(0, 0, -5)}
                    />
                    <orthographicCamera
                        name="camera"
                        left={(this.props.width / -18)}
                        right={(this.props.width / 18)}
                        top={this.props.height / 18}
                        bottom={this.props.height / -18}
                        near={-80}
                        far={160}
                        // position={new THREE.Vector3(15, 10, 10)}
                        lookAt={new THREE.Vector3(0, 0, 0)}
                        position={new THREE.Vector3(-10, 5, -10)}
                    />
                </scene>
            </React3>
        );
    }
}

Canvas.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
};

export default Canvas;
