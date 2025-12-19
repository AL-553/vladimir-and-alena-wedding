const path = require("node:path");
const commonConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "inline-source-map",
    output: {
        clean: true,
        path: path.join(__dirname, "../", "build")
    },
    watch: true
})