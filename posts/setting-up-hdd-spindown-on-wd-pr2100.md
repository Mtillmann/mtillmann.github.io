---
layout: doc
date: 2023-12-12
title: Setting up HDD spindown using hdparm on a WD PR2100
tags:
  - western-digital
  - pr2100
  - nas
  - digital-freedom 
  - right-to-repair
  - linux
  - ubuntu
  - hdparm
---

<Title/>

If you're using your PR2100 as a backup device or data grave, you may want to spin down the HDDs when they're not in use to save energy and reduce noise.

> Spinning down the HDDs (after a reasonable delay) might increase their lifespan but also increases the time it takes to access data on them. If you're using your PR2100 as a NAS, you may not want to do this.

I found that two approaches may work, although I finally went with the second one, because I couldn't get the [first one](https://wiki.archlinux.org/title/hdparm#Persistent_configuration_using_udev_rules) to perform reliably.

## Approach 1: Persistent configuration using udev rules

1. ssh into your PR2100
2. _for each drive_
   1. find out the [short serial](https://wiki.archlinux.org/title/Udev#Identifying_a_disk_by_its_serial) by running `udevadm info /dev/sdX | grep SHORT`<Cp/>, replace `sdX` with the device id of your drive, e.g. `sda`
   2. run `sudo nano /etc/udev/rules.d/69-hdparm.rules` and enter the following line
    ```
    ACTION=="add", SUBSYSTEM=="block", KERNEL=="sd[a-z]", ENV{ID_SERIAL_SHORT}=="SERIAL_FROM_ABOVE", RUN+="/usr/sbin/hdparm -B 127 -S 241 /dev/sdX"
    ```
    replace `SERIAL_FROM_ABOVE` with the short serial you acquired in step 2.1 and `sdX` with the device id of your drive, e.g. `sda`
3. reboot your PR2100 (hard)
4. run `sudo systemctl status udev.service` and look for any errors related to your drives

## Approach 2: Persistent configuration using cron

1. ssh into your PR2100
2. run `sudo crontab -e`
3. _for each drive_
   1. enter a new line at the bottom of the file
    ```
    @reboot sleep 30 && /usr/sbin/hdparm -B 127 -S 241 /dev/sdX
    ```
    replace `sdX` with the device id of your drive, e.g. `sda`
4. reboot your PR2100 (hard)

The `-B` parameter must be set below 128, because [values above 127 apparently disable spindown](https://wiki.archlinux.org/title/hdparm#Power_management_configuration:~:text=Values%20from%201%20to%20127%20permit%20spin%2Ddown%2C%20whereas%20values%20from%20128%20to%20254%20do%20not.).

## Check if it works

1. install smartmontools by running `sudo apt install smartmontools` ([reason](https://wiki.archlinux.org/title/hdparm#Querying_the_status_of_the_disk_without_waking_it_up))
2. wait for the drives to spin down, then run `sudo smartctl -i -n standby /dev/sda`. The output should look like this:
  ```
    smartctl 7.2 2020-12-30 r5155 [x86_64-linux-5.15.0-91-generic] (local build)
    Copyright (C) 2002-20, Bruce Allen, Christian Franke, www.smartmontools.org

    Device is in STANDBY mode, exit(2)
  ```

## Spindown Time Notation

[From the documentation](https://wiki.archlinux.org/title/hdparm#:~:text=The%20value%20of%200%20disables%20spindown%2C%20the%20values%20from%201%20to%20240%20specify%20multiples%20of%205%20seconds%20and%20values%20from%20241%20to%20251%20specify%20multiples%20of%2030%20minutes.):

>  The value of 0 disables spindown, the values from 1 to 240 specify multiples of 5 seconds and values from 241 to 251 specify multiples of 30 minutes.

Here's a table with some examples:

| Value | Time |
|-------|------|
| 0     | disabled |
| 1     | 5 seconds |
| 2     | 10 seconds |
| 120   | 10 minutes |
| 240   | 20 minutes |
| 241   | 30 minutes |
| 242   | 60 minutes |
| 243   | 90 minutes |
| 244   | 120 minutes |
| 250   | 240 minutes |

## Bonus: Show drive state with power the LED

If you want to see if your drives are spinning or not, you can use the LED on the front of the device to show the state of the drives.

run `sudo nano /usr/local/sbin/hdd-led.py` and paste the following code:

```python
import os
import sys

if os.geteuid() != 0:
  print("this script needs to be run as root")
  sys.exit(1)

# list of disks to check, e.g. ["/dev/sda", "/dev/sdb"]
disks = ["/dev/sda"]
active_disk_count = 0

# if True, the green LED will blink when the disks are idle
blink_on_idle = True

for disk in disks:
  cmd = f"smartctl -i -n standby {disk} | grep -i \"power mode is\""
  stream = os.popen(cmd)
  cmd_output = stream.read().strip().lower()
  if "active" in cmd_output or "idle" in cmd_output:
    active_disk_count += 1

led_cmd = ''

if blink_on_idle:
    if active_disk_count > 0:
        led_cmd = 'wdhwc led --power --steady --blue && wdhwc led --power --blink'
    else:
        led_cmd = 'wdhwc led --power --blink --green && wdhwc led --power --steady'
else:
    if active_disk_count > 0:
        led_cmd = 'wdhwc led --power --steady --blue && wdhwc led --power --blink'
    else:
        led_cmd = 'wdhwc led --power --steady --green && wdhwc led --power --blink'

os.system(led_cmd)
```

Next, run `sudo crontab -e` and add the following line at the bottom of the file:

```
* * * * * python3 /usr/local/sbin/hdd-led.py
```

Now, the LED will blink green when the drives are idle and solid blue when they're active.

<Comment />