import React from 'react';
import { BrowserRouter, Miss } from 'react-router';
import { Provider } from 'react-redux';

import ImagoRoute from './modules/imago/routes';
import PageNotFound from './components/PageNotFound';

type Props = {
  store: Object,
}

const App = ({ store } : Props) => {
    const layout = (
        <div>
            <ImagoRoute />
            <Miss component={PageNotFound} />
        </div>
    );

    return (
        <Provider store={store}>
            <BrowserRouter>
                {layout}
            </BrowserRouter>
        </Provider>
    );
};

export default App;
