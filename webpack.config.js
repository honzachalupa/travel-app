const webpack = require('webpack');
const path = require('path');
const config = require('./src/config');
const moment = require('moment');

const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = env => {
    console.log('Build started with following arguments:', env || 'NONE');

    const isProduction = env.buildTarget === 'prod';
    const buildDate = moment().format('D.M.YYYY');
    const buildTarget = env ? env.buildTarget : '';
    const baseName = env ? env.baseName : '/';
    const platform = env ? env.platform : '';

    return {
        entry: {
            bundle: './src/app/App.tsx',
            sw: './src/app/sw.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: baseName,
            globalObject: 'this'
        },
        devtool: 'source-map',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            host: '0.0.0.0',
            historyApiFallback: true,
            https: true
        },
        plugins: [
            new CleanPlugin(['./dist']),
            new HtmlPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: 'index.html',
                inject: true,
                properties: config
            }),
            new WebappWebpackPlugin({
                logo: './src/images/icon.png',
                inject: true,
                prefix: 'images/favicons',
                ios: { 'apple-mobile-web-app-status-bar-style': 'black-translucent' },
                favicons: {
                    appName: config.nameShort,
                    appDescription: config.description,
                    developerName: 'Jan Chalupa',
                    developerURL: 'http://www.honzachalupa.cz/',
                    lang: 'cs-CZ',
                    display: 'standalone',
                    background: 'white',
                    theme_color: config.accentColor,
                    start_url: `${baseName}index.html?pwa=true`
                }
            }),
            new StyleLintPlugin(),
            new CopyWebpackPlugin([
                { from: 'src/static' },
                { from: 'src/images', to: 'images' }
            ]),
            new webpack.DefinePlugin({
                __BUILDDATE__: `'${buildDate}'`,
                __BUILDTARGET__: `'${buildTarget}'`,
                __BASENAME__: `'${baseName}'`,
                __PLATFORM__: `'${platform}'`
            })
        ],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-react',
                                    ['@babel/preset-env', {
                                        targets: {
                                            browsers: [
                                                'last 2 Chrome versions',
                                                'last 2 Firefox versions',
                                                'last 2 Safari versions',
                                                'last 2 iOS versions',
                                                'Android >= 4.4',
                                                'Edge >= 12',
                                                'Explorer >= 11'
                                            ]
                                        }
                                    }]
                                ]
                            }
                        },
                        'eslint-loader'
                    ]
                }, {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-typescript',
                                    '@babel/preset-react',
                                    ['@babel/preset-env', {
                                        targets: {
                                            browsers: [
                                                'last 2 Chrome versions',
                                                'last 2 Firefox versions',
                                                'last 2 Safari versions',
                                                'last 2 iOS versions',
                                                'Android >= 4.4',
                                                'Edge >= 12',
                                                'Explorer >= 11'
                                            ]
                                        }
                                    }]
                                ]
                            }
                        },
                        'awesome-typescript-loader'
                    ]
                }, {
                    test: /\.s?css$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction,
                                data: `
                                    @import "app/_globals.scss";
                                    $accent-color: ${config.accentColor};
                                    $deviceBreakpoint: ${config.deviceBreakpoint}px;
                                `,
                                includePaths: [__dirname, path.resolve(__dirname, 'src')]
                            }
                        },
                        'postcss-loader'
                    ]
                }, {
                    test: /\.svg$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }, {
                    test: /\.(png|jp(e?)g)$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'images/[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            plugins: [
                new TsConfigPathsPlugin({
                    configFileName: './tsconfig.json'
                })
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.svg', '.jpg', '.jpeg', '.png', '.ttf']
        },
        node: {
            fs: 'empty'
        }
    };
};
