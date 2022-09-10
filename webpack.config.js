var path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const ESLintPlugin = require('eslint-webpack-plugin');


const plugins = [
	new ESLintPlugin(),
	new MiniCssExtractPlugin({
		filename: "[name].css",
		chunkFilename: "[id].css",
	}),
];

if (devMode) {

	plugins.push(new webpack.HotModuleReplacementPlugin());
}




module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},

	devServer: {

		static: {
			directory: path.join(__dirname, './'),
		},
		hot: true,
		compress: true,
		open: true,
		client: {
			overlay: true,
		},
	},
	stats: {
		loggingDebug: ["sass-loader"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|jpg|jpeg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: './src/img',
							name: `assets/image/[name].[ext]`,
						}
					}
				],
			},
		],
},
	plugins,
};