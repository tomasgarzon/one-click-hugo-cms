const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src", "index.js"),
    cms: path.join(__dirname, "src", "js", "cms.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    assetModuleFilename: "[hash][ext][query]"
  },
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource"
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          "mini-css-extract-plugin/dist/loader",
          {
            loader: "css-loader",
            options: {
              esModule: false
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      filename: "webpack.json",
      path: path.join(process.cwd(), "site/data"),
      prettyPrint: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "src/fonts"),
          to: "fonts",
          noErrorOnMissing: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      filename: "admin/index.html",
      template: "src/cms.html",
      chunks: ["cms"],
      inject: "body"
    })
  ]
};
