import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import typescript from 'rollup-plugin-typescript2';
import { concatFiles } from './src/rollup-plugin-concatfiles';

export default [
  {
    input: path.join(__dirname, 'src/pitch.worklet.ts'),
    output: [
      {
        file: 'dist/pitch.worklet.js',
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
      },
    ],
    plugins: [
      resolve({
        browser: true,
      }),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
      cleanup({
        extensions: ['.ts', '.tsx'],
      }),
      concatFiles({
        files: {
          'dist/pitch.worklet.js': {
            banner: [],
            concatFiles: ['src/text-decoder.js', 'dist/pitch.worklet.js'],
            footer: [],
          },
        },
      }),
    ],
  },
];
