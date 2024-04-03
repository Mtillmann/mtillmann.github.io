---
layout: doc
date: 2024-04-3
title: Word-wrapped text and html on images/canvas
description: Creating a word-wrapped text on an image or canvas element with js is not as easy as it should be. Let's make it a bit more straightforward.
tags:
  - canvas
  - seo
  - javascript
---

<Title/>

When I was asked render some text on an image to hide the text from the search engine crawlers, I thought it would be straightforward. As usual, I was wrong.

I followed [Rik Schennink's approach](https://pqina.nl/blog/wrap-text-with-html-canvas/) 
to use SVG's `foreignObject` to render the text and then draw that SVG to an `img` or `canvas` element.

However, the resulting image does not integrate well with the rest of the design as all document styles are lost when the SVG is rendered as an `src` attribute of an `img` element. Only basic user agent styles remain since the SVG is rendered in a detached context.

Soooo I decided to make a very small (<2k) utility that allows you to render markup on an image while trying to keep the design close to other elements the location of the document where the image is then inserted.

## Demo

Most importantly, <Link href="/resources/text-to-image/index.html" target="_blank">here's a demo of the utility in action</Link>.


## Usage

> the function is asynchronous and returns a promise that resolves to an `img` element.

```js
const options = {};

//async
const img = await textToImage('Hello, World!', options);

//promise
textToImage('Hello, World!', options).then(img => {
  //do something with the img
});
```

The `text` argument contains the markup or text that you want to render. Make sure to read about the xhtml and DOM issues below if you're experiencing blank output.

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `scale` | `number` | `window.devicePixelRatio` | The internal scale of the generated image. Prevents blurry output when you have a `<canvas>` in your render chain |
| `context` | `HTMLElement` | `document.body` | The context node to source styles and dimensions from |
| `style` | `string` | `null` | CSS styles to apply to the `div` that wraps the text inside the `foreignObject`. See below |
| `width` | `number` | `null` | When given, this will override the width derived from context |

Styles are inserted to the `div`-selector that matches the div inside the `foreignObject`. If you want to apply styles to elements inside that div (i.e. your markup), use [CSS Nesting](https://developer.chrome.com/docs/css-ui/css-nesting) to target those elements _OR_ use inline styles.


## The `textToImage` function

<<< @/public/resources/text-to-image/text-to-image.js

## Using with Canvas

Applying the function's output to a canvas element is straightforward:

```js
const img = await textToImage('Hello, World!')

const canvas = document.createElement('canvas')
canvas.width = img.naturalWidth
canvas.height = img.naturalHeight
canvas.style.width = img.width + 'px'
canvas.style.height = img.height + 'px'
canvas.getContext('2d').drawImage(img, 0, 0)
```

## SEO, hiding text from crawlers and accessibility

If you want to superficially hide text from crawlers, use the canvas method. The text will probably not be indexed by search engines. However, consider how you source the text - if it's part of the DOM tree, it probably will be indexed.
Also consider the accessibility implications of using this method: screen readers will not be able to read the text and the moment you provide alternative text, that alternative text will be visible to the crawlers as well.

If you use the img method, the text will most likely be indexed by search engines, since the content is part of the svg markup that is rendered as an image.

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

### The Safari OCR Situation

Safari will automatically OCR all text off images. This means that any text in an image will be selectable by users. The only way to prevent this is to use a plain `<canvas>` element. See the demo for an example.

## Conclusion

The utility is a small step towards making it easier to render text on images. It's not perfect, but it's a start. I hope you find it useful. 

There are more powerful libraries ([html2canvas](https://html2canvas.hertzen.com/)) or [approaches](https://medium.com/@aditi.6ti/text-wrapping-in-canvas-using-fabricjs-aac03ed77821) out there that can do this and more, but I wanted to keep it simple and lightweight. 

Maybe I'll add more features in the future, especially to collect and inline styles from the nodes of the markup that is rendered.

<Comment/>