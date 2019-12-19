const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin') 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: './js/[name].[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: './js/[name].[chunkhash:8].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            name: './img/[name].[hash:8].[ext]',
                        }
                    },
                    {
                        loader: 'img-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            options: { minimize: true },
                            publicPath: '../'
                        } 
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.scss', '.css','.html'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
}