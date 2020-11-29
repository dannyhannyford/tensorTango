const path = require('path');

const SRC_FILE = path.resolve(__dirname, 'client', 'src', 'index.jsx');
const OUT_DIR = path.resolve(__dirname, 'public');

module.exports = {
  entry: SRC_FILE,
  output: {
    path: OUT_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      }, {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    poll: 1000,
    ignored: /node_modules/,
  },
};
