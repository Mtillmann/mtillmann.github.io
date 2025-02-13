---
layout: doc
date: 2025-02-13
title: using ESLint 9 + neostandard with vscode and zed
description: how to set up ESLint with neostandard for code formatting and fixing in vscode and zed
tags:
  - javascript
  - coding
  - eslint
  - vscode
  - zed
  - note-to-self
---

<Title />   

Here's an update to my unhinged post on ESLint 8: how to make ESLint 9 and the [neostandard](https://github.com/neostandard/neostandard) style guide work as code formatter and fixer in vscode and zed.
## vscode
### Setup
Install the vscode ESLint extension by hitting `CTRL+P` and entering `ext install dbaeumer.vscode-eslint`<C />.

Install neostandard AND ESLint as dev dependencies in your project `npm i -D eslint neostandard`<C /> or only neostandard if you want to use your global eslint installation `npm i -D neostandard`<C />

Next, create a file called `eslint.config.js`<C/> and paste the following content for basic setup:
```javascript
//this assumes that your package.json contains type: module
import neostandard from 'neostandard'

export default neostandard({
  ignores: ['node_modules'],
  files: ['*.js']
})
```

Now you should be able to hit `CTRL+SHIFT+P` and run `ESLint: fix all auto-fixable Problems`<C/>.

### Formatting on save

To have ESLint to format your code on save, add the following to your project's `.vscode/settings.json` file:
```json5
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

### Using the "format document" command

In your project's `.vscode/settings.json` file, add the following:

```json5
{
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "eslint.format.enable": true
}
```

Now you should be able to format your document with `CTRL+SHIFT+I`.

### Extension recommendation

Add an `.vscode/extensions.json` file with the following content to your project to have vscode recommend the ESLint extension:
```json5
{
    "recommendations": [
        "dbaeumer.vscode-eslint"
    ]
}
```

### Troubleshooting

If ESLint doesn't seem to work, try restarting vscode once or hit `CTRL+SHIFT+P` and run `ESLint: Restart ESLint Server`<C /> or `Developer: Reload Window`<C />.

Also look out for any ESLint error messages in the output tab: `CTRL+SHIFT+P` and run `ESLint: Show Output Channel`.

## zed

### Setup

zed uses it's own ESLint installation (_installing eslint_ in the status bar the first time you open a .js file) so you do not have to install ESLint globally or as dev dependency in your project but you should if you plan to use it in your CI pipeline.

You only have to install neostandard as a dev dependency in your project: `npm i -D neostandard`<C /> and create the `eslint.config.js` file as described above.

As soon as your dependency is installed and the `eslint.config.js` file is present, zed should automatically pick up the ESLint configuration and apply it to your code: Errors and warnings are display in the "Project Diagnostics" tab (`CTRL + SHIFT + M).

### Using ESLint to format and fix your code

Once ESLint is up and running, **zed will still use prettier to format the code**. To force it to use ESLint instead, adapt your projects `.zed/settings.json` file to include these settings:
```json5{4-9}
{
  "languages": {
    "JavaScript": {
      "prettier": {
        "use": false
      },
      "code_actions_on_format": {
        "source.fixAll.eslint": true
      }
    }
  }
}
```
Now hitting `CTRL+SHIFT+I` will format your document with ESLint.

### Formatting on save

In your project's `.zed/settings.json` file, add the following:
```json5{5}
{
    "languages": {
        "Javascript": {
            //...
            "format_on_save": "on"
        }
    }
}
```

## npm scripts / CI

Using this setup you can also add the following npm scripts to your `package.json` file:
```json5
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```

## Finishing up

While I work with neostandard, you can of course use any other ESLint configuration you like. Just adapt your `eslint.config.js` file accordingly.

In this post I write the configuration in project-specific files, but you can also make the changes to user settings in vscode or zed to apply the configuration globally.

I only write on JavaScript here, but the same setup will work for TypeScript as well with minor adjustments.

<Comment />
