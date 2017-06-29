// import autobind from 'autobind-decorator';
import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import { connect } from 'react-redux';

import { getAddingCube } from '../../../reducers/editor';

import Lights from './Lights';
import Floor from './Floor';
import Editor from './Editor';
import OrtographicCamera from './OrtographicCamera';
import PerspectiveCamera from './PerspectiveCamera';

type Props = {
    width: number,
    height: number,
    isAddingCube: boolean,
};

@connect(
    store => ({
        isAddingCube: getAddingCube(store),
    }),
)
class Canvas extends React.Component {
    constructor(props: Props) {
        super(props);
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.camera = null;
        this.floor = null;
        this.state = {
            isAddingCube: this.props.isAddingCube,
        };
    }

    componentDidMount() {
        window.addEventListener('mousemove', (event) => {
            event.preventDefault();
            this.mouse.x = ((event.x / this.props.width) * 2) - 1;
            this.mouse.y = (-(event.y / this.props.height) * 2) + 1;
            this.camera.updateMatrixWorld();
            this.raycaster.setFromCamera(this.mouse.clone(), this.camera);
            const intersects = this.raycaster.intersectObject(this.floor);
            console.log(intersects);
        }, false);
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
                    <Editor
                        isAddingCube={this.props.isAddingCube}
                    />
                    <Floor
                        onRef={(floor) => {
                            this.floor = floor;
                        }}
                    />
                    <OrtographicCamera
                        name="camera"
                        width={this.props.width}
                        height={this.props.height}
                        onRef={(camera) => {
                            this.camera = camera;
                        }}
                    />
                    <PerspectiveCamera
                        isActive={false}
                        name="cameraxx"
                        width={this.props.width}
                        height={this.props.height}
                    />
                </scene>
            </React3>
        );
    }
}

export default Canvas;
