const webpack = require('webpack')
const WebpackCleanPlugin = require('clean-webpack-plugin')
const WebpackCopyPlugin = require('copy-webpack-plugin')
const WebpackZipPlugin = require('zip-webpack-plugin')
const WebpackDiskPlugin = require("webpack-disk-plugin")
const WebpackDashboardPlugin = require('webpack-dashboard/plugin')
const path = require('path')


module.exports = (env = {}) => {
    console.log(env);

    const NAME = path.basename(__dirname);
    const CWD = process.cwd()
    // TODO? change BUILD_DIR to extensions/.../
    const DEPLOY_PATH = env.deploy;
    const BUILD_DIR = path.resolve(CWD, 'build') 
    const SRC_DIR = path.resolve(CWD, 'src')

    //const ENV = process.env.NODE_ENV || 'development'
    // const PKG = require('./package.json')

    const PRODUCTION = env.production === true // ENV === 'production'
    const DEV_URL = (!PRODUCTION && env.url) || '' // for DEVELOPMENT ONLY
    const ENV = PRODUCTION ? 'production' : 'development'
    const ZIP_FILE = `${NAME}.zip`

    let config = {
        target: 'web',
        context: SRC_DIR,
        cache: true,
        entry: {
            [`${NAME}`]: ['./index.js']
        },
        output: {
            path: BUILD_DIR,
            filename: '[name].js',
            libraryTarget: 'amd',
            publicPath: 'http://localhost:8080/build/'
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
            extensions: ['.js']
        },
        externals: [
            'qlik',
            'js/qlik'
        ],
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new WebpackCleanPlugin([BUILD_DIR, ZIP_FILE]),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ENV)
            }),
            new WebpackCopyPlugin([{
                from: 'template.qext',
                to: path.resolve(BUILD_DIR, `${NAME}.qext`)
            }])
        ],
        devServer: {
            contentBase: ['http://localhost:8080/build/', DEV_URL],
            //publicPath: '/', //'http://localhost:8080/build/',
            // inline: true,
            hot: true,
            historyApiFallback: true,
            hotOnly: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }            
        }
    }

    if(PRODUCTION) {
        // TODO...
        config.plugins.push(
            new WebpackZipPlugin({
                filename: ZIP_FILE,
            })
        )

        config.devtool = false
    } else {
        // Development mode
        config.plugins.push(
            new WebpackDashboardPlugin(), // Comment if you need standard webpack output to console
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new WebpackDiskPlugin({
                output: {
                    path: DEPLOY_PATH
                },
                files: [{ 
                    asset: /[name]/,
                    output: { 
                        filename: function(assetname) {
                            return assetname;
                        }
                    }
                }]
            })
        );
    }

    return config;
}
