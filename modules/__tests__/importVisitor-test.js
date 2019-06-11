import { transform } from '@babel/core';
import importVisitor from 'babel-plugin-import-visitor';

function rewriteImports(code, to) {
  const options = {
    // Don't look for .babelrc files.
    babelrc: false,
    plugins: [
      importVisitor(node => {
        node.value = to;
      })
    ]
  };

  return transform(code, options).code;
}

describe('importVisitor', () => {
  it('finds import default sources', () => {
    expect(rewriteImports('import React from "react";', 'cupcakes')).toEqual(
      'import React from "cupcakes";'
    );
  });

  it('finds import namespace sources', () => {
    expect(
      rewriteImports('import * as React from "react";', 'cupcakes')
    ).toEqual('import * as React from "cupcakes";');
  });

  it('finds export sources', () => {
    expect(
      rewriteImports('export { createElement } from "react";', 'cupcakes')
    ).toEqual('export { createElement } from "cupcakes";');
  });

  it('finds export default sources', () => {
    expect(rewriteImports('export React from "react";', 'cupcakes')).toEqual(
      'export React from "cupcakes";'
    );
  });

  it('finds export namespace sources', () => {
    expect(rewriteImports('export * from "react";', 'cupcakes')).toEqual(
      'export * from "cupcakes";'
    );
  });

  it('finds dynamic import sources', () => {
    expect(
      rewriteImports('const React = import("react");', 'cupcakes')
    ).toEqual('const React = import("cupcakes");');
  });
});
