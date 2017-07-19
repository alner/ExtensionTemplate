const webpack = require('webpack')
const WebpackCleanPlugin = require('clean-webpack-plugin')
const WebpackCopyPlugin = require('copy-webpack-plugin')
const WebpackZipPlugin = require('zip-webpack-plugin')
const WebPackExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackDiskPlugin = require('webpack-disk-plugin')
const WebpackDashboardPlugin = require('webpack-dashboard/plugin')
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path')


module.exports = (env = {}) => {
    console.log(env);

    const NAME = path.basename(__dirname);
    const CWD = process.cwd()
    const BUILD_OUTPUT = env.build_output || 'build';
    const DEPLOY_COMMAND = env.deploy_command;
    const BUILD_DIR = path.resolve(BUILD_OUTPUT) // || path.resolve(CWD, 'build')
    const SRC_DIR = path.resolve(CWD, 'src')

    // const PKG = require('./package.json')

    const PRODUCTION = env.production === true 
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
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    options: {
                      emitWarning: true,
                    },
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use:  [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: { modules: false },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => ([
                                require('autoprefixer'),
                                require('precss'),
                                ]),
                            },
                        },
                    ]
                }
/*                    
                    use:  WebPackExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [ 
                                {
                                    loader: 'css-loader',
                                    options: { importLoaders: 1 },
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        plugins: () => ([
                                        require('autoprefixer'),
                                        require('precss'),
                                        ]),
                                    },
                                },
                            ]
                    })
                }
*/                
            ]
        },
        resolve: {
            extensions: ['.js']
        },
        externals: [
            'qlik',
            'js/qlik',
            'jquery'
        ],
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new WebpackCleanPlugin([BUILD_DIR, ZIP_FILE]),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ENV)
            }),
            // new WebPackExtractTextPlugin("styles.css"),
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
            },
            overlay: {
                errors: true,
                warnings: true,
            },
        }
    }

    if(PRODUCTION) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new WebpackZipPlugin({
                filename: ZIP_FILE,
            })
        )

        if(DEPLOY_COMMAND)
            config.plugins.push(
                new WebpackShellPlugin({onBuildEnd:[DEPLOY_COMMAND]})
            );


        config.devtool = false
    } else {
        // Development mode
        config.plugins.push(
            // new WebpackDashboardPlugin(), // if you need webpack dashboard uncomment it and add "webpack-dashboard --" in package json for dev command at the very beginning
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new WebpackDiskPlugin({
                output: {
                    path: BUILD_OUTPUT
                },
                files: [
                    {
                        asset: /[name]/,
                        output: { 
                            filename: function(assetname) {
                                // excludes hot-updates from writing to disk to new file every time
                                const matches = assetname.match(/(hot-update\.(js|json))$/)
                                if(matches && matches.length > 0) {
                                    return matches[0];
                                }

                                return assetname;
                            }
                        }
                    }
                ]
            })
        );
    }

    return config;
}
