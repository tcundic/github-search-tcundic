const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/, use: 'babel-loader'
            },
            {
                test: /\.scss$/, 
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|json|ico)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/app/index.html',
            favicon: 'src/assets/images/logo.ico'
        }),
        new CleanWebpackPlugin(),
    ]
}