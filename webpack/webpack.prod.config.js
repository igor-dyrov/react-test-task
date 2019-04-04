const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				ie8: true,
				ecma: 8,
				output: {
					comments: false,
					beautify: false
				},
				compress: {
					drop_console: true
				},
				warnings: false
			}
		}),
		new CopyWebpackPlugin([
			{
				from: 'index.html',
				to: 'index.html'
			},
			{
				from: "static/img",
				to: 'static/img'
			}
		])
	]
});
