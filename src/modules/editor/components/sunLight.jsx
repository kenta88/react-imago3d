import React from 'react';
import {
    Entity,
} from 'aframe-react';

class SunLight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const d = 60;
        return (
            <Entity
                light={{
                    type: 'directional',
                    color: 0xccbbaa,
                    intensity: 0.9,
                    castShadow: true,
                    shadowCameraVisible: false,
                    shadowMapWidth: 2048,
                    shadowMapHeight: 2048,
                    shadowCameraLeft: -d,
                    shadowCameraRight: d,
                    shadowCameraTop: d,
                    shadowCameraBottom: -d,
                    shadowCameraFar: 30 * d,
                    shadowCameraNear: d,
                }}
                position={{
                    x: 45,
                    y: 90,
                    z: -90,
                }}
                target="#directionaltarget"
                rotation={{ x: 0, y: 0, z: 0 }}
            >
                <Entity
                    id="directionaltarget"
                    position={{
                        x: 0,
                        y: 0,
                        z: 0,
                    }}
                />
            </ Entity>
        );
    }
}

export default SunLight;
