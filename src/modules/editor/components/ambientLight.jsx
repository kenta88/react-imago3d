import React from 'react';
import {
    Entity,
} from 'aframe-react';

class AmbientLight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Entity
                light={{
                    type: 'ambient',
                    color: 0xccbbaa,
                    intensity: 0.5,
                }}
            />
        );
    }
}

export default AmbientLight;
