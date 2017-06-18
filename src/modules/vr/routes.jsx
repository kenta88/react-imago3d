import { Match } from 'react-router';

import { Vr } from './connectors';

const Routes = () => (
    <div>
        <Match exactly pattern="/vr" component={Vr} />
    </div>
);

export default Routes;
