import esbuild from 'esbuild';
import federation from '@angular-architects/native-federation';

esbuild.build({
  entryPoints: ['./src/main.jsx'],
  bundle: true,
  outfile: 'dist/main.js',
  plugins: [
    federation({
      name: 'webTracker',
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