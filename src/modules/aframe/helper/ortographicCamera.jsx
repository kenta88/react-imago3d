/* global AFRAME */
import * as THREE from 'three';

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('orto', {
    schema: {
        width: {
            default: 256
        },
        height: {
            default: 256
        },
    },

    init() {
        console.log('camera', this);

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

    update() {
        console.log('update');
    }
});
