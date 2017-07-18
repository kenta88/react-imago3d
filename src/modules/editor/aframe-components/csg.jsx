/* eslint-disable */
/* global AFRAME */
// import * as THREE from 'three';
import BSP from 'three-js-csg';

// const ThreeBSP = BSP(THREE);

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('csg', {
    schema: {},

    init() {

    },

    removeObject() {
        const ThreeBSP = BSP(THREE);
        const mesh = this.el.object3D.children[0];
        console.log(this.el.object3D, mesh);
        const box = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 10));
        box.position.copy(mesh.position);
        const objectBSP = new ThreeBSP(mesh);
        const bBSP = new ThreeBSP(box);
        const sub = objectBSP.subtract(bBSP);
        const newMesh = sub.toMesh(mesh.material);
        this.el.removeObject3D('mesh');
        this.el.setObject3D('mesh', newMesh);
    }
});
