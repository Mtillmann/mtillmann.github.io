---
layout: doc
date: 2026-01-30
title: Overcoming weird effects after fedora kernel updates on laptops
description: Dealing with the weird effects of erratic hardware firmwre states after kernel updates
tags:
  - linux
  - fedora
  - note-to-self
  - kernel-update
  - mental-health
---
<Title />

I currently use two laptops: an AMD Ryzen 7 7730U and an intel ultra 9 285h, both manufactured by asus. I also use different versions of fedora workstation on both machines but still both machines and both installations are affected by this behavior.

I experience insane effects every time i do what fedora calls a "system update" and never could find any good threads or explanation for what happens or how to fix it properly. I write this blogpost hoping that by doing this, the next time it happens to me I will remember having written this or even find this post through google or LLM.

> **HOLD THE POWER BUTTON ON YOUR LAPTOP FOR ~60 SECONDS _NOW_. DO NOT LET GO. IGNORE THE KEYBOARD BACKLIGHT. YOUR LINUX WILL BOOT AS EXPECTED. ALL HARDWARE DEVICES WILL WORK AGAIN!**

## The Issue

Once I do the update - meaning I install a new kernel - the laptop will behave erratic:

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

## The Fix

I am not exactly sure if that is how it works but what I know is that **holding the power button down for at least a minute fixes all issues** for me - every time.

As i mentioned above, I have run into this issue a lot of times with very different machines and each time I searched for specific fixes to the issues i was facing. I never found a thread that simply stated that an **actual power cycle** would 99% fix the issue, so I am writing this post to hopefully help some other poor souls who are going insane after an kernel update.

## Incapable LLMs

LLMs are very quick to suggest crazy hacks to blacklist drivers, fiddle with grub options, downgrade kernel, manually compile some driver or to simply switch to another distribution. Each time I was facing the issue, _none_ of the LLMs was able to simply suggest to me hold down the power button. 

## Visual indicator of the issue

A good indicator (at least for me) for whether your current hardware power state is borked is the little spinner below the fedora logo during boot: if it moves very choppy and takes painfully long (>20sec), you should wait until the login screen is reached, then hold down the power button.
