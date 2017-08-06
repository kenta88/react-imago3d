// @flow
import * as THREE from 'three';

export default {
    FLOOR: {
        uuid: null,
        type: 'FLOOR',
        level: 0,
        position: new THREE.Vector3(5, 0.5, 5),
        rotation: new THREE.Vector3(0, 0, 0),
        notAllowed: false,
        step: {
            size: 5.0,
            round: 10,
        }
    },
    WALL: {
        uuid: null,
        type: 'WALL',
        level: 0,
        position: new THREE.Vector3(0, 11, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        notAllowed: false,
        step: {
            size: 5.0,
            round: 10.0,
        }
    },
    WINDOW: {
        uuid: null,
        type: 'WINDOW',
        level: 0,
        position: new THREE.Vector3(0, 1, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        notAllowed: false,
        step: {
            size: 5.0,
            round: 10.0,
        },
    },
};
