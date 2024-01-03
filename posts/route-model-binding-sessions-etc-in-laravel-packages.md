---
layout: doc
date: 2019-01-08
title: Route Model Binding, Sessions etc in Routes provided by Laravel Packages
description: How to enable route model binding, sessions etc in routes provided by custom Laravel packages
tags:
  - laravel
  - php
  - package-dev
---

<Title></Title>

While developing a package that provides some bundled routes, I came across a problem that baffled me at first but became clear after a few minutes: Neither route model binding nor authentication worked in my controller. Type-hinted arguments were not resolved to the expected model but received as present in the route segment, calls to \Auth::user() always returned null because no session was present.

## Solution: Middleware must be applied manually
Unlike the core framework route files (web.php , api.php, …) which have their equally named middleware-groups applied by default, package routes have no middleware applied at all.

To enable all the expected features for your package routes, your routes.php should look similar like this:

```php
<?php

use Illuminate\Support\Facades\Route;

Route::middleware('web')->group(function () {
    Route::get('/my-package/some-route/{model}', 'Martin\MyPackage\Controllers\SomeController@someMethod');
});
```

Alternatively you could set the middleware inside your controller’s constructor:

```php
<?php

namespace Martin\MyPackage\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Martin\MyPackage\Models\SomeModel;


class SomeController extends Controller
{
    /**
     * SomeController constructor.
     *
     * setting the middleware group explicitly
     */
    public function __construct()
    {
        $this->middleware(['web']);
    }

    /**
     * method mapped by route
     *
     * @param Request $request
     * @param SomeModel $model
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function someMethod(Request $request, SomeModel $model)
    {
        //do whatever
        return view('some.view', ['model' => $model]);
    }
}
```

I hope this post helps somebody who struggles with the unexpected but understandable behavior of package routes.

<Comment />