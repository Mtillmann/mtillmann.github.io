---
layout: doc
date: 2023-08-20
title: updating xbox one controller without microsoft and xbox account
description: How to update your xbox one controller without a microsoft or xbox account using the xbox accessories app
tags:
  - microsoft
  - steamdeck
  - controller
  - digital-freedom 
  - xbox
---

<Title/>

## The issue

When buying a new xbox one controller there's a chance that it will not work with your steam deck out of the box. To make it work, you'll need to update the controller's firmware.
Of course, Microsoft wants you to use their store and xbox app to do so, but there's a way to do it without any account:

## The solution

Do these steps to update your controller:

1. Open a regular(non-admin) powershell: press `windows`-key, type `powershell` and press `enter`  
2. Type or paste `winget install 9NBLGGH30XJ3`<C/> and press `enter`*
3. Plug in your controller to your PC via USB and wait for the driver to install
4. Open the xbox accessories app: press `windows`-key, type `xbox accessories` and press `enter`
5. Close the xbox popup several times and ignore the error message about not having an xbox account
6. Click the three dots below the Controller graphic, then choose update
7. Wait until the progress bar has finished

Done! Now your controller can connect to your steam deck via bluetooth.

> \* `9NBLGGH30XJ3` is the ID of the xbox accessories app in the microsoft store. If you have the store installed, you can also open the store and search for "xbox accessories" and install it from there. 

<Comment />
