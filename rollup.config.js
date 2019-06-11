import babel from 'rollup-plugin-babel';

import pkg from './package.json';

function isBareModuleId(id) {
  return !id.startsWith('.') && !id.startsWith('/');
}

const mjs = {
  input: './modules/index.js',
  external: isBareModuleId,
  output: {
    file: `${pkg.name}.mjs`,
    format: 'es'
  },
  plugins: [babel()]
};

const umd = {
  input: './modules/index.js',
  external: isBareModuleId,
  output: {
    name: pkg.name,
    file: `${pkg.name}.js`,
    format: 'umd'
  },
  plugins: [babel()]
};

export default [mjs, umd];
