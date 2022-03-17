const path = require("path");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";

const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const { VueLoaderPlugin } = require("vue-loader");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const publicPath = () => {
  return isProd ? "" : "";
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "/main.js",
  output: {
    path: path.resolve(__dirname, "/assets"),
    filename: `js/${filename("js")}`,
    publicPath: publicPath(),
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "/assets"),
    open: true,
    compress: true,
    hot: true,
    port: 3002,
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },

      { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },

      {
        test: /\.styl/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "stylus-loader",
            options: {
              implementation: require("stylus"),
            },
          },
        ],
      },

      {
        test: /\.(?:|gif|png|jpg|jpeg|svg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `img/${filename("[ext]")}`,
            },
          },
        ],
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `fonts/${filename("[ext]")}`,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      vue: "@vue/runtime-dom",
    },
  },
  plugins: [
    new VueLoaderPlugin(),

    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      favicon: path.resolve(__dirname, "public/favicon.ico"),
      publicPath: publicPath(),
      minify: {
        collapseWhitespace: isProd,
      },
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),

    new CleanWebpackPlugin(),
  ],
};
