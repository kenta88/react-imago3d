const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index.jsx',
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, 'src'),
        ],
        extensions: [
            '*',
            '.js',
            '.json',
            '.jsx',
        ],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js(x?)$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.(jpg|png|gif|svg)$/, loader: 'file-loader' },
            {
                test: /\.js(x?)$/,
                loader: 'babel-loader',
                include: /(src)/,
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(s?)css$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_PRODUCTION: JSON.stringify(false),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
        }),
        new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
            root: path.resolve(__dirname, 'public'),
            verbose: false,
            dry: false, // true for simulation
        }),
    ],
    devtool: 'eval',
};

module.exports = webpackConfig;
