const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  output: {
    publicPath: 'http://localhost:4201/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'webTracker',
      filename: 'remoteEntry.js',
      exposes: {
        './Module': './src/app/web-tracker.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true },
        '@angular/common': { singleton: true, strictVersion: true },
        '@angular/router': { singleton: true, strictVersion: true },
      },
    }),
  ],
};