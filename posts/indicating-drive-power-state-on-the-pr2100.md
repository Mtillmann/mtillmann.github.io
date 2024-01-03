---
layout: doc
date: 2023-12-16
title: Indicating drive power state on the PR2100's front LEDs
description: A small script to indicate the power state of the drives on the PR2100's front LEDs - green for spun down, blue for spun up
tags:
  - western-digital
  - pr2100
  - nas
  - digital-freedom 
  - right-to-repair
  - linux
  - ubuntu
---

<Title/>

If you've managed to set up HDD spindown on your PR2100, you may want to indicate the power state of the drives on the front LEDs.

## Installation

Run `sudo wget -O /usr/local/sbin/hdd-led.py https://raw.githubusercontent.com/Mtillmann/mtillmann.blog/master/public/resources/hdd-led.py`<C/> or copy the script from below and paste it into a file at `/usr/local/sbin/hdd-led.py`<C/>

Run `sudo crontab -e`<C/> and add the following line at the bottom of the file:

```
* * * * * python3 /usr/local/sbin/hdd-led.py power -d /dev/sda
```

Add a new `-d` argument for each drive you want to include in the status, e.g.:

```
* * * * * python3 /usr/local/sbin/hdd-led.py power -d /dev/sda -d /dev/sdb
```

### Arguments

| Argument | Short Form | Default Value | Description |
| --- | --- | --- | --- |
| - | - | - | `power`, `usb` or `reset`. first two select LED mode, `reset` resets the LEDs |
| disk | -d | - | disk to include in check, can be given multiple times |
| blink | -b | - | blink on idle - only for `mode` = `power` |
| probemode | -p | h | which tool to use for state probe: `h`=`hdparm`, `s`=`smartctl` |
| debug | - | - | print some debug info |

### Examples

`sudo python3 /usr/local/sbin/hdd-led.py power -d /dev/sda`<C/>
Turns the main power LED green if the drive is spun down.

`sudo python3 /usr/local/sbin/hdd-led.py power -d /dev/sda -p s`<C/>
Turns the main power LED green if the drive is spun down but uses `smartctl` instead of `hdparm` to probe the drive state.

`sudo python3 /usr/local/sbin/hdd-led.py power -d /dev/sda -b`<C/>
Turns the main power LED green and blinks it if the drive is spun down.

`sudo python3 /usr/local/sbin/hdd-led.py usb -d /dev/sda`<C/>
Turns the USB LED blue if the drive is spun down.

`sudo python3 /usr/local/sbin/hdd-led.py reset`<C/>
Resets the LEDs to their default state (Power: steady blue, USB: off).

## hdd-led.py

<<< @/public/resources/hdd-led.py


<Comment />