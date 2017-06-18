const path = require('path');
const webpack = require('webpack');
const express = require('express');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../webpack.config');
const config = require('../config.json');

const app = express();
const compiler = webpack(webpackConfig);

app.use(devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}));

app.use(hotMiddleware(compiler));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(config.webpackPort, (err) => {
    if (err) {
        return console.error(err);
    }

    console.log(`Listening at http://localhost:${config.webpackPort}/`);
});
