const path = require("path");

module.exports = config => {
    config.set({
        basePath: path.resolve(__dirname, "src"),
        files: ["*.spec.js", "**/*.spec.js"],
        preprocessors: {
            "*.js": ["webpack"],
            "**/*.js": ["webpack"]
        },
        frameworks: ["jasmine"],
        browsers: ["Chrome"],
        plugins: [
            "karma-jasmine",
            "karma-chrome-launcher",
            "karma-webpack"
        ]
    });
};
