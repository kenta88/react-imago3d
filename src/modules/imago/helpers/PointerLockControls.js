/* eslint-disable */

import * as THREE from 'three';
// todo need to fix pointer lock navigation

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */

// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one finger move
//    Zoom - middle mouse, or mousewheel / touch: two finger spread or squish
//    Pan - right mouse, or arrow keys / touch: three finter swipe

var PointerLockControls = function ( camera, domElement ) {

    this.domElement = ( domElement !== undefined ) ? domElement : document;

    var scope = this;

    // camera.rotation.set( 0, 0, 0 );
    camera.position.set( 0, 10, 120 );

    var pitchObject = new THREE.Object3D();
    // pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 10;
    yawObject.add( pitchObject );

    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;

    var isOnObject = false;
    var canJump = false;

    var prevTime = performance.now();

    var velocity = new THREE.Vector3();

    var PI_2 = Math.PI / 2;

    var onMouseMove = function ( event ) {

      if ( scope.enabled === false ) return;

      var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      yawObject.rotation.y -= movementX * 0.002;
      pitchObject.rotation.x -= movementY * 0.002;

      pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

      var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
      rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
      camera.setRotationFromEuler(rotation);

    };

    var onKeyDown = function ( event ) {

      switch ( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true; break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

        case 32: // space
          if ( canJump === true ) velocity.y += 350;
          canJump = false;
          break;

      }

    };

    var onKeyUp = function ( event ) {

      switch( event.keyCode ) {

        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;

      }

    };

    document.addEventListener( 'mousemove', onMouseMove, false );
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    this.enabled = false;

    this.getObject = function () {

      return yawObject;

    };

    this.isOnObject = function ( boolean ) {

      isOnObject = boolean;
      canJump = boolean;

    };

    this.getDirection = function() {

      // assumes the camera itself is not rotated

      var direction = new THREE.Vector3( 0, 0, -1 );
      var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

      return function( v ) {

        rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

        v.copy( direction ).applyEuler( rotation );

        return v;

      }

    }();

    this.update = function () {

      if ( scope.enabled === false ) return;

      var time = performance.now();
      var delta = ( time - prevTime ) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;
      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      if ( moveForward ) velocity.z -= 400.0 * delta;
      if ( moveBackward ) velocity.z += 400.0 * delta;

      if ( moveLeft ) velocity.x -= 400.0 * delta;
      if ( moveRight ) velocity.x += 400.0 * delta;

      if ( isOnObject === true ) {
        velocity.y = Math.max( 0, velocity.y );
      }

      yawObject.translateX( velocity.x * delta );
      yawObject.translateY( velocity.y * delta );
      yawObject.translateZ( velocity.z * delta );

      if ( yawObject.position.y < 10 ) {

        velocity.y = 0;
        yawObject.position.y = 10;

        canJump = true;

      }

      camera.translateX( velocity.x * delta );
      camera.translateY( velocity.y * delta );
      camera.translateZ( velocity.z * delta );

      camera.position.y = 10;
      // if ( camera.position.y < 10 ) {
      //   velocity.y = 0;
      //   camera.position.y = 10;
      //   canJump = true;
      // }
      prevTime = time;
    };

};

PointerLockControls.prototype = Object.create( THREE.EventDispatcher.prototype );
PointerLockControls.prototype.constructor = PointerLockControls;


export default PointerLockControls;
