// Webpack uses this to work with directories
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin its work
  entry: './src/p5/index.js',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9988,
    historyApiFallback: true
  },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },

  plugins: [new HtmlWebpackPlugin({
    template: './src/p5/index.html'
  })],

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'file-loader',
          options: { outputPath: 'css/', name: '[name].min.css' }
        }, 'sass-loader'],
      },
    ],
  },

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript 
  // minifying and other things, so let's set mode to development
  mode: 'development'
};