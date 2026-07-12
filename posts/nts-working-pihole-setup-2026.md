---
layout: doc
date: 2026-07-12
title: my working pi-hole & fritzbox setup
description: how to set up pi-hole with fritzbox FAST in 2026
tags:
  - linux
  - dns
  - pi-hole
  - fritzbox
  - note-to-self
---

<Title/>

As a note to myself, I write this post so that I never have to scrape
this info from old threads and hallucinating LLMs again.

## Required Hardware

- short micro-usb cable
- short cat5 ethernet cable (optional)
- Raspberry Pi 1/2 or Zero 2 W, optionally with ethernet adapter
- a working 8gb+ micro sd card, micro-to-full-size adapter if you are using Raspberry Pi 1

## SD Card Setup

- download [_LATEST_ rpi-imager x86_64 AppImage](https://github.com/raspberrypi/rpi-imager/releases) - never use rpi-imager from os software repo
- `chmod a+x <imager-binary>` -> `sudo ./<imager-binary>`
- choose Raspberry Pi OS _Lite_:
    - scroll down
    - `Raspberry Pi OS (other)`
    - `Raspberry Pi OS Lite (32-bit)`
- set up the image
    - enable and set up wifi if you use it
    - enable remote access (ssh) with password
- flash image

## First boot and fixed IP-Address and SSH Setup

- plug the ethernet cable into your Raspberry Pi and into your fritzbox
- plug the micro-usb cable into your Raspberry Pi then into the USB-A port of your fritzbox
- wait 1-2 minutes
- [Log in to your fritzbox](http://fritz.box)
- click `Heimnetz` -> `Netzwerk`
- find your Raspberry Pi (look for the name you gave it during image creation)
- click the pencil-icon in the table
- click `Heimnetz`-Tab of the detail view
- set `IPv4-Adresse` to something you like
  - I use `2` since it is lower than the default lower bound of the default fritzbox dhcp lease range (20)
- tick `IPv4-Adresse dauerhaft zuweisen`
- click `Übernehmen` and confirm any popups

> At this point my fritzbox 7583 reliably crashes out and reboots. Nevermind, all settings are saved and your wifi/internet will be back after about 2 minutes.

Now, reboot your Raspberry Pi using ssh-password-login and the original ip-address or just pull the usb and connect it again

## OS Setup & pi-hole Installation

locally, edit `~/.ssh/config` and add:
```ssh-config
Host pihole ph
  Hostname 192.168.178.2
  user pi
```
Change hostname to the IP you assigned in fritzbox ui and user to the username set during image creation, then save the file and run `ssh-copy-id pihole`.

Now, connect to your pi-hole host, then run `sudo raspi-config`, go to `Advanced Options`, select `A1 Expand Filesystem`. Confirm, reboot, wait.

Log in again, [install pi-hole as described here](https://docs.pi-hole.net/main/basic-install/).

Note the password that is displayed on the final view of the installer and follow the link displayed there to open the pi-hole web interface.

## Fritzbox Setup

- [Log in to your fritzbox](http://fritz.box)
- click `Heimnetz` -> `Netzwerk` 
- select `Netzwerkeinstellungen` Tab of detail view
- scroll down to `Erweiterte Netzwerkeinstellungen`
- click the button labelled `Erweiterte Netzwerkeinstellungen`
- select `IPv4` Tab of detail view
- in the `DHCP` section enter the IP-Address of your pi-hole host in `Lokaler DNS-Server`
  - ⚠️ it is possible that `Lokaler DNS-Server` is completely empty. If so, write it down so you can revert to the empty value if you ever choose to.
- confirm
- confirm using required fritzbox 2FA option
  - I use random button on the device
- now, reboot or reconnect your devices and you should begin to see traffic in the pi-hole web interface

**You're done - your pi-hole is working and every device on your network should use it!**

## RESETTING / REVERTING

If you want to stop using pi-hole, follow the steps above but enter the original value as `Lokaler DNS-Server` or leave it blank if it was blank/empty before!

## Important note

The name and location of every button, tab and input I mention in this post may change at any time or can be different on your fritzbox model. The general concepts are the same, regardless of the button placement/label.

## Extra stuff

This is strictly optional but it's what i want from my setup!

### Disabling web interface password

I don't care for a password on my pihole web interface, so I run `sudo pihole setpassword`<C /> and hit return to turn it off.

### enabling logrotate

logrotate will keep your logs small and limited to a few days. Run `sudo cp /etc/.pihole/advanced/Templates/logrotate /etc/pihole/`<C />, then edit the copied file (`sudo nano /etc/pihole/logrotate`<C />) to change the logrotate settings for pi-hole, FTL and webserver logs.

### keeping query log short

To keep the database small and fast, edit the pihole.toml: `sudo nano /etc/pihole/pihole.toml`<C /> and change `maxDBdays` to a small value.
