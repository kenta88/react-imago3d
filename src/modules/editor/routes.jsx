import { Match } from 'react-router';

import { Editor } from './connectors';

const Routes = () => (
    <div>
        <Match exactly pattern="/" component={Editor} />
    </div>
);

export default Routes;
