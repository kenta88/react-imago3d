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
    },
};
