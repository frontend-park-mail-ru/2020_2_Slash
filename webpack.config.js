const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/static/',
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test:/\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], //TODO: смерджить это правило с правилом выше
            },
            {
                test: /\.hbs$/i,
                loader: 'handlebars-loader',
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options : {
                    reportFiles: [
                        './src/*',
                    ]
                },
            },
            {
                test: /\.ttf$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './public/img', to: 'img'},
                {from: './public/fallback.html', to: '.'},
            ],
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname, '/favicon.ico'),
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[contenthash].css',
        }),
        new CheckerPlugin(),
        new ServiceWorkerPlugin({
            entry: path.resolve(__dirname, 'src/sw.js'),
            options: {
                scope: '/',
            }
        })
    ],
};
