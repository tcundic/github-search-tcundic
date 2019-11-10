const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = webpackMerge(common, {
    mode: 'production'
});