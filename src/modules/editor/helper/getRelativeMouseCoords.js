// flow
import * as THREE from 'three';

export default (event: Event, canvas: Node) => {
    const auxVector2 = new THREE.Vector2();
    const containerRect = canvas.getBoundingClientRect();
    let relativeMouseCoords = new THREE.Vector2();
    relativeMouseCoords.x = event.clientX;
    relativeMouseCoords.y = event.clientY;
    relativeMouseCoords = relativeMouseCoords.clone()
    .sub(auxVector2.set(containerRect.left, containerRect.top))
    .divide(auxVector2.set(containerRect.width, containerRect.height));
    relativeMouseCoords.x = (relativeMouseCoords.x * 2) - 1;
    relativeMouseCoords.y = (-relativeMouseCoords.y * 2) + 1;
    return relativeMouseCoords;
};
