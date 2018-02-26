const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const createVariants = require('parallel-webpack').createVariants;
const baseOptions = {
    isDevelopment: process.env.NODE_ENV === 'development'
};

const variants = {
  target: ['commonjs2', 'var', 'umd', 'amd']
};

function createConfig(options) {
    return  {
      watch: options.isDevelopment,
      entry: path.join(__dirname, 'src', 'index.jsx'),
      devtool: options.isDevelopment ? 'eval-source-map': '',
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.' + options.target + '.js',
        publicPath: 'dist',
        libraryTarget: options.target
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: {
              loader: 'babel-loader'
            },
            exclude: /(node_modules|dist)/,
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
            ASSETS_URL: JSON.stringify(options.isDevelopment ? '/dist' : 'https://www.cs.helsinki.fi/u/mluukkai/cdn'),
          },
        }),
        new ExtractTextPlugin('app.css'),
        options.isDevelopment ? null : new webpack.optimize.UglifyJsPlugin({ minimize: true }),
      ].filter(p => !!p)
    }
}

module.exports = createVariants(baseOptions, variants, createConfig)
