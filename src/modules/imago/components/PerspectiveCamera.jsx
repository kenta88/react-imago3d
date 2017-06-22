import autobind from 'autobind-decorator';
import React from 'react';
import PropTypes from 'prop-types';

import PointerLockControls from '../helpers/PointerLockControls';

class PerspectiveCamera extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            if (this.props.isActive) {
                const element = document.body;
                element.requestPointerLock = element.requestPointerLock ||
                element.mozRequestPointerLock ||
                element.webkitRequestPointerLock;
                element.requestPointerLock();
            }
        }, false);

        document.addEventListener('pointerlockchange', () => {
            if (this.props.isActive) {
                if (this.controls.enabled) {
                    this.controls.enabled = false;
                } else {
                    this.controls.enabled = true;
                }
            }
        }, false);
    }

    @autobind
    perspectiveCameraDidMount(camera) {
        if (this.props.isActive) {
            this.camera = camera;
            this.controls = new PointerLockControls(camera);
            this.controls.enabled = false;

            const updateControls = () => {
                if (this.props.isActive) {
                    if (this.controls && this.controls.enabled) {
                        this.controls.update();
                    }
                    window.requestAnimationFrame(updateControls);
                }
            };
            window.requestAnimationFrame(updateControls);
        }
    }

    render() {
        return (
            <perspectiveCamera
                name={this.props.name}
                fov={75}
                aspect={this.props.width / this.props.height}
                near={0.1}
                far={1000}
                ref={this.perspectiveCameraDidMount}
            />
        );
    }
}

PerspectiveCamera.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    isActive: PropTypes.bool,
};

export default PerspectiveCamera;
