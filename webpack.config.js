const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CheckerPlugin} = require('awesome-typescript-loader');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
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
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.hbs$/i,
                loader: 'handlebars-loader',
            },
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                options : {
                    reportFiles: [
                        './src/*',
                    ]
                },
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './public/img', to: 'img'},
            ],
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[contenthash].css',
        }),
        new CheckerPlugin(),
    ],
};
