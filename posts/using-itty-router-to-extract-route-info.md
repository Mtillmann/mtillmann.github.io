---
layout: doc
date: 2025-10-06
title: Using itty-router to extract route info from Request or URL string
description: Match routes and extract parameters from a URL string without executing any code on match, using itty-router.
tags:
- http
- node
- ecmascript 
- javascript
- router
- route-matching
---

<Title />

I wanted to extract route info from a Request, without executing any code on match. itty-router can do this, but getting it to work actually made me read the documentation since all my LLMs completely failed me.

## router.js

First, create a router with handlers that just return the info you want using the `createHandler` factory function. This is based on the "complete example" in the [itty-router docs](https://itty.dev/itty-router/getting-started#complete-example). `createHandler` takes a single, optional argument that names the route. When omitted, the matched route pattern is used instead.

```javascript
//router.js
import { AutoRouter } from 'itty-router'

const createHandler = (name) => {
  return ({ params, query, method, route }) => ({
    name: name || route,
    params,
    query,
    method,
    route,
  })
}

const router = AutoRouter({
  format: () => {},
  missing: createHandler('404'),
})

router
  .get('/', createHandler('index'))
  .get('/hello/:name', createHandler('sayHello'))

export default { ...router }
```

## Using the router

Then, in your actual code, use it like this:

```javascript
import router from './router.js'

//...

// assuming you already have a Request object
const result = await router.fetch(req)
```

### Creating a Request object

If you don't have a Request object, you can either create one like this:

```javascript{3-5}
import router from './router.js'

const req = new Request('https://example.com/hello/world?foo=bar', {
  method: 'GET',
})

const result = await router.fetch(req)
```

### Using itty-router's RequestLike

Or use itty-router's [RequestLike](https://itty.dev/itty-router/typescript/api#requestlike) interface:

```javascript{3-6}
import router from './router.js'

const req = {
  url: 'https://example.com/hello/world?foo=bar',
  method: 'GET',
}

const result = await router.fetch(req)
```

## The result

The `result` object will contain the matched route information for you to use:

```javascript
{
  name: 'sayHello',
  params: { name: 'world' },
  query: { foo: 'bar' },
  method: 'GET',
  route: '/hello/:name'
}
```