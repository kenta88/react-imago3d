import { Match } from 'react-router';

import { Test } from './connectors';

const Routes = () => (
    <div>
        <Match exactly pattern="/" component={Test} />
    </div>
);

export default Routes;
