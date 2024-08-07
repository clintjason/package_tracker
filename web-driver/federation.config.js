import { NativeFederationPlugin } from '@angular-architects/native-federation';

export default {
  name: 'webDriver',
  exposes: {
    './App': './src/App',
  },
  shared: {
    react: { singleton: true, strictVersion: true },
    'react-dom': { singleton: true, strictVersion: true },
  },
  plugins: [new NativeFederationPlugin()],
};
