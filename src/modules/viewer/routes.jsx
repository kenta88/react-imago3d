import { Route } from 'react-router';

import { Viewer } from './connectors';

const Routes = () => (
    <div>
        <Route exactly pattern="/viewer" component={Viewer} />
    </div>
);

export default Routes;
