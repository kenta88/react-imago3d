/* eslint-disable */
/* global AFRAME */
// import * as THREE from 'three';
import BSP from 'three-js-csg';
const ThreeBSP = BSP(THREE);
THREE.Cache.enabled = false;
// const ThreeBSP = BSP(THREE);

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('csg', {
    schema: {
        windows: {default: []},
    },

    multiple: true,

    init() {
        this.el.addEventListener('componentchanged', () => {
            this.createWindows();
        });
        this.createWindows();
    },

    remove() {
        this.el.removeObject3D('mesh');
    },

    createWindows() {
        // create windows
        this.data.windows.forEach((window) => {
            const delta = {
                dx: window.position.x - this.el.object3D.position.x,
                dy: window.position.y - this.el.object3D.position.y,
                dz: window.position.z - this.el.object3D.position.z,
            };
            const currentMesh = this.el.object3D.children[0];
            const currentBSP = new ThreeBSP(currentMesh);
            const windowMesh = new THREE.Mesh(new THREE.BoxGeometry(
                window.width,
                window.height,
                window.depth,
            ));
            windowMesh.position.set(delta.dx,delta.dy,delta.dz);
            const windowBSP = new ThreeBSP(windowMesh);
            const sub = currentBSP.subtract(windowBSP);
            const newMesh = sub.toMesh(currentMesh.material);
            this.el.removeObject3D('mesh');
            this.el.setObject3D('mesh', newMesh);
        });
    },

    update() {
        this.createWindows();
    }
});
