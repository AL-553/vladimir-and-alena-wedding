const path = require("node:path");
const commonConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(commonConfig, {
    mode: "production",
    optimization: {
        minimizer: [ `...`, new CssMinimizerPlugin() ]
    },
    output: {
        path: path.join(__dirname, "../")
    }
})