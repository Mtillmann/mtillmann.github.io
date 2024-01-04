---
layout: doc
date: 2024-01-04
title: Laravel 10 on DDEV with Vite and Breeze
description: Revisit of my previous post on Laravel 9 with Breeze, Vite and DDEV. Minor update for Laravel 10
tags:
- laravel
- php
- vite 
- breeze
- ddev
- docker
---

<Title />

![The Problem](/resources/Laravel-Breeze-Vite-HMR-Fail.png)
> The error messages are caused by the fact that the vite-http-server exposes its assets on the default host and port. DDEV however, uses a unique host AND SSL for each project, so the browser can’t connect to the vite-http-server.

In a [previous post](./using-laravel-9-breeze-with-ddev-and-vite.md) I described how to get Laravel 9 with Breeze and Vite working on DDEV. With Laravel 10, the setup is basically the same, but I hope to save you some time by providing a working config:

## `.ddev/docker-compose.vite.yaml`

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

## `vite.config.js`

```js{5-10}
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        hmr: {
             host: process.env.DDEV_HOSTNAME,
             protocol: 'wss'
        }
    },
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
});
```
## `npm run dev`

Either run the following command to enable the `--host` flag for vite:

```shell
npm run dev -- --host
```

_OR_ update the `dev` command in your `package.json` like this:

```json5{5}
{
    //...
    "scripts": {
        //...
        "dev": "vite --host"
    },
    //...
}
```

## `.ddev/config.yaml`

Running the command when ddev starts

```yaml
hooks:
  post-start:
    - exec: "npm run dev -- --host"
```

## Done

![The Solution](/resources/Laravel-Breeze-Vite-HMR-Success.png)
> Observe the `app.css` request URL: it uses `https` AND the correct host and port.

The vite-http-server is now passed through by the ddev router and uses SSL!