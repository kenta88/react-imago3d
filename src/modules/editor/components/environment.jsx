import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import {
    Entity,
} from 'aframe-react';

import {
    getObjects,
} from '../../../reducers/editor';

type Props = {
    canvas: Object, // eslint-disable-line
    objects: Array <Object>,
    onItemsRendered: (Array <Object>) => void,
};

@connect(
    store => ({
        objects: getObjects(store),
    })
)
class Environment extends React.Component {
    constructor(props: Props) {
        super(props);
        this.mainEntity = null;
        this.renderedObject = [];
        this.state = {};
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.objects !== this.props.objects) {
            this.renderedObject = this.renderedObject.filter((item) => {
                return item !== null;
            });
            this.props.onItemsRendered(this.renderedObject);
        }
    }

    @autobind
    onRefObj(obj: Object) {
        this.renderedObject.push(obj);
    }

    render() {
        return (
            <Entity
                _ref={(item) => {
                    this.mainEntity = item;
                }}
            >
                {this.props.objects.toJS().map((object, index) => (
                    <Entity
                        key={index}
                        uuid={object.uuid}
                        type={object.type}
                        geometry={{
                            primitive: 'box',
                            width: object.width,
                            height: object.height,
                            depth: object.depth,
                        }}
                        shadow={{
                            receive: true,
                            cast: true,
                        }}
                        material={{
                            color: object.color,
                        }}
                        position={object.position}
                        _ref={(item) => {
                            this.onRefObj(item);
                        }}
                    />
                ))}
            </Entity>
        );
    }
}

export default Environment;
