const webpack = require('webpack')
const WebpackCleanPlugin = require('clean-webpack-plugin')
const WebpackCopyPlugin = require('copy-webpack-plugin')
const WebpackZipPlugin = require('zip-webpack-plugin')
const path = require('path');


module.exports = (env = {}) => {
    const NAME = path.basename(__dirname);
    const CWD = process.cwd()
    const BUILD_DIR = path.resolve(CWD, 'build') // TODO? change BUILD_DIR to extensions/.../
    const SRC_DIR = path.resolve(CWD, 'src')

    //const ENV = process.env.NODE_ENV || 'development'
    // const PKG = require('./package.json')

    const PRODUCTION = env.production === true // ENV === 'production'
    const ENV = PRODUCTION ? 'production' : 'development'
    const ZIP_FILE = `${NAME}.zip`

    let config = {
        context: SRC_DIR,
        cache: true,
        entry: {
            [`${NAME}`]: ['./index.js']
        },
        output: {
            path: BUILD_DIR,
            filename: '[name]',
            libraryTarget: 'amd'
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['', '.js']
        },
        externals: [
            'qlik',
            'js/qlik'
        ],
        plugins: [
            new WebpackCleanPlugin([BUILD_DIR, ZIP_FILE]),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ENV)
            }),
            new webpack.optimize.OccurenceOrderPlugin(),
            new WebpackCopyPlugin([{
                from: 'template.qext',
                to: path.resolve(BUILD_DIR, `${NAME}.qext`)
            }])
        ],
    }

    if(PRODUCTION) {
        // TODO...
    } else {
        // TODO...
    }

    return config;
}
