import React from 'react';
import autobind from 'autobind-decorator';

type Props = {
    object: Object,
    isVisible: boolean,
    onRef: () => void,
};

class BoundingBox extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {};
        this.boundingBox = null;
    }

    componentDidUpdate() {
        if (this.boundingBox) {
            this.boundingBox.geometry.computeBoundingBox();
            this.props.onRef(this.boundingBox);
        }
    }

    @autobind
    onRefObj(obj) {
        this.boundingBox = obj;
    }

    render() {
        if (!this.props.isVisible) {
            return null;
        }
        const color = this.props.object.notAllowed ? this.props.object.notAllowedColor : this.props.object.color;
        return (
            <group>
                <mesh
                    castShadow
                    receiveShadow
                    position={this.props.object.position}
                    ref={this.onRefObj}
                >
                    <boxGeometry
                        width={this.props.object.width}
                        height={this.props.object.height}
                        depth={this.props.object.depth}
                    />
                    <meshLambertMaterial
                        color={color}
                        opacity={0.5}
                        transparent
                    />
                </mesh>
            </group>
        );
    }
}

export default BoundingBox;
