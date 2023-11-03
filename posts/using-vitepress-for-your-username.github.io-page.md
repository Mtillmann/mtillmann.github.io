---
layout: doc
date: 2023-11-03
title: create a username.github.io page using vitepress
tags:
  - vitepress
  - vue
  - github
  - blog
  - markdown
---

<Title/>

To have your own vitepress blog running on _username_.github.io in no time, follow these easy steps:

## Create a new repo

Inside your own github account, create a new repo called _username.github.io_ where username is your actual github username. This is important, since otherwise repos `page` wont be deployed to the root folder of the username.github.io subdomain.

## Create your vitepress blog

Follow [vitepress' getting started guide](https://vitepress.dev/guide/getting-started) and set up your vitepress project

## Change the `build` command

In your `package.json` file, change 

```json5
"build": "vitepress build",
```

to

```json5
"build": "vitepress build --outDir _site",
```

This is required for the deployment action to work.

## Create the workflow file

Create a new file in your repo called `.github/workflows/main.yml` and paste the contents of [this file](https://github.com/Mtillmann/mtillmann.github.io/blob/main/.github/workflows/main.yml) into it.

It's based on github's basic jekyll workflow, but instead of building a jekyll site, it builds and deployes a vitepress site.

## Change your repo settings

In your `username.github.io` repo, go to `Settings` -> `Pages` and set the `Source` to `Github Actions`. Then click `Save`.

## Push your changes

Push your changes to github and wait for the action to finish. After that, your vitepress blog should be available at `username.github.io`.

### Final words

The workflow will work for any nodeish static site generator, the important bit is the call to `npm run build` and that the output is generated into in the `_site` folder.