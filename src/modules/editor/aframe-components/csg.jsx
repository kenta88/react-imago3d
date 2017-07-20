/* eslint-disable */
/* global AFRAME */
// import * as THREE from 'three';
import BSP from 'three-js-csg';
const ThreeBSP = BSP(THREE);
// const ThreeBSP = BSP(THREE);

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('csg', {
    schema: {},

    init() {
    },

    subtractMesh(elToSubtract) {

        const meshToSubctract = elToSubtract.object3D.children[0].clone();
        let offset = this.el.object3D.position.clone().sub(elToSubtract.object3D.position);
        const {
            x,
            y,
            z,
        } = offset;
        offset.set(
            -x,
            (y < 0) ? -y : y,
            z,
        );
        meshToSubctract.position.copy(offset);
        const currentMesh = this.el.object3D.children[0];
        const currentBSP = new ThreeBSP(currentMesh);
        const subctractBSP = new ThreeBSP(meshToSubctract);
        const sub = currentBSP.subtract(subctractBSP);
        const newMesh = sub.toMesh(currentMesh.material);
        this.el.removeObject3D('mesh');
        this.el.setObject3D('mesh', newMesh);
    }
});
