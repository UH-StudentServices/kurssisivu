const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    watch: isDevelopment,
    entry: path.join(__dirname, 'src', 'index.jsx'),
    devtool: isDevelopment ? 'eval-source-map': '',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: 'dist',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({ loader: 'css-loader!postcss-loader!sass-loader' })
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src')],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                ASSETS_URL: JSON.stringify(isDevelopment ? '/dist' : 'http://kalleilv.users.cs.helsinki.fi/course-app/dist'),  
            },
        }),
        new ExtractTextPlugin('app.css'),
        isDevelopment ? null : new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    ].filter(p => !!p),
};