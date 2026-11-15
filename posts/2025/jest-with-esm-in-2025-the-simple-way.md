---
layout: doc
date: 2025-02-12
title: Jest with vanilla ESM node in 2025
description: A simple way to get Jest working with ESM in 2025
tags:
  - javascript
  - coding
  - eslint
  - note-to-self
---

<Title />

As usual this is post is more of a note to self, but I hope it helps you too. While I love Jest,
I have found that setting up Jest can be a bit painful. For complex setups (jsdom etc), I understand that some work is necessary. For simple setups, especially vanilla ESM node, I think it should be easier - and it is if you actually read the documentation or this post!

What completely threw me off was the fact that the [documentation on ESM](https://jestjs.io/docs/ecmascript-modules) mentions that you need to use `--experimental-vm-modules` to run Jest with ESM modules. I - incorrectly - assumed that this was no longer necessary with newer node versions. 

However, Jest relies on the flag being present to enable its own ESM support. So, here's the most basic way to get Jest working with ESM:

```json5{4,7,11}
//package.json
{
  //...
  "type": "module",
  // ...
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest"
    //even required for newer node versions
  },
  "devDependencies": {
    "jest": "^29.7.0"
    // no other dependencies needed!
  }
}
```

```javascript
//jest.config.js
export default {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  transform: {}
}
```
That's it now you can run `npm test` or `npm run test` and Jest will run your tests with ESM support.

<Comment />
