/* global AFRAME */
import * as THREE from 'three';

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('lambert', {
    schema: {
        width: {
            default: 256
        },
        height: {
            default: 256
        },
    },

    init() {
        console.log(this);
        var material = new THREE.MeshLambertMaterial( {

        } );
    },

    update() {
        console.log('update');
    }
});
