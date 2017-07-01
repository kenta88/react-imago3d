// import autobind from 'autobind-decorator';
import type { Children } from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

type Props = {
    width: number,
    height: number,
    children: Children,
    fog: Object,
    canvasRef: () => void,
};

class Canvas extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React3
                antialias
                mainCamera="camera"
                width={this.props.width}
                height={this.props.height}
                shadowMapEnabled
                shadowMapType={THREE.PCFShadowMap}
                clearColor={this.props.fog.color}
                // pixelRatio={window.devicePixelRatio}
                sortObjects={false}
                canvasRef={this.props.canvasRef}
            >
                {this.props.children}
            </React3>
        );
    }
}

export default Canvas;
