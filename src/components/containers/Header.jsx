// @flow
import {
    Navbar,
    NavItem,
    Icon,
} from 'react-materialize';

const Header = () => (
    <Navbar
        className="indigo lighten-2"
        right
    >
        <NavItem>
            <Icon>view_module</Icon>
        </NavItem>
        <NavItem>
            <Icon>more_vert</Icon>
        </NavItem>
    </Navbar>
);

export default Header;
