const path = require("node:path");
const MiniCssExtractPlugin = require("../node_modules/mini-css-extract-plugin");

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
    },
    plugins: [ new MiniCssExtractPlugin({ filename: "styles/mainstyle.css" }) ],
    output: {
        filename: "scripts/mainscript.js"
    }
}