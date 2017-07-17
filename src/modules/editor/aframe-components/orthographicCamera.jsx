/* global AFRAME */
import * as THREE from 'three';

import OrbitControls from './controls/OrbitControls';

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('orthocamera', {
    schema: {
        width: {
            default: 256
        },
        height: {
            default: 256
        },
    },

    init() {
        this.createCamera();
        this.addOrbitControls();
        // this should be moved
        this.el.sceneEl.addEventListener('render-target-loaded', (event) => {
            event.target.renderer.setClearColor(0xcce0ff);
        });
    },

    createCamera() {
        const {
            width,
            height
        } = this.attrValue;
        const sc = 18;

        const cameraOptions = [
            width / -sc, // left
            width / sc, // right
            height / sc, // top
            height / -sc, // bottom
            -1000, // near
            1000, // far
        ];
        this.camera = new THREE.OrthographicCamera(...cameraOptions);
        this.camera.position.set(-150, 100, -150);
        this.camera.lookAt(new THREE.Vector3(0, 0, -5));
        this.el.sceneEl.camera = this.camera;
    },

    addOrbitControls() {
        this.controls = new OrbitControls(this.camera);
        this.controls.enabled = true;
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 8.5;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.3;
        this.controls.minZoom = 0.3;
        this.controls.maxZoom = 2;
        this.controls.keyPanSpeed = 25.0;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.enableKeys = true;
    },

    disableControls() {
        this.controls.enabled = false;
    },

    enableControls() {
        this.controls.enabled = true;
    },

    update() {
        console.log('update');
    }
});
