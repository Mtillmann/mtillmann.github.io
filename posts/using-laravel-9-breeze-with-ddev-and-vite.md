---
layout: doc
date: 2022-10-26
lastUpdated: 2023-09-03
title: Using Laravel 9 with Breeze with DDEV and Vite
description: Working around the HMR issue when using Laravel 9 with Breeze and Vite in a DDEV environment. Includes a middleware to customize the HMR URL.
tags:
- laravel
- php
- vite 
- breeze
- ddev
- docker
---

<Title />

When trying to use a fresh Laravel 9 installation with breeze, you’ll encounter the problem that your browser won’t be able to load and hot-replace the assets compiled by vite.

If you face the problem, follow these steps to get your HMR working:

## Extend DDEV web-service configuration
Create a new file in you DDEV project’s `.ddev` folder, called `docker-compose.vite.yaml` and add the following config:

```yaml
version: '3.6'
services:
  web:
    expose:
      - "5173"
    environment:
      HTTP_EXPOSE: ${DDEV_ROUTER_HTTP_PORT}:80,${DDEV_MAILHOG_PORT}:8025,5174:5173
      HTTPS_EXPOSE: ${DDEV_ROUTER_HTTPS_PORT}:80,${DDEV_MAILHOG_HTTPS_PORT}:8025,5173:5173
```

> `5173` is the internal port of the vite http-server. The `HTTP_EXPOSE` is required, otherwise ddev-router won’t be able to start up. The exposed port (`5174`, left hand side) in the `HTTP_EXPOSE` list must be different from the exposed port in the `HTTPS_EXPOSE` list.

Restart your DDEV instance, then continue to next step.

You should now be able to open both urls
```http
https://yourproject.ddev.site:5173  
and  
http://yourproject.ddev.site:5174
```

Both will display a “502: Unresponsive/broken ddev back-end site”-error for now.

## Update vite.config.js
Update the server section of your vite config like this:

```json5
//...
server : {
    hmr:{
        host: process.env.DDEV_HOSTNAME,
        protocol : 'wss'
    }
 },
 //...
 ```
 You’ll notice that the protocol is set to wss. The reason is the way that the actual asset-URL that’s written into your document. It will only use a [https-protocol-part if the protocol is set to `wss`](https://github.com/laravel/vite-plugin/blob/2abd0b510b43061fab0027d5492547ce9a91dcad/src/index.ts#L393) because it is assumed that you use a non-ssl environment on the special `localhost`-hostname.

## Alternative: Customize Illuminate\Foundation\Vite’s HMR URL
If you’re not comfortable with setting the protocol to wss or simply want another domain than DDEV_HOSTNAME for whatever reason, I’ve made a small middleware that lets you override the URL that’s passed to the document for asset inclusion:

<<< @/public/resources/CustomHMRHotFile.php

## Starting vite the correct way

When you start `npm run dev`, the server’s output will suggest

```text
Network: use --host to expose
```
This is will not properly expose your vite dev server. Run this command to actually expose your vite dev server:

```bash
npm run dev -- --host
# or from your host shell:
ddev exec npm run dev -- --host
```

The output should indicate that your vite dev server now listens on other interfaces than only localhost.

Now you should be able to navigate to  
https://yourproject.ddev.site/login  
and see assets (app.css, app.js, @vite/client) being loaded from  
https://yourproject.ddev.site:5173

## Running vite on ddev start
Add the following to `.ddev/config.yaml` to have vite start with the web container:

```yaml
hooks:
  post-start:
    - exec: "npm run dev -- --host"
```

<small>This post was originally published on medium.com on 26-10-2022</small>

<Comment />


