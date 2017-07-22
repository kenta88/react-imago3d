import React from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import {
    Entity,
} from 'aframe-react';

import {
    getObjects,
} from '../../../reducers/editor';
import '../aframe-components/csg';
import {
    Floor,
    Window,
    Wall,
} from '../components3D';

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
            const objects = this.props.objects.toJS();
            this.renderedObject = this.renderedObject.filter((object3d) => {
                return objects.find((item) => {
                    return object3d.getAttribute('uuid') === item.uuid;
                });
            });
            console.log(this.renderedObject);
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
                {this.props.objects.toJS().map((object, index) => {
                    if (object.type === 'FLOOR') {
                        return (
                            <Floor
                                key={index}
                                uuid={object.uuid}
                                position={object.position}
                                rotation={object.rotation}
                                _onRef={this.onRefObj}
                            />
                        );
                    }
                    if (object.type === 'WINDOW') {
                        return (
                            <Window
                                key={index}
                                uuid={object.uuid}
                                position={object.position}
                                rotation={object.rotation}
                                _onRef={this.onRefObj}
                            />
                        );
                    }
                    if (object.type === 'WALL') {
                        return (
                            <Wall
                                key={index}
                                uuid={object.uuid}
                                position={object.position}
                                rotation={object.rotation}
                                _onRef={this.onRefObj}
                            />
                        );
                    }
                    return (
                        <Entity
                            key={index}
                            uuid={object.uuid}
                            type={object.type}
                            geometry={{
                                primitive: 'box',
                                buffer: false,
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
                            csg={{
                                windows: object.windows,
                            }}
                            position={object.position}
                            _ref={(item) => {
                                this.onRefObj(item);
                            }}
                        />
                    );
                })}
            </Entity>
        );
    }
}

export default Environment;
