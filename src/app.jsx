/* eslint-disable */
import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import { createBrowserHistory } from 'history';

import EditorRoute from './modules/editor/routes';
import ViewerRoute from './modules/viewer/routes';

const history = createBrowserHistory();

type Props = {
  store: Object,
}

const App = ({ store } : Props) => {
    const layout = (
        <div>
            <EditorRoute />
            <ViewerRoute />
        </div>
    );

    return (
        <Provider store={store}>
            <Router history={history}>
                {layout}
            </Router>
        </Provider>
    );
};

export default App;
