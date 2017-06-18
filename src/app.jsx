import React from 'react';
import { BrowserRouter, Miss } from 'react-router';

import VrRoute from './modules/imago/routes';
import PageNotFound from './components/PageNotFound';

const App = () => {
    const layout = (
        <div>
            <VrRoute />
            <Miss component={PageNotFound} />
        </div>
    );

    return (
        <BrowserRouter>
            {layout}
        </BrowserRouter>
    );
};

export default App;
