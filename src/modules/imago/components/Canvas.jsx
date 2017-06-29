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
        this.auxVector2 = new THREE.Vector2();
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
            const relativeMouseCoords = this.getRelativeMouseCord(event);
            this.mouse.x = relativeMouseCoords.x;
            this.mouse.y = relativeMouseCoords.y;

            // this.mouse.x = ((event.clientX / window.innerWidth) * 2) - 1;
            // this.mouse.y = (-(event.clientY / window.innerHeight) * 2) + 1;

            // this.raycaster.ray.origin.set(0, 0, 0);
            // this.camera.localToWorld(this.raycaster.ray.origin);

            this.raycaster.setFromCamera(this.mouse.clone(), this.camera);
            // this.raycaster.ray.origin.z = this.camera.far;
            const intersects = this.raycaster.intersectObject(this.floor);
            console.log(intersects);
        }, false);
    }

    getRelativeMouseCord(event) {
        const containerRect = event.target.getBoundingClientRect();
        let relativeMouseCoords = new THREE.Vector2();
        relativeMouseCoords.x = event.clientX;
        relativeMouseCoords.y = event.clientY;

        relativeMouseCoords = relativeMouseCoords.clone()
        .sub(this.auxVector2.set(containerRect.left, containerRect.top))
        .divide(this.auxVector2.set(containerRect.width, containerRect.height));
        relativeMouseCoords.x = (relativeMouseCoords.x * 2) - 1;
        relativeMouseCoords.y = (-relativeMouseCoords.y * 2) + 1;
        return relativeMouseCoords;
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
                shadowMapType={THREE.PCFShadowMap}
                clearColor={fog.color}
                pixelRatio={window.devicePixelRatio}
                sortObjects={false}
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
