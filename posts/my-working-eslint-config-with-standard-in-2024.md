---
layout: doc
date: 2024-09-06
title: My working ESLint(8) config with "standard" in 2024 for vscode
description: using the latest ESLint has become an absolute pain - here's a working setup
tags:
  - javascript
  - coding
  - ling
  - note to self
---

<Title />

I like ESLint because it integrates nicely with vscode but recently it has become very tough to get a new setup up and running due to changes in version 9's config format and the struggle over who owns the "standard" package. Anyway, here's my step-by-step eslint 8 setup that should work with vscode and your package manager scripts:

```
npm i -D eslint eslint-config-standard eslint-plugin-import eslint-plugin-n eslint-plugin-node eslint-plugin-promise
```

next, create a `.eslintrc.cjs` file in your project root with the following content:

```js
module.exports = {
  env: {
    node: true
  },
  extends: 'standard',
  overrides: [
    {
      files: ['.eslintrc.cjs']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/']
}
```
> Make sure you use the `.cjs` extension.

Next, in vscode uninstall the ESLint extension, then reinstall it:
```bash
// CTRL+P
ext install dbaeumer.vscode-eslint
```

At least in my mind, this should be enough to get the extension to pick up your local config.


Next, open the command palette, search for "user settings JSON" and delete the following line:

```json5
// ...
  "[javascript]": {
    "editor.defaultFormatter": "WHATEVER_YOU_HAVE_HERE",
    // ^ delete this line
  },
//...
```

go to a javascript document inside the current project and press `CTRL+SHIFT+P` and search for "format document". Select "ESLint" as the formatter when prompted.

That's it. You should now have a working ESLint setup with the "standard" config in 2024. "Format Document" should now work as expected and instantly apply the ESLint rules to your code.

I also use the error lens extension to get a visual representation of the errors in my code. It's a great extension and I can only recommend it.

<Comment />
