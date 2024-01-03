---
search: true
title: Is it red? My assistive app for colorblind people
description: My small web app that helps colorblind people identify colors and shades in the real world using their device's camera
---
<Title/>

As a colorblind person, I often find myself wondering what color something is. Especially with online shops, it's hard to tell what color something actually is when the styles are named things like "light bone", "sail", or "sunset" (Spoiler: It's always pink). So when you're depending on something having an expressive color name, you're out of luck. I wanted to build a tool that would help me with that.

My approach was so first compile a list of color names, grouped by shade and their rgb values. Then I grouped the colors further by brightness to split the shade groups into light and dark variants. Browse can find the [list of 1.265 colors, 14 shades and 38 shade variants](https://isit.red/#/shades) or [search the list](https://isit.red/#/search?q=red).

The first iteration of my app would take a screenshot or image, downsample it to a given number of pixels and find the shade and approximate color name for each pixel. [Try the AR View](https://isit.red/#/image-analyzer?image=https://upload.wikimedia.org/wikipedia/commons/5/54/RGV_color_wheel_1908.png).

Next I wanted to try my hand at realtime video analysis. I went with two modes: a "color picker" mode that would show the color name and shade of the pixel under the cursor and a "grid view" mode that shows a grid of the shades from the video feed. [Try the video analyzer](https://isit.red/#/live).

I also wanted to make the app useful for people who are not colorblind, so I added a [color picker](https://isit.red/#/color-picker) that would show the color name and shade of the pixel under the cursor.

The next feature was a [simple quiz](https://isit.red/#/quiz) that shows a random color, then derives the shade name from the color and asks the user to pick the correct shade from a list. After completing a couple of rounds, the quiz will show you a list of the shades you get wrong the most and therefore seem to have the most trouble with (at least on the device you're currently using).

As a last feature, I created a small interactive 3d animation that shows the color list mapped to a cube where [R=X, G=Y, B=Z](https://isit.red/#/cube).

## &Delta;E

For any given pixel I needed to find the closest color to that pixel's RGB values to give it a name and shade. Since R, G and B map precisely onto X,Y and Z, calculating the [euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) of a given RGB color to the closest color in the list seemed to be an obvious approach. However, the euclidean distance between two colors does not correlate with how similar they are _perceived_ by the human eye. This is were the [CIELAB ΔE*](https://en.wikipedia.org/wiki/Color_difference#CIELAB_%CE%94E*) color difference formula comes in:

> The International Commission on Illumination (CIE) calls their distance metric ΔE* (or, inaccurately, dE*, dE, or "Delta E") where delta is a Greek letter often used to denote difference, and E stands for Empfindung; German for "sensation". Use of this term can be traced back to Hermann von Helmholtz and Ewald Hering.  

[The german Wikipedia entry on ΔE](https://de.wikipedia.org/wiki/Delta_E#:~:text=Interpretation%20von%20Farbabst%C3%A4nden) has a small table on how to interpret the ΔE values:

| &Delta;E | valuation |
| --- | --- |
| 0.0 … 0.5 | almost imperceptibly |
| 0.5 … 1.0 | noticeable to the trained eye |
| 1.0 … 2.0 | little color difference |
| 2.0 … 4.0 | perceived color difference |
| 4.0 … 5.0 | essential, rarely tolerated color difference |
| above 5.0 | the difference is evaluated as a different color |

### Example: Euclidean distance vs. ΔE

Given the color R=168, G=255, B=82 (a bright green, thanks isit.red), the euclidean distance and the &Delta;E values are as follows:

| Color | R | G | B | Euclidean distance | &Delta;E |
| --- | --- | --- | --- | --- | --- |
| French lime | 158 | 253 | 56 | 27.928 | 1.776 |
| Green-yellow | 173 | 255 | 47 | 35.355 | 2.879 |
| Green lizard | 167 | 244 | 50 | 33.853 | 3.214 |
| Spring frost | 135 | 255 | 42 | 51.856 | 3.386 |
| Inchworm | 178 | 236 | 93 | 24.125 | 4.811 |

"Inchworm" has the shortest euclidean distance to the given color while having the largest ΔE value of the group. This demonstrates how the euclidean distance is not a good measure for color similarity because colors that have a short euclidean distance can be perceived as very different.

## Accuracy and Perception

The detected color names and shades are not perfect. There are a couple of reasons for that:

- people perceive colors differently (duh)
- the display you're using might reduce blue light ("night mode"), making colors appear warmer
- the environment you're in might have a color cast (e.g. a red wall, blue sky, green leaves above you)
- the light source might have a certain hue other than white (e.g. a yellowish light bulb or a blueish LED)
- the device's camera might apply color correction (e.g. to make skin tones appear more natural) or other post-processing
- your browser may apply color correction

Especially the realtime video analysis is prone to errors because of the reasons listed above. The analyzer is more accurate because it's not affected by the environment or the camera. 

But going back to the initial example with online shopping and product images: The images are not perfect either. They are often color corrected, have a color cast or are taken in a certain environment. So the detected color names and shades are a good approximation of what the product looks like in real life but you still may be surprised when you receive the product.

## On Clustering Shades

The image analyzer clusters matched colors into shade groups of light/dark and regular shade variants. 

If the total percentage of a shade is below a certain threshold, it is clustered into "other".
Depending on the percentage a shade is present in an analysis result, a shade may be clustered into "other". 

Multiple shades for a sample are caused by multiple colors with different shades being close to the sampled color.


<Posts headline="More on isit.red" tag="is-it-red" />