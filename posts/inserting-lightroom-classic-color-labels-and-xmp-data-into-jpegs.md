---
layout: doc
date: 2024-05-23
title: Lightroom Classic color labels and XMP data in JPEGs
description: Adding Lightroom Classic color labels and XMP data to JPEGs using javascript can be a bit tricky. Here's how you can do it.
tags:
    - lightroom
    - adobe
    - JPEG
    - XMP
    - metadata
    - javascript
---

<Title/>

Recently I needed to add _Lightroom Classic_ color labels to JPEGs using javascript in the browser **and node**. After wasting a some time with worthless AI suggestions,
I bit the bullet and clicked on the aptly named tool [xmp-jpeg](https://github.com/bbsimonbb/xmp-jpeg) as [suggested here](https://stackoverflow.com/a/32884008/8797350).

## From `xmp-jpeg` to the `jpeg-xmp-writer` package

[Simon Boddy](https://github.com/bbsimonbb) did a great job with his tool, and to my knowledge it is only solution online that _generates and writes_ XMP in a format that follows spec and is recognized by Lightroom Classic, [exiftool](https://exiftool.org/) and [random online XMP/EXIF viewers](https://jimpl.com/) (which probably also rely on exiftool).

However, the code does no longer work out of the box in the browser, so I updated it to work as a modern ES module, added easy access to the XMP DOM and wrote some documentation.

Here's the [package "@mtillmann/jpeg-xmp-writer"](https://www.npmjs.com/package/@mtillmann/jpeg-xmp-writer) and the [github repository](https://github.com/Mtillmann/jpeg-xmp-writer).

## Writing Lightroom Classic Color Labels

To write color labels into your JPEG, use the library like this:

```javascript{1-2,6-7}
// import the writeXMP function
import { writeXMP } from '@mtillmann/jpeg-xmp-writer'

const arrayBuffer = /*...*/ // your JPEG file as an ArrayBuffer

// Write XMP metadata to the JPEG
const xmpArrayBuffer = writeXMP(arrayBuffer, {'xmp:Title': 'Hello, World!'})

// create a Blob from the arrayBuffer
const blob = new Blob([xmpedBuffer], { type: "image/jpeg" })

// create a URL for the Blob
const url = URL.createObjectURL(blob)

// create a link to download the JPEG
const a = document.createElement("a")
a.href = url
a.download = "test.jpg"
a.textContent = "Download"
document.body.appendChild(a)

// -> open the downloaded file in Lightroom Classic
```

Find more examples and how to work with `Blobs` and `Data URLs` in the [README](https://github.com/Mtillmann/jpeg-xmp-writer).

## Color Label Pitfalls

> The color label must match exactly what's set in your Lightroom Classic.

The color label is stored as a string in the XMP data, and Lightroom Classic will not recognize the color label if it's not an exact match.
For example, if you call the _red_ color label "to be deleted" in Lightroom Classic, you must also set it to "to be deleted" in the XMP data, or Lightroom Classic will not recognize it.

> You _cannot_ set the abstract value _red_ in the XMP data.

This makes Color Labels very fragile, error-prone and not portable between different Lightroom Classic installations, depending on how the color labels are named.

This also affects different translations of Lightroom Classic, as the color labels are translated: By default the _Purple_ color label is called _Lila_ in german Lightroom Classic installations.

<Comment/>
