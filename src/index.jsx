import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './style/style';
import App from './app';


function renderApp(RootComponent) {
    ReactDOM.render(
        <AppContainer>
            <RootComponent
                type="client"
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
