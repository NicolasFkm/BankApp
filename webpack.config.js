const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/server.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      // Handle TypeScript
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/],
      },
      // Handle our workers
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    // This is required so workers are known where to be loaded from
    publicPath: "/dist/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/"),
  },
};