var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/client.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  }
};
