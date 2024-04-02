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

When I was asked render some text on an image to hide the text from the search engine crawlers, I thought it would be a piece of cake. But it turned out to be a bit more complicated than I thought.

I followed [Rik Schennink's approach](https://pqina.nl/blog/wrap-text-with-html-canvas/) 
to use SVG's `foreignObject` to render the text and then draw that SVG to an `img` element.

However, the resulting image does not integrate well with the rest of the design: colors, fonts, and sizes are off. Styles that are rendered when the SVG is regularly added to the DOM get lost when the SVG is converted to an image / written to a canvas.

I decided to make a very small utility that allows you to render text on an image while trying to keep the design as close to the location of the document where the image is then inserted:

## Options

- `text` (string): The text to render.
- `parentNode` (HTMLElement): This node's `computedStyle` will be used to style the text.
- 

## The Font Issue

**Webfonts will not work in an SVG that is converted to an image.**

As Rik Schennink points out, fonts must be embedded in the SVG as no other method will survive the conversion to an image. [Thomas Yip](https://vecta.io/blog/how-to-use-fonts-in-svg#:~:text=Using%20fonts%20with%20img%20tags) has a solid article that explores the issue in more detail.
  

<Comment/>