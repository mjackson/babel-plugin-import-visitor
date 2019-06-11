export default function importVisitor(callback) {
  return {
    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(
        'dynamicImport',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'importMeta'
      );
    },
    visitor: {
      CallExpression(path) {
        if (path.node.callee.type !== 'Import') {
          // Some other function call, not import();
          return;
        }

        if (path.node.arguments[0].type !== 'StringLiteral') {
          // Non-string argument, probably a variable or expression, e.g.
          // import(moduleId)
          // import('./' + moduleName)
          return;
        }

        callback(path.node.arguments[0]);
      },
      ExportAllDeclaration(path) {
        callback(path.node.source);
      },
      ExportNamedDeclaration(path) {
        if (!path.node.source) {
          // This export has no "source", so it's probably
          // a local variable or function, e.g.
          // export { varName }
          // export const constName = ...
          // export function funcName() {}
          return;
        }

        callback(path.node.source);
      },
      ImportDeclaration(path) {
        callback(path.node.source);
      }
    }
  };
}
