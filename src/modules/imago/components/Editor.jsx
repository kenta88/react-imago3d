import React from 'react';
import * as THREE from 'three';

type Props = {
    isAddingCube: boolean,
};

class Editor extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <group>
                {this.props.isAddingCube ? (
                    <mesh
                        position={new THREE.Vector3(5, 2.5, 5)}
                        castShadow
                        receiveShadow
                    >
                        <boxGeometry
                            width={10}
                            height={5}
                            depth={10}
                        />
                        <meshLambertMaterial
                            color={0xffbbaa}
                        />
                    </mesh>
                ) : null}
            </group>
        );
    }
}

export default Editor;
