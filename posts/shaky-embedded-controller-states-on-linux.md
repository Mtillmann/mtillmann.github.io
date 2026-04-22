---
layout: doc
date: 2026-04-22
title: Recognizing and coping with corrupted Embedded Controller states
description: Corrupted EC/ACPI state on Asus Zenbook laptops under Linux — symptoms, likely triggers, and the fix that worked for me.
tags:
  - linux
  - embedded-controller
  - fedora
  - asus
  - acpi
  - asus-nb-wmi
  - kernel-update
  - zenbook
  - mental-health
  - note-to-self
---
<Title />

I experienced weird issues on two different laptops (one AMD, one Intel) that I pinpointed to **corrupted EC/ACPI firmware state**. 

## The Root Cause

The most likely root cause is a bug somewhere in the kernel, the sensors subsystem, or the ACPI/WMI implementation for this hardware. The trigger I identified was having GNOME extensions installed that continuously poll hardware sensors (CPU frequency, GPU frequency, battery status etc). Those reads go through `asus_wmi`, which communicates with the EC — and something in that chain causes the EC to eventually enter a corrupted state.

> The only way to recover from this state is still to power drain/cycle the laptop: hold power button for 60+ seconds while no psu is connected. This resets the EC firmware.

## Stumbling on The Fix

Totally unrelated and while researching some other issue, I glanced at the title of a thread that suggested that lm_sensors may glitch out after waking from suspend.

This inspired me to simply turn off the extensions that keep hammering the EC (probably via asus_nb_wmi) for information and _since then I have not experienced the issue anymore_.

I will update this post if I experience it again but for now, disabling those extensions eliminated the issue for me.

As a bonus on my Intel platform, I can use 120 Hz refresh rate now without constant screen flickering.

## Symptoms of EC / ACPI state corruption on Linux

I wrote two posts which I have now deleted since I found the root cause but I keep the summary of symptoms here for future reference. 


- Extremely slow reboots, **LUKS passphrase screen takes over a minute** to appear
- Slow or failed **wake from suspend**
- Choppy boot-screen spinner (>20 s) — reliable early warning
- Choppy login screen animation
- **Touchpad dropping inputs** or completely unresponsive
- **No audio**, only "dummy output" in PulseAudio / PipeWire
- **Fn / keyboard hotkeys** (brightness, volume) **freeze the system for ~10 seconds**
- Keyboard backlight unresponsive
- **Howdy** face-recognition login stops working
- Erratic **CPU frequency scaling**, general slowness
- Sensors unavailable, GPU settings gone, Wayland instability
- Connectivity issues
- `dmesg` produces no helpful output during freezes (fault is below the kernel, in EC firmware)

