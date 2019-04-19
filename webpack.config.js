const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
module.exports = {
    entry: ['@babel/polyfill','./src/index.js'],
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    optimization:{
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({})
        ]
    },
    devServer: {
        contentBase: __dirname + '/dist'
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'     
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
        })
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']}, 
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
} 