import { Route } from 'react-router';

import { Editor } from './connectors';

const Routes = () => (
    <div>
        <Route exactly pattern="/" component={Editor} />
    </div>
);

export default Routes;
