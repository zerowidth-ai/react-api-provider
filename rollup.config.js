const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel').babel;
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const json = require('@rollup/plugin-json');
const alias = require('@rollup/plugin-alias');
const path = require('path');
const terser = require('rollup-plugin-terser').terser;

const packageJson = require('./package.json');

module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
    alias({
      entries: [
        { find: 'react', replacement: path.resolve('./node_modules/react') },
        { find: 'react-dom', replacement: path.resolve('./node_modules/react-dom') }
      ]
    }),
    commonjs({
      include: /node_modules/
    }),
    terser(),
  ],
};
