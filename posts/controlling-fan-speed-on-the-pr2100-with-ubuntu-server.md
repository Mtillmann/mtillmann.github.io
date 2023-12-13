---
layout: doc
date: 2023-12-13
title: Controlling fan speed on the PR2100 with Ubuntu Server
tags:
  - western-digital
  - pr2100
  - nas
  - digital-freedom 
  - right-to-repair
  - linux
  - ubuntu
  - power-management
---

<Title/>

> Do this only if you know what you're doing, I'm not responsible for any damage to your device.

Even though [this file](https://github.com/michaelroland/wdnas-hwdaemon/blob/master/tools/wdhwd.conf) suggests that it is possible to control the fan speed via config, the `fan_speed_*`-values will be absent from the file on your device and the actual scripts apparently never read the values from the file.

To set a lower idle fan speed, do the following:

1. ssh into your PR2100
2. run `sudo nano /usr/local/lib/wdhwd/wdhwlib/fancontroller.py`
3. hit `ctrl+w`, enter `FAN_DEFAULT = 30`, hit `enter`
4. change the value to something lower, e.g. `FAN_DEFAULT = 20` but don't go lower than `FAN_MIN`
5. hit `ctrl+o` `enter` `ctrl+x` to save your file and exit the editor
6. run `sudo systemctl restart wdhwd.service` to restart the service and avoid having to reboot

I've set mine to 15% and it's working fine.

By looking at `fancontroller.py` I found out that the script assumes the _normal_ temperature of the unit to be below 69°C. When I forced the temps to go over the 69°C the fan quickly spins up and cools (or attempts to cool) the unit down to 69°C again.

It's not quite a fan curve tool but you can basically can create by custom curves by modifying the script to your liking.

> Be aware that the unit will turn off when the you set the fan speed to 0


<Comment/>