import React from 'react';
import {
    Entity,
} from 'aframe-react';

import '../aframe-components/orthographicCamera';

type Props = {
    width: number,
    height: number,
};

class OrthoCamera extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            width,
            height,
        } = this.props;
        return (
            <Entity
                orthocamera={{
                    width,
                    height,
                }}
            />
        );
    }
}

export default OrthoCamera;
