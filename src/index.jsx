import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';

import './style/style';
import App from './app';
import reducers from './reducers/index';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


function renderApp(RootComponent) {
    ReactDOM.render(
        <AppContainer>
            <RootComponent
                store={store}
            />
        </AppContainer>,
        document.getElementById('app')
    );
}

renderApp(App);

if (module.hot) {
    const NextApp = require('./app').default; // eslint-disable-line global-require
    module.hot.accept('./app', () => {
        renderApp(NextApp);
    });
}
