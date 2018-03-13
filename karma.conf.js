const path = require("path");

module.exports = config => {
    config.set({
        basePath: path.resolve(__dirname, "src"),
        files: [
            "index.js",
            path.resolve(__dirname, "node_modules/angular-mocks/angular-mocks.js"),
            "*.spec.js",
            "**/*.spec.js"
        ],
        preprocessors: {
            "index.js": ["webpack"]
        },
        webpack: {
            devtool: false
        },
        frameworks: ["jasmine"],
        browsers: ["Chrome"],
        reporters: ["spec"],
        plugins: [
            "karma-jasmine",
            "karma-chrome-launcher",
            "karma-webpack",
            "karma-spec-reporter"
        ]
    });
};
