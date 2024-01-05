---
layout: doc
date: 2022-05-05
title: Building a fast shade lookup for isit.red
description: How I built a fast color lookup algorithm for isit.red that works in realtime on mobile devices.
tags:
  - projects
  - is-it-red
  - colorblind
  - assistive technology
---

<Title/>

For my colorblind app [isit.red](https://isit.red) I needed a fast algorithm to find the shade of a given color.

The first approach was to naively iterate through the list of colors, calculate the &Delta;E distance to the given color and store the found color's shade in a list. Then I would sort all the matched shades and pick those below a certain &Delta;E threshold and again sort them by number of occurrences. This approach worked reasonably well on desktop but was too slow for mobile devices.

To run the AR View, the algorithm ideally needed to be able to give the shade of one pixel in less than 4ms.

The image analyzer's performance also depended on a very fast lookup algorithm, so I needed to find a better solution.

After some futile attempts and dead-ends, I finally settled on this solution:

## The Lookup Data

1. Downsample the color-space by 4, this reduces the number of colors that I need to store
from 16.7 million (256x256x256) to 262.144 (64x64x64)
2. Iterate through the list of colors and store each color's closest shade in a list where each shade is represented by a single byte, starting at 0

This creates a binary list of 262.144 bytes that's reasonably small for transfer and memory usage.

## The Lookup Algorithm

1. Downsample the given color to the same resolution as the lookup data
2. Calculate the index of the color in the lookup data
3. Read the byte at the index and return the shade that it represents

```js
shade(r, g, b) {
  r = ~~(r / this.samplingFactor);
  g = ~~(g / this.samplingFactor);
  b = ~~(b / this.samplingFactor);

  const p = (r * this.edgeLength * this.edgeLength) + g * this.edgeLength + b;

  return this.map[this.asciiString[p].charCodeAt(0)]
}
```
`r`, `g` and `b` are downsampled to the same resolution as the lookup data, then converted into a single linear index `p` and used to look up the shade in the `map` string, which is the lookup data.

## Performance

The results are pretty good compared to the naive approach:

| implementation | time per 100k lookups | cached |
| -------------- | --------------------- | ------ |
| original       | ~6,000ms              | no     |
| original       | ~86ms                 | yes    |
| new            | ~19ms                 | no     |
| new            | ~16ms                 | yes    |

The new algorithm is about 70 times faster than the original approach and makes AR view much smoother and the image analyzer a lot faster than before.

## Final Thoughts

Overall this gave the app a huge performance boost and made it possible to run the AR view on mobile devices at a very good framerate.

Of course, the color resolution is also 4 times lower, but the difference is not noticeable as the shade map only contains 38 entries.

<Comment/>