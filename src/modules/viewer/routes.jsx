import { Match } from 'react-router';

import { Viewer } from './connectors';

const Routes = () => (
    <div>
        <Match exactly pattern="/viewer" component={Viewer} />
    </div>
);

export default Routes;
