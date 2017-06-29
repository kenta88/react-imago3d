import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import OrbitControls from '../helpers/OrbitControls';

class OrtographicCamera extends React.Component {

    constructor(props) {
        super(props);
        this.camera = null;
        this.state = {
            position: new THREE.Vector3(-150, 100, -150),
        };
    }

    componentDidMount() {
        this.initializeOrbitControls();
    }

    initializeOrbitControls() {
        const controls = new OrbitControls(this.camera);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 8.5;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;
        controls.minZoom = 0.3;
        controls.maxZoom = 2;
        controls.keyPanSpeed = 25.0;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2;
        controls.enableKeys = true;
        // controls.mouseButtons = { ORBIT: THREE.MOUSE.LEFT, ZOOM: THREE.MOUSE.MIDDLE, PAN: null };
        // controls.addEventListener('change', () => {
        //     this.setState({
        //         position: this.camera.position,
        //     });
        // });
        this.controls = controls;
        this.props.onRef(this.camera);
    }

    render() {
        return (
            <orthographicCamera
                name={this.props.name}
                left={(this.props.width / -18)}
                right={(this.props.width / 18)}
                top={this.props.height / 18}
                bottom={this.props.height / -18}
                near={-1000}
                far={1000}
                position={this.state.position}
                ref={(camera) => {
                    this.camera = camera;
                }}
            />
        );
    }
}

OrtographicCamera.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    onRef: PropTypes.func,
};

export default OrtographicCamera;
