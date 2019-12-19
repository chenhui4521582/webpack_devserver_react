const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.config.js')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
devConfig = merge(config,{
    mode: 'development',
    /**
     * "inline-source-map"// 嵌入到源文件中
     * "eval-source-map" // 将 SourceMap 嵌入到每个模块中
     * "hidden-source-map" // SourceMap 不在源文件中引用
     * "cheap-source-map" // 没有模块映射(module mappings)的 SourceMap 低级变体(cheap-variant)
     * "cheap-module-source-map" // 有模块映射(module mappings)的 SourceMap 低级变体
     * "eval" // 没有模块映射，而是命名模块。以牺牲细节达到最快。
     * 'cheap-module-eval-source-map',
     * **/
    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        compress: true,
        open: true,
        port: 9000
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // 分离css
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash:8].css'
        }),
        // 允许错误不打断程序
        new webpack.NoEmitOnErrorsPlugin(),
        // 热更新
        new webpack.HotModuleReplacementPlugin(),
        // 压缩
        new UglifyJSPlugin()
    ]
});
module.exports = devConfig;