import React from 'react';
import autobind from 'autobind-decorator';

type Props = {
    objects: Array<Object>,
    onItemsRendered: () => void,
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
