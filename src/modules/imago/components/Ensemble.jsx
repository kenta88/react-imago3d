import React from 'react';
import autobind from 'autobind-decorator';
// import * as THREE from 'three';

type Props = {
    objects: Array<Object>,
    onItemsRendered: () => void,
    scene: Object, //eslint-disable-line
};

class Ensemble extends React.Component {

    constructor(props: Props) {
        super(props);
        this.renderedObject = [];
        this.state = {};
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.objects !== this.props.objects) {
            this.props.onItemsRendered(this.renderedObject);
        }
    }

    @autobind
    onRefObj(obj) {
        // const sphere = new THREE.Mesh(
        //     new THREE.SphereGeometry(0.5, 0.5, 0.5, 8, 8),
        //     new THREE.MeshBasicMaterial({ color: 0x000000 })
        // );
        // const object = obj;
        // const vertexHelpers = [];
        // for (let i = 0; i < object.geometry.vertices.length; i++) {
        //     const vertexHelper = sphere.clone();
        //     const vertexPosition = object.geometry.vertices[i];
        //     vertexHelper.position.copy(vertexPosition).add(object.position);
        //     vertexHelper.visible = true;
        //     object.vertexHelpers = vertexHelpers;
        //     this.props.scene.add(vertexHelper);
        //     vertexHelpers.push(vertexHelper);
        // }
        this.renderedObject.push(obj);
    }

    render() {
        return (
            <group>
                {this.props.objects.map(object => (
                    <mesh
                        key={object.uuid}
                        name={object.uuid}
                        castShadow
                        receiveShadow
                        position={object.position}
                        ref={this.onRefObj}
                    >
                        <boxGeometry
                            width={object.width}
                            height={object.height}
                            depth={object.depth}
                        />
                        <meshLambertMaterial
                            color={object.color}
                            opacity={object.opacity}
                            transparent={object.transparent}
                        />
                    </mesh>
                ))}
            </group>
        );
    }
}

export default Ensemble;
