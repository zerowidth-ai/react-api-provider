const path = require('path');

// Base configuration shared by both outputs
const baseConfig = {
  entry: './src/index.js', // Entry point of your library
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
};

// Configuration for CommonJS output
const commonJSConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zerowidth-react-api-provider.bundle.js',
    libraryTarget: 'commonjs2'
  }
};

// Configuration for ES Module output
const esmConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zerowidth-react-api-provider.esm.js',
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  }
};

module.exports = [commonJSConfig, esmConfig];
