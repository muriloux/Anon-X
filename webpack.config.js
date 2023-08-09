const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
  entry: './src/popup.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'popup.min.css', // Specify the desired CSS filename
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin(), // Use TerserPlugin for JavaScript minification
      new CssMinimizerPlugin(), // Add this line
    ],
  },
};
