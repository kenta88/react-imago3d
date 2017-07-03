import React from 'react';

type Props = {
    object: Object,
    isVisible: boolean,
};

class Editor extends React.Component {

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.object, this.props.isVisible);
    }

    render() {
        if (!this.props.isVisible) {
            return null;
        }
        return (
            <group>
                <mesh
                    castShadow
                    receiveShadow
                    position={this.props.object.position}
                >
                    <boxGeometry
                        width={this.props.object.width}
                        height={this.props.object.height}
                        depth={this.props.object.depth}
                    />
                    <meshLambertMaterial
                        color={this.props.object.color}
                        opacity={0.5}
                        transparent={this.props.object.transparent}
                    />
                </mesh>
            </group>
        );
    }
}

export default Editor;
