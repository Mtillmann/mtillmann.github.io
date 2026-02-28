---
layout: doc
date: 2026-02-28
title: Asus Zenbook Embedded Controller Struggles
description: Symptoms of EC state corruption caused by ACPI WMI mishandling
tags:
  - linux
  - embedded-controller
  - fedora
  - note-to-self
  - mental-health
---
<Title />

As a follow-up to my [other post about corrupted EC/firmware state on both AMD and INTEL devices during/after updates](./surviving-fedora-updates-and-keeping-sane.md), I want to focus on the seemingly random EC state corruptions that I only experience on the Intel platform (ultra 9 285h). 

## The Situation

I rarely reboot my laptop, basically only to apply updates. On my new intel zenbook I noticed that after some time (10-24 hours) the EC state will go corrupt. The issue is subtle but indicates like this:

- reboots take forever, even reaching LUKS screen is >1min
- waking up from suspend is slow
- the login screen transition from user-select to password-input is choppy
- [howdy](./howdy-on-fedora-43.md) stops working
- touchpad will drop random inputs
- using keyboard hotkeys (brightness up/down etc) hangs the system for ~10sec
- generally bad performance, weird frequency scaling of CPU etc

The immediate fix is of course to just push and hold the power button for a minute or so but I want to find a solution that prevents this from happening.

During the hangs, dmesg produced no output whatsoever. This is significant: it means the freeze did not occur in kernel space, but inside the EC/ACPI firmware itself - at a layer the kernel cannot observe or log. The EC reset being the only possibility to recover confirms the EC entered a corrupted state.

## Approach #1: WAPF Setting

Claude 4.6 suggested that I change the WAPF ("WMI ACPI Power Feature") value from 0 to 4 to avoid corrupting the EC state by pressing the FN+F-Keys although I doubt that this causes the issue. I think it is more likely that the weird FN+F-key behaviour is a symptom than the cause. Either way, here are the commands I used to set that value from 0 to 4:

```shell
# before
cat /sys/module/asus_nb_wmi/parameters/wapf
# change from current value to 4
echo "options asus_nb_wmi wapf=4" | sudo tee /etc/modprobe.d/asus-nb-wmi.conf
sudo rmmod asus_nb_wmi && sudo modprobe asus_nb_wmi
# after
cat /sys/module/asus_nb_wmi/parameters/wapf
```

## Coping with the issue regardless of a fix

I was thinking of returning the laptop because I was really frustrated with the issue but the retailer I purchased it from declined to take it back with the reasoning that the issue is extremely hard to reproduce and apparently does not occur when running the only supported OS: windows.

Asus may have some windows-driver that constantly resets the EC to avoid such issues but using windows is absolutely out of the question for me. 

Maybe I am running into a hardware-too-new-issue with the kernel here, as I have before and maybe this will fix itself down the road.


## Next steps

- take a photo of the errors that happen during boot before boot once I enter the corrupted state
- track how of then error occurs and if there is software-related action that may trigger it
