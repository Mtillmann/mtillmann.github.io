---
layout: doc
date: 2023-12-16
title: Indicating drive power state on the PR2100
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


<<< @/public/resources/hdd-led.py

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

Next, run `sudo crontab -e`<C/> and add the following line at the bottom of the file:

```
* * * * * python3 /usr/local/sbin/hdd-led.py
```

Now, the LED will blink green when the drives are idle and solid blue when they're active.

<Comment />