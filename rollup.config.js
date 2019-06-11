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
  }
};

const umd = {
  input: './modules/index.js',
  external: isBareModuleId,
  output: {
    name: pkg.name,
    file: `${pkg.name}.js`,
    format: 'umd'
  }
};

export default [mjs, umd];
