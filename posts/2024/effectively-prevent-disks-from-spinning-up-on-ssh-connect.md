---
layout: doc
date: 2024-07-26
title: Effectively prevent disks from spinning up on SSH connect
description: If you*re fed up with your NAS' disks spinning up every time you connect to it via SSH, here's a solution for you.
tags:
  - linux
  - ubuntu
  - nas
  - hdd
  - ssh
---

<Title/>

Again, a note to my future self and anyone else who might find this useful.

I was annoyed by the fact that my NAS' disks would spin up every time I connected to the machine via SSH. 
More than the noise and wear I hate to wait for the disks to spin up before I can do anything.

I investigated a bit and found a solution that works for me on Ubuntu 22.04 LTS:

Disabling the `Disk` plugin of `landscape-sysinfo` which is responsible for the disk spin-up. `landscape-sysinfo` is a package that provides the system information that is displayed when you log in via SSH.

If you disable the `Disk` plugin, you'll lose the `Usage of /` info item and the warning if some disk is almost full. But if you're like me and don't care about that, you can disable it.

Here's how you do it:

First, run `sudo nano /etc/update-motd.d/50-landscape-sysinfo`<C />, then replace the line

```shell
"$(/usr/bin/landscape-sysinfo)")
```

with this one
```shell
"$(/usr/bin/landscape-sysinfo --exclude-sysinfo-plugins=Disk)")
```

No need to restart anything, the changes should take effect immediately for new SSH connections. The connection will now be faster and quieter because the disks won't spin up!

If your ssh login is still slow, you might want to check if you have any other scripts in `/etc/update-motd.d/` that might be causing the delay.

<Comment/>