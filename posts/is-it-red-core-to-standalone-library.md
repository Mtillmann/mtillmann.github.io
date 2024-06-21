---
layout: doc
date: 2024-06-21
title: "@mtillmann/colors - isit.red's core as a standalone library"
description: Taking the core of isit.red and making it a standalone library to enable other projects to use it
tags:
  - projects
  - is-it-red
  - colorblind
  - assistive technology
  - library
---

<Title/>

Ever since building the [color helper extension](/posts/color-helper-a-chrome-extension-for-colorblind-people.md), I was dissatisfied that I hadn't made the core color and color shade detection components an abstracted library. 

Building libraries from existing code that is full of ad-hoc solutions and tightly coupled to the rest of the application is one my least favorite tasks. Also I despise fiddling with build tools and their configurations even more than doing my taxes.

I finally bit the bullet and extracted the core of isit.red into a standalone library. It's called [@mtillmann/colors](https://www.npmjs.com/package/@mtillmann/colors) and you can find the [github repository here](https://github.com/Mtillmann/colors). I includes documentation, sources and scripts to build your own data structures if you want to.

I've already integrated it into the [color helper extension](https://chromewebstore.google.com/detail/color-helper/lppofdjcegodcddmccmnicgfmblkdpbj) ([firefox](https://addons.mozilla.org/en-US/firefox/addon/color-helper/)) and it's working great and feels faster than the old code. 

## Public API

Also I've created a publicly accessible API for it, so you can use it in your own projects without having to use the library directly. Find the API at [colors.mtillmann.workers.dev](https://colors.mtillmann.workers.dev/).

The API runs on cloudflare workers free tier and is free to use without any authentication. It's limited to 100.000 requests per day. Since even the most expensive calls (`/color/{color}`) take only about 5ms, it fits really well into cloudflare's free tier limit of 10ms of cpu time per request.

I'm really happy to have this core functionality abstracted and available for other projects to use. I hope it will help others to build better color related tools and assistive technology.

## What's next?

I think localizing the library is the next step. I want to make it available in as many languages as possible. The biggest challenge will probably be cultural differences in color perception and naming, but I'll tackle that when I get there.

I'll also look into finding more data sources to improve the color name yield.

<Comment/>