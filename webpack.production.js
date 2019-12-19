const webpack = require('webpack')
const config = require('./webpack.config.js')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
proConfig = merge(config,{
    mode: 'production',
    devtool:'source map',
    optimization: {
      //分离公共模块到vender
        splitChunks: {
          chunks: 'initial',
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: 1
            }
          }
        },
        // 为每一个入口 创建runtime 文件
        runtimeChunk: {
          name: entrypoint => `manifest.${entrypoint.name}`
        }
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // 分离css
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash:8].css',
            chunkFilename: './css/[id].[hash:8].css',
        }),
        // 压缩
        new UglifyJSPlugin(),
        // 打包分析图
        new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
        // 允许错误不打断程序
        new webpack.NoEmitOnErrorsPlugin(),
        
    ]
});
module.exports = proConfig;