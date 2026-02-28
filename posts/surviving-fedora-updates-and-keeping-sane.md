---
layout: doc
date: 2026-01-30
title: Overcoming weird effects after fedora kernel updates on laptops
description: Dealing with the weird effects of erratic hardware firmware states after kernel updates
tags:
  - linux
  - embedded-controller
  - fedora
  - note-to-self
  - kernel-update
  - mental-health
---
<Title />

> Update: I have written another post about similar issues and how I fixed it

I currently use two laptops: an AMD Ryzen 7 7730U and an intel ultra 9 285h (UX3405CA_UX3405CA), both manufactured by asus. I also use different versions of fedora workstation on both machines but still both machines and both installations are affected by this behavior.

> **SPOILER: HOLD THE POWER BUTTON ON YOUR LAPTOP FOR ~60 SECONDS _NOW_. DO NOT LET GO. IGNORE THE KEYBOARD BACKLIGHT. YOUR LINUX WILL BOOT AS EXPECTED. ALL HARDWARE DEVICES WILL WORK AGAIN!**

## The Issue

Almost every time I do a system update I experience these weird effects and I am unable to find any good threads or explanation for what happens or how to fix it properly:

- reboots will take minutes after the LUKS passphrase prompts
- random hardware will behave weird:
  - no audio, only "dummy output"
  - touchpad registering choppy input or no input at all
  - connectivity issues
  - sensors not available
  - gpu settings gone and (even more) general wayland wonkyness
  - keyboard backlight and keyboard volume control etc not working
  - ...
 
It may be subtle and 85% of the devices work but it drives me crazy if for example the touchpad drops every 20th touch or so. The issue for all of this is, apparently, according to gemini, that a reboot does completely power off the devices and therefore remains of crashed/outdated firmware may stay in the memory of the individual devices. 

A more likely cause that I [discovered recently](./asus-zenbook-embedded-controller-issues.md) is that the EC state gets corrupted, although this may be the same thing.

## The Fix

I am not exactly sure if that is how it works but what I know is that **holding the power button down for at least a minute fixes all issues** for me - every time.

As i mentioned above, I have run into this issue a lot of times with very different machines and each time I searched for specific fixes to the issues i was facing. I never found a thread that simply stated that an **actual ec reset power cycle** would 99% fix the issue, so I am writing this post to hopefully help some other poor souls who are going insane after an kernel update.

## Incapable LLMs

LLMs are very quick to suggest crazy hacks to blacklist drivers, fiddle with grub options, downgrade kernel, manually compile some driver or to simply switch to another distribution. Each time I was facing the issue, _none_ of the LLMs was able to simply suggest to me hold down the power button. 

## Visual indicator of the issue

A good indicator (at least for me) for whether your current hardware power state is borked is the little spinner below the fedora logo during boot: if it moves very choppy and takes painfully long (>20sec), don't bother waiting until the login screen is reached: just hold down the power button for a minute or so.
