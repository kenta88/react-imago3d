// @flow
import autobind from 'autobind-decorator';
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
    lime400,
    yellow600,
} from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
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
                        backgroundColor: lime400,
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
                            leftAvatar={
                                <Avatar
                                    icon={
                                        <FontAwesome
                                            name="cube"
                                            size="2x"
                                        />
                                    }
                                    backgroundColor={yellow600}
                                />
                            }
                            rightIcon={
                                <ActionInfo />
                            }
                            primaryText="Cube"
                            secondaryText="Create a cube"
                        />
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default Header;
