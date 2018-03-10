const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const extractCss = new ExtractTextWebpackPlugin("video-feed.css");

module.exports = {
    entry: ["./src/index.js", "./src/video-feed.css"],
    output: {
        path: path.resolve(__dirname, "docs/assets"),
        filename: "video-feed.js",
        sourceMapFilename: "video-feed.js.map",
        publicPath: "assets/"
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        hot: false,
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src")],
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, "src")],
                use: extractCss.extract({
                    use: "raw-loader"
                })
            }
        ]
    },
    plugins: [
        extractCss,
        new HtmlWebpackPlugin({
            title: "Video Feed",
            filename: path.resolve(__dirname, "docs/index.html"),
            template: path.resolve(__dirname, "src/index.html"),
            hash: true
        })
    ]
}
