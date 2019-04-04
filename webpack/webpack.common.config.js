const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourcePath = path.join(__dirname, '../src/');
const extractCSS = new ExtractTextPlugin('styles.min.css');

module.exports = {
	context: sourcePath,
	entry: './index.jsx',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components|server)/,
				loader: 'babel-loader',
				options: {presets: ['@babel/env']}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader'
			},
			{
				test: /\.css$/,
				use: extractCSS.extract([
					'css-loader',
					'postcss-loader'
				])
			}
		]
	},
	resolve: {extensions: ['*', '.js', '.jsx']},
	output: {
		path: path.resolve(__dirname, '../dist/'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({template: 'index.html'}),
		extractCSS,
	]
};