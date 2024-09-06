---
layout: doc
date: 2024-09-06
title: My working ESLint config with "standard" in 2024 for vscode
description: using ESLint 9 has become an absolute pain - here's a working setup
tags:
  - javascript
  - coding
  - ling
  - note to self
---

<Title />

I like ESLint because it integrates nicely with vscode but recently it has become a nightmare to get a new setup up and running due to changes in version 9's config format and the struggle over who own's the "standard" package. Anyway, here's my setup that should work with vscode and your package manager scripts:

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

Next, in vscode uninstall the ESLint extension.

Then reinstall the ESLint extension:
```bash
// CTRL+P
ext install dbaeumer.vscode-eslint
```

Next, open the command palette, search for "user settings JSON" and delete the following line:

```json5
// ...
  "[javascript]": {
    "editor.defaultFormatter": "WHATEVER_YOU_HAVE_HERE",
    // ^ delete this line
  },
//...
```

go to a javascript document inside the current project and press `CTRL+SHIFT+P` and search for "format document". Select "ESLint" as the formatter.

If you are lucky, the ESLint formatter will persist and pick up your local config. If not just give up and use the `--fix` flag in your package manager scripts.