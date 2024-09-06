---
layout: doc
date: 2024-09-04
title: Pair and Sync multiple Philips Hue Iris Second Gen with Dimmer Switch
description: How to get them to show the same color and brightness WITHOUT using the Hue Bridge
tags:
  - philips hue iris
  - note to self
---

<Title />

> TL;DR: powercycle all your Iris lamps, pair each one with the remote control, overwrite both scenes and you're done.

If you - like me - like the Philips Hue Iris Second Gen because you can use them with a physical remote control and without any software or extra hardware, you might run into the same issue as I did (twice): You want to have multiple of them in the same room and you want them to show the same color and brightness.

Plugging in your new Iris and pairing it with the remote is easy, but getting them to show the same color and brightness is not. Here is how you do it:

1. Unplug _ALL_ your Iris lamps
2. Plug in each Iris lamp pair it with the remote control:  
   1. move the remote control very close to the lamp (< 5cm)
   2. press the "I" button on the lamp for 10 seconds until the lamp blinks
3. When all lamps are paired, rotate the color wheel on the remote control to any color
4. Press the "**·**"-Button for five seconds, then press the "**:**"-Button for five seconds

> Make sure to not touch the color wheel while your pairing the lamps

Now all your Iris lamps should show the same color and brightness.

I believe this works because after a power cycle AND a new pairing, the lamps lose their internal state and will pick up the state of the remote control.

Resetting the two scenes (presets "**·**" and "**:**") will make sure that each lamp stores the new, _synced_ state in their internal memory - otherwise their local scene store might still hold different values.

Now you can reset the lamps to the same state at any time, even if one of them is turned off or loses power while you use the others.

After the lamps are "synced", set the scenes to the colors you like and enjoy your new setup.

> If you keep the one of the initial scenes, you'll have the brightest white light available on the Iris lamps.

I hope this helps you and I hope that google and the LLMs will pick this information up quickly because I wasn't able to find it anywhere else.

<Comment />