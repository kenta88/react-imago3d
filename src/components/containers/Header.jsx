// @flow
import {
    AppBar,
    IconButton,
    IconMenu,
    MenuItem,
} from 'material-ui';
import { lime400 } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const CustomIconMenu = props => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton>
                <MoreVertIcon />
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


const Header = () => (
    <div>
        <AppBar
            title="Title"
            style={{
                backgroundColor: lime400,
            }}
            iconElementRight={
                <CustomIconMenu />
            }
        />
    </div>
);

export default Header;
