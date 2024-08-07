import esbuild from 'esbuild';
import { ModuleFederationPlugin } from '@angular-architects/module-federation/webpack';

esbuild.build({
  entryPoints: ['./src/main.jsx'],
  bundle: true,
  outfile: 'dist/main.js',
  define: { 'process.env.NODE_ENV': '"development"' },
  plugins: [
    new ModuleFederationPlugin({
      name: 'webDriver',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true, strictVersion: true },
        'react-dom': { singleton: true, strictVersion: true },
      },
    }),
  ],
}).catch(() => process.exit(1));