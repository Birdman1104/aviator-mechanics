const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 8080,
    open: false,
    hot: true,
  },
  // stats: "errors-only",
  devtool: "inline-source-map",
  watchOptions: {
    poll: true,
  },
});
