// import autobind from 'autobind-decorator';
import React from 'react';
import PropTypes from 'prop-types';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import Lights from './Lights';
import Floor from './Floor';
// import OrtographicCamera from './OrtographicCamera';
import PerspectiveCamera from './PerspectiveCamera';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const fog = new THREE.Fog(0xcce0ff, 500, 10000);
        return (
            <React3
                antialias
                mainCamera="camera"
                width={this.props.width}
                height={this.props.height}
                shadowMapEnabled
                clearColor={fog.color}
            >
                <scene
                    fog={fog}
                >
                    <Lights />
                    <Floor />
                    {/* <OrtographicCamera
                        width={this.props.width}
                        height={this.props.height}
                    />*/}
                    <PerspectiveCamera
                        width={this.props.width}
                        height={this.props.height}
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
