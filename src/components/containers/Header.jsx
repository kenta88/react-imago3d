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
import CallMadeIcon from 'material-ui/svg-icons/communication/call-made';
import CallReceivedIcon from 'material-ui/svg-icons/communication/call-received';
import Menu from 'material-ui/svg-icons/navigation/menu';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { OBJECTS3D } from '../../constants';
import {
    getLevel,
} from '../../reducers/editor';
import {
    createObject,
    levelUp,
    levelDown,
} from '../../actions/editor';

type Props = {
    createObject: (string) => void,
    level: number,
    levelUp: () => void,
    levelDown: () => void,
};

injectTapEventPlugin();

@connect(
    store => ({
        level: getLevel(store),
    }),
    {
        createObject,
        levelUp,
        levelDown,
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
                    <IconButton
                        tooltip="Menu"
                        tooltipPosition="bottom-center"
                    >
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
                        <div>
                            <IconButton
                                tooltip="Level up"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 0px',
                                }}
                                onClick={this.props.levelUp}
                            >
                                <CallMadeIcon
                                    color="#ffffff"
                                />
                            </IconButton>
                            <IconButton
                                tooltip="Level Down"
                                tooltipPosition="bottom-center"
                                style={{
                                    width: '32px',
                                    padding: '12px 0px',
                                }}
                                onClick={this.props.levelDown}
                            >
                                <CallReceivedIcon
                                    color="#ffffff"
                                />
                            </IconButton>
                            <span
                                style={{
                                    verticalAlign: 'middle',
                                    display: 'inline-block',
                                    height: '32px',
                                    color: '#ffffff',
                                }}
                            >
                                {this.props.level}
                            </span>
                            <CustomIconMenu />
                        </div>

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
                            onClick={() => {
                                this.onClick3dObject('WALL');
                            }}
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
                            primaryText="Wall"
                            secondaryText="Create a wall"
                        />
                        <ListItem
                            onClick={() => {
                                this.onClick3dObject('WINDOW');
                            }}
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
                            primaryText="Window"
                            secondaryText="Create a Window"
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
