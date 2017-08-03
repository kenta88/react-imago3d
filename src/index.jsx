import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import './style/style';
import App from './app';
import reducers from './reducers/index';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

sagaMiddleware.run(rootSaga);

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
