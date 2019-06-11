## babel-plugin-import-visitor

This Babel plugin gives you a way to visit all the `import` nodes (and `export from`) in a JavaScript program. It's useful for building your own plugins where you would like to somehow manipulate the `import` sources.

For example, if you wanted to change all `import`s of `react` to `https://unpkg.com/react?module`, you could do the following:

```js
import babel from '@babel/core';
import importVisitor from 'babel-plugin-import-visitor';

const options = {
  // ...
  plugins: [
    importVisitor(node => {
      if (node.value === 'react') {
        node.value = 'https://unpkg.com/react?module';
      }
    })
  ]
};

babel.transform(code, options);
```

### License

[MIT](./LICENSE)
