---
layout: doc
date: 2023-12-11
title: Installing Ubuntu Server 22.04 on WD PR2100 in late 2023
tags:
  - western-digital
  - pr2100
  - nas
  - digital-freedom 
  - right-to-repair
  - linux
  - ubuntu
  - wifi
---

<Title/>

> Disclaimer: do this at your own risk, I'm not responsible for any damage to your device. Also, I'm not a linux expert, I just followed the guide and figured out how to get the hardware control working. Please do not do this with a machine that has important data on it.

## Prerequisite

You'll need:

- a fast, reliable usb storage device >= 16gb, f.x. a small cheap M.2 64GB SSD in a usb enclosure
- network cable connected to your PR2100
- a linux machine or ([intel?](https://github.com/aamkye/ubuntu_on_WD_PRx100#macos-native-m1-not-supported)-)mac 
- basic familiarity with linux and the terminal
- optional: noise cancelling headphones

## Basic setup

follow this guide: https://github.com/aamkye/ubuntu_on_WD_PRx100 only to the network configuration part, ignore "_Extras (meant to be run on NAS directly)_", see below

> Hint: Make sure to install OpenSSH Server when prompted by Ubuntu Installer

> Hint: Depending on how slow your storage device is, the installation may take 10 to 30 minutes

> Hint: The installer will not exit, instead there'll be a message like "subiquity/late/run" in the log and no more new lines. Either hit the "reboot now" text-button or just close the VM window and reboot it without the CD-ROM, as described in the original guide.

## Networking Setup

**If you can get copy and paste to work on your instance, do that and paste the configuration and mac addresses to the file.** 

I couldn't get copy and paste to work, so I did this:

1. run `wget https://raw.githubusercontent.com/aamkye/ubuntu_on_WD_PRx100/master/readme.md`
2. run `nano readme.md`
3. keep pressing `ctrl+k` to remove lines before and after the netplan config, navigate using arrow keys
4. insert your mac addresses
5. hit `ctrl+o` `enter` `ctrl+x` to save your file and exit the editor
6. run `sudo readme.me /etc/netplan/01-network-config.yaml`

## First Boot

1. shut down VM, remove stick and insert into your PR2100
2. wait for ~2-5 minutes for the PR2100 to boot. The main LED should have a solid blue light when booting is complete, although you can try and connect to it before that.
3. acquire your PR2100's IP address on your network: use your routers network view or use a scanning app
4. ssh into the PR2100 using the credentials you set during the ubuntu server install

## Hardware Control

Since the instructions in the original tutorial are outdated, here's how to get the hardware control working

### Install `hddtemp` ([via](https://askubuntu.com/a/1403901/1724194))

```shell
sudo apt update
wget http://archive.ubuntu.com/ubuntu/pool/universe/h/hddtemp/hddtemp_0.3-beta15-53_amd64.deb
```
then:
```shell
sudo apt install ./hddtemp_0.3-beta15-53_amd64.deb
```

### Install `wdnas-hwtools` 

Create a root shell
```shell
sudo su
``` 
then
```shell
add-apt-repository universe
cd /opt
git clone https://github.com/WDCommunity/wdnas-hwtools
cd /opt/wdnas-hwtools
./install.sh
```
then hit `crtl+d` to exit root shell

Now, within a few seconds the fan should spin down to 30% of its max speed.

## Surviving Reboots

[There are 2 issues with the hardware control](https://github.com/WDCommunity/wdnas-hwtools/issues/12):

### Soft Reboots

Soft reboots will always fail because the actual fan speed is not detected and the
the unit is shut down because it thinks the fan is broken. There is no way to fix this.

> **Solution:** Don't soft reboot, always shut down and then power on again

### Power Cycles/Regular Boots

`wdhwd.service` will fail to initialize on boot, so the fan will spin at full speed until the service is restarted.
To fix this, do the following:

1. ssh into your PR2100
2. run `sudo crontab -e`
3. add the following line to the end of the file: `@reboot sleep 90 && systemctl restart wdhwd.service`
4. run `sudo systemctl restart wdhwd.service` immediately to avoid having to reboot

This will restart the service 90 seconds after boot.

## Bonus: Controlling Idle Fan Speed

> Do this only if you know what you're doing, I'm not responsible for any damage to your device.

Even though [this file](https://github.com/michaelroland/wdnas-hwdaemon/blob/master/tools/wdhwd.conf) suggests that it is possible to control the fan speed via config, the `fan_speed_*`-values will be absent from the file on your device and the actual scripts apparently never read the values from the file.

To set a lower idle fan speed, do the following:

1. ssh into your PR2100
2. run `sudo nano /usr/local/lib/wdhwd/wdhwlib/fancontroller.py`
3. hit `ctrl+w`, enter `FAN_DEFAULT = 30`, hit `enter`
4. change the value to something lower, e.g. `FAN_DEFAULT = 20` but don't go lower than `FAN_MIN`
5. hit `ctrl+o` `enter` `ctrl+x` to save your file and exit the editor
6. run `sudo systemctl restart wdhwd.service`

I've set mine to 15% and it's working fine.

By looking at `fancontroller.py` I found out that the script assumes the _normal_ temperature of the unit to be below 69°C. When I forced the temps to go over the 69°C the fan quickly spins up and cools (or attempts to cool) the unit down to 69°C again.

It's not quite a fan curve tool but you can basically can create by custom curves by modifying the script to your liking.

> After modifying the script, you'll have to restart the service for your changes to kick in: `sudo systemctl restart wdhwd.service`

> Be aware that the unit will turn off when the fan speed hits 0 or the temperature goes above 90°C

## Bonus II: Installing Wifi Stick

> DO THIS WHILE YOUR MACHINE IS STILL CONNECTED TO THE NETWORK VIA CABLE

To enable your PR2100 to connect to wifi, you'll need a wifi stick that works with linux.
Once you have one, follow these steps:

1. ssh into your PR2100
2. run `sudo apt install wpasupplicant`
3. plug in your wifi stick
4. run `lshw -C network` and look for an `*-network`-entry with the description `Wireless interface`
5. copy the `logical name` of the entry, e.g. `wlan0` or something more cryptic like `wlx801f02cd1234`
6. open `/etc/netplan/01-network-config.yaml` with `sudo nano /etc/netplan/01-network-config.yaml` and add the following lines:
```yaml
  wifis:
    YOUR_LOGICAL_NAME_HERE:
      dhcp4: true
      access-points:
        "YOUR_WIFI_SSID":
          password: "YOUR_WIFI_PASSWORD"
```

Replace `YOUR_LOGICAL_NAME_HERE` with logical name you acquired in step 5, `YOUR_WIFI_SSID` with your wifi's SSID and `YOUR_WIFI_PASSWORD` with your wifi's password.

Keep in mind that the indentation is important, so make sure to copy the spaces correctly.
Also make sure that the indentation of the `wifis`-line is the same as the `ethernets`-line above it. 

> If you're using a 5GHz wifi, make sure that your wifi stick supports it. If it doesn't, you'll have to use a 2.4GHz wifi.

7. run `sudo netplan apply -debug` to apply the changes
8. now run `ip address` and look for an entry with your stick's logical name, e.g. `wlan0` or `wlx801f02cd1234`. It should include `state up` and `inet` with an IP address. 
9. power down your PR2100, remove the network cable and boot it up again

You should now be able to ssh into your PR2100 via wifi.

## Bonus III: HDD Spindown

If you're using your PR2100 as a backup device or data grave, you may want to spin down the HDDs when they're not in use to save energy and reduce noise.

> Spinning down the HDDs (after a reasonable delay) might increase their lifespan but also increases the time it takes to access data on them. If you're using your PR2100 as a NAS, you may not want to do this.

There are several suggestions on how to do this, but none of them except for [this one](https://wiki.archlinux.org/title/hdparm#Persistent_configuration_using_udev_rules) worked for me:


1. ssh into your PR2100
2. _for each drive_
   1. find out the [short serial](https://wiki.archlinux.org/title/Udev#Identifying_a_disk_by_its_serial) by running `udevadm info /dev/sdX | grep SHORT`, replace `sdX` with the device id of your drive, e.g. `sda`
   2. run `sudo nano /etc/udev/rules.d/69-hdparm.rules` and enter the following line
    ```
    ACTION=="add", SUBSYSTEM=="block", KERNEL=="sd[a-z]", ENV{ID_SERIAL_SHORT}=="SERIAL_FROM_ABOVE", RUN+="/usr/sbin/hdparm -B 127 -S 241 /dev/sdX"
    ```
    replace `SERIAL_FROM_ABOVE` with the short serial you acquired in step 2.1 and `sdX` with the device id of your drive, e.g. `sda`
3. reboot your PR2100 (hard)
4. run `sudo systemctl status udev.service` and look for any errors related to your drives
5. install smartmontools by running `sudo apt install smartmontools` ([reason](https://wiki.archlinux.org/title/hdparm#Querying_the_status_of_the_disk_without_waking_it_up))
6. wait for the drives to spin down, then run `sudo smartctl -i -n standby /dev/sda`. The output should look like this:
  ```
    smartctl 7.2 2020-12-30 r5155 [x86_64-linux-5.15.0-91-generic] (local build)
    Copyright (C) 2002-20, Bruce Allen, Christian Franke, www.smartmontools.org

    Device is in STANDBY mode, exit(2)
  ```

> Hint: the `-B` parameter must be set below 128, because [values above 127 apparently disable spindown](https://wiki.archlinux.org/title/hdparm#Power_management_configuration:~:text=Values%20from%201%20to%20127%20permit%20spin%2Ddown%2C%20whereas%20values%20from%20128%20to%20254%20do%20not.)

### Spindown Time Notation

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


<Comment />