import React from 'react';
import { BrowserRouter, Miss } from 'react-router';
import { Provider } from 'react-redux';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Provider store={store}>
                <BrowserRouter>
                    {layout}
                </BrowserRouter>
            </Provider>
        </MuiThemeProvider>
    );
};

export default App;
