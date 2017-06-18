import { Match } from 'react-router';

import { Imago3d } from './connectors';

const Routes = () => (
    <div>
        <Match exactly pattern="/" component={Imago3d} />
    </div>
);

export default Routes;
