const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  devtool: "eval-source-map",
  devServer: {
    port: process.env.PORT || 3000,
    static: {
      directory: path.join(process.cwd(), "dist"),
      watch: true
    },
    client: {
      logging: "info"
    },
    open: true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: "/404.html" }]
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["dist/**/*.js", "dist/**/*.css", "site/data/webpack.json"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    })
  ]
});
