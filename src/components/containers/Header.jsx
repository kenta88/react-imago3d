// @flow
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
    AppBar,
    IconButton,
    IconMenu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    Avatar,
} from 'material-ui';
import {
    blueGrey600,
    brown500,
} from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { OBJECTS3D } from '../../constants';
import { createObject } from '../../actions/editor';

type Props = {
    createObject: (string) => void,
};

injectTapEventPlugin();

@connect(
    null,
    {
        createObject,
    }
)
class Header extends React.Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    @autobind
    onClick3dObject(type) {
        this.props.createObject(OBJECTS3D[type]);
    }
    @autobind
    onClickCube() {
        this.props.createObject('cube');
        this.closeDrawner();
    }

    @autobind
    openDrawner() {
        this.setState({
            open: true,
        });
    }

    @autobind
    closeDrawner() {
        this.setState({
            open: false,
        });
    }

    render() {
        const CustomIconMenu = props => (
            <IconMenu
                {...props}
                style={{
                    color: '#ffffff',
                }}
                iconButtonElement={
                    <IconButton>
                        <MoreVertIcon color="#ffffff" />
                    </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
        return (
            <div>
                <AppBar
                    style={{
                        backgroundColor: blueGrey600,
                    }}
                    iconElementRight={
                        <CustomIconMenu />
                    }
                    iconElementLeft={
                        <IconButton onClick={this.openDrawner} >
                            <Menu color="#ffffff" />
                        </IconButton>
                    }
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={this.closeDrawner}
                >
                    <List>
                        <ListItem
                            onClick={this.onClickCube}
                            leftAvatar={
                                <Avatar
                                    icon={
                                        <FontAwesome
                                            name="cube"
                                            size="2x"
                                        />
                                    }
                                    backgroundColor={brown500}
                                />
                            }
                            rightIcon={
                                <ActionInfo />
                            }
                            primaryText="Cube"
                            secondaryText="Create a cube"
                        />
                        <ListItem
                            onClick={() => {
                                this.onClick3dObject('FLOOR');
                            }}
                            leftAvatar={
                                <Avatar
                                    icon={
                                        <FontAwesome
                                            name="th"
                                            size="2x"
                                        />
                                    }
                                    backgroundColor={brown500}
                                />
                            }
                            rightIcon={
                                <ActionInfo />
                            }
                            primaryText="Floor"
                            secondaryText="Create a floor"
                        />
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default Header;
