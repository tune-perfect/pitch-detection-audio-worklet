import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import cleanup from 'rollup-plugin-cleanup'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: path.join(__dirname, 'src/gainWorklet.ts'),
    output: [
      {
        file: 'dist/gainWorklet.js',
        format: 'cjs',
        sourcemap: false,
        exports: 'named',
      },
    ],
    plugins: [
      resolve({
        browser: true,
      }),
      typescript(),
      babel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, 'babel.config.json'),
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      }),
      cleanup({
        extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      }),
      // terser(),
    ],
  },
]
