const path = require("node:path");
const MiniCssExtractPlugin = require("../node_modules/mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    resolve: {
        preferRelative: true
    },
    context: path.join(__dirname, "../", "src", "scripts"),
    entry: path.join(__dirname, "../", "src", "scripts", "mainscript.js"),
    module: {
        rules: [{
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: { url: false }
                }
            ]
        }]
        // {
        //     test: /\.html$/i,
        //     exclude: /node_modules/,
        //     use: [{
        //         loader: "html-loader",
        //         options: {
        //             sources: false,
        //             minimize: false,
        //             esModule: false
        //         }
        //     }]
        // }
    },
    plugins: [ new MiniCssExtractPlugin({ filename: "styles/mainstyle.css" }), new HtmlWebpackPlugin({
        filename: path.join(__dirname, "../", "index.html"),
        template: path.join(__dirname, "../", "src", "templates", "main_page.html"),
        inject: "head",
        minify: false,
        showErrors: false
    }) ],
    output: {
        filename: "scripts/mainscript.js"
    }
}