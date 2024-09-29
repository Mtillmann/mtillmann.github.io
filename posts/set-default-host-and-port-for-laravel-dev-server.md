---
layout: doc
date: 2024-09-29
title: Set Default Host and Port for Laravel Dev Server
description: "An obscure feature of the laravel dev server unearthed setting a default host and port"
tags:
  - laravel
  - php
  - webdev
  - note-to-self
---

<Title/>

In your `.env` file, set the `SERVER_PORT` and `SERVER_HOST` variables to specify the default host and port for the Laravel dev server:

```env
SERVER_PORT=3000
SERVER_HOST=192.168.178.31
```

Now, when you run `php artisan serve`, the server will start on the specified host and port:

```shell{1,4}
$ php artisan serve

# output
INFO  Server running on [http://192.168.178.31:3000].  
Press Ctrl+C to stop the server
```

I was presented with the issue that I work on several projects at once and do not have the possibility to run them containerized. This means I run them on the host system using the laravel dev server. 

It's a bit annoying that I have to remember which project I started with wich port. I was looking into extending the `serve` command when I stumbled upon the [original implementation of the `serve`](https://github.com/laravel/framework/blob/7aabb896018f462bab291c50295ce613c8d840f3/src/Illuminate/Foundation/Console/ServeCommand.php#L393) command already having the feature to set the host and port:

Apparently `SERVER_PORT` [was added in 5.8.24 in 2019](https://github.com/laravel/framework/commit/8063eb416d9e33860f34660c229b9f06a92ce13d#diff-6731b6d867fedc0669bc319f7fa9f091516f0b1dac93f644e9a2140472b9d98dR112) and `SERVER_HOST` and [was added in 9.8.0 in 2022](https://github.com/laravel/framework/commit/abd3506c27231701430b1611482e2547fb148de8#diff-6731b6d867fedc0669bc319f7fa9f091516f0b1dac93f644e9a2140472b9d98dR214).

