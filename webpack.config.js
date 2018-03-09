const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public/assets"),
        filename: "video-feed.js",
        sourceMapFilename: "video-feed.js.map",
        publicPath: "/assets/"
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Video Feed",
            filename: path.resolve(__dirname, "public/index.html"),
            template: path.resolve(__dirname, "src/index.html"),
            hash: true
        })
    ]
}
