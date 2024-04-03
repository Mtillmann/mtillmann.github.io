---
layout: doc
date: 2024-04-13
title: Word-wrapped text on canvas/image with JavaScript
description: Creating a word-wrapped text on a canvas element with JavaScript is not as easy as it should be. Let's make it a bit more straightforward.
tags:
  - web-development
  - canvas
  - seo
---

<Title/>

When I was asked render some text on an image to hide the text from the search engine crawlers, I thought it would be straightforward. As usual, I was wrong.

I followed [Rik Schennink's approach](https://pqina.nl/blog/wrap-text-with-html-canvas/) 
to use SVG's `foreignObject` to render the text and then draw that SVG to an `img` or `canvas` element.

However, the resulting image does not integrate well with the rest of the design as all document styles are lost when the SVG is rendered as an `src` attribute of an `img` element. Only basic user agent styles remain since the SVG is rendered in a detached context.

I decided to make a very small (<2k) utility that allows you to render text on an image while trying to keep the design close to other elements the location of the document where the image is then inserted.

## Usage


- `text` (string): The text to render.
- `parentNode` (HTMLElement): This node's `computedStyle` will be used to style the text.
- 

<<< @/public/resources/text-to-image/text-to-image.js

## Using with Canvas

```js
const canvas = document.createElement('canvas')
canvas.width = width * options.scale
canvas.height = contentHeight * options.scale
canvas.getContext('2d').drawImage(img, 0, 0)

canvas.style.width = `${width}px`
canvas.style.height = `${contentHeight}px`

return canvas
```

## Issues

### Fonts

> External Webfonts will not work in an SVG that is converted to an image.

Make sure that you specify a web-safe fallback.

As Rik Schennink points out, fonts must be embedded in the SVG as no other method will survive the conversion to an image. [Thomas Yip](https://vecta.io/blog/how-to-use-fonts-in-svg#:~:text=Using%20fonts%20with%20img%20tags) has a solid article that explores the issue in more detail.
  
### Line height

When no `line-height` is set or found on the `context`-node's computed style, the converted image's line height will be off. To avoid this, either set the `line-height` on the `context`-node (or any of its ascendants) or pass it in the `style` option.

### Cut-off at the bottom

As a combination of both issues above, the image may be cut off at the bottom. To avoid this, you can pass `padding-bottom` in the `style` option. The default value is `0.5%`.

You can also have your content have some spacing at the bottom to avoid the cut-off.

### XHTML and DOM

Since SVG's `foreignObject` inner `div` must use the xhtml namespace, the markup that's passed into the `foreignObject` must be valid xhtml. 

This basically means that you need to use `<br />` instead of `<br>` and `<img src="..." />` instead of `<img src="...">`.

When using html5 DOM sources for images, you must make sure that those tags are the correct format as your `innerHTML` will likely be plain html(`<br>`), even if you authored it as xhtml(`<br />`).

> If your content is not valid xhtml, the `foreignObject` will not render the content and you will see no warnings or errors in the console.

<Comment/>