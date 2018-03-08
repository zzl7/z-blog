const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const webpackMerge = require('webpack-merge');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    entry: {
        app: './src/index.jsx'
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    //     'react-router': 'ReactRouter',
    //     'react-router-dom': 'ReactRouterDOM',
    //     'ant': 'Antd',
    // },
    // plugins: [new BundleAnalyzerPlugin()],

    devServer: {
        hot: true,
        // contentBase: "./dist",//本地服务器所加载的页面所在的目录
        proxy: [
            {
                context: ['/v1/**'],
                target: 'http://127.0.0.1:3000',
                secure: false
            },
            {
                context: ['/channel/**'],
                target: 'http://image.baidu.com',
                secure: false,
                changeOrigin: true
            }]
    },
});