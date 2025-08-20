// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      // cache-bust in prod; simple name in dev
      filename: isProd ? "assets/js/[name].[contenthash].js" : "assets/js/[name].js",
      clean: true,
      // Relative paths play nicely on GitHub Pages project sites
      publicPath: "auto" // or "./" if you prefer strictly relative URLs
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    devServer: {
      static: path.resolve(__dirname, "public"), // if you have static assets; optional
      watchFiles: ["src/**/*", "src/template.html"],
      port: 5173,
      hot: true,
      open: true
    },
    module: {
      rules: [
        { test: /\.css$/i, use: ["style-loader", "css-loader"] },
        {
          test: /\.(png|jpe?g|gif|svg|ico|webp)$/i,
          type: "asset/resource",
          generator: { filename: "assets/img/[name][hash][ext]" }
        },
        {
          test: /\.(woff2?|ttf|eot|otf)$/i,
          type: "asset/resource",
          generator: { filename: "assets/fonts/[name][hash][ext]" }
        },
        { test: /\.js$/i, exclude: /node_modules/, use: "babel-loader" } // optional if you use Babel
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        // Ensures <script> and <link> get injected for you
        inject: "body",
        minify: isProd && {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      })
    ]
  };
};
