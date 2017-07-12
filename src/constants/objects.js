// @flow
import * as THREE from 'three';

export default {
    FLOOR: {
        uuid: null,
        type: 'FLOOR',
        width: 10,
        height: 1,
        depth: 10,
        level: 0,
        position: new THREE.Vector3(0, 0.3, 0),
        color: 0x777777,
        opacity: 1,
        transparent: false,
        ref: null,
        notAllowed: false,
        notAllowedColor: 0xff0000,
        step: {
            size: 5.0,
            round: 10,
            orientation: null,
        }
    },
    WALL: {
        uuid: null,
        type: 'WALL',
        width: 10,
        height: 20,
        depth: 1,
        level: 0,
        position: new THREE.Vector3(0, 10, 0),
        color: 0x777777,
        opacity: 1,
        transparent: false,
        ref: null,
        notAllowed: false,
        notAllowedColor: 0xff0000,
        step: {
            size: 5.0,
            round: 10,
            orientation: 'z'
        }
    },
};
