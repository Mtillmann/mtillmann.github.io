---
layout: doc
date: 2023-12-10
title: Installing Ubuntu Server 22.04 on the WD PR2100 in late 2023
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

- a WD PR2100 including powerbrick
- a fast usb storage device > 16gb
- network cable connected to your PR2100
- linux or mac ([intel?](https://github.com/aamkye/ubuntu_on_WD_PRx100#macos-native-m1-not-supported)) machine
- basic familiarity with linux and the terminal
- noise cancelling headphones

## Basic setup

follow this guide: https://github.com/aamkye/ubuntu_on_WD_PRx100 only to the network configuration part, ignore "_Extras (meant to be run on NAS directly)_", see below

> Make sure to install OpenSSH Server when prompted by Ubuntu Installer

> Depending on your installation media the installation may take 10 to 30 minutes

> The installer will not exit, instead there'll be a message like "subiquity/late/run" in the log and no more new lines. Either hit the "reboot now" text-button or just close the VM window and reboot it without the CD-ROM, as described in the original guide.

## Networking Setup

**If you can get copy and paste to work on your instance, do that and paste the configuration and mac addresses to the file.** 

Otherwise:

1. run `wget https://raw.githubusercontent.com/aamkye/ubuntu_on_WD_PRx100/master/readme.md`
2. run `nano readme.md`
3. keep pressing `ctrl+k` to remove lines before and after the netplan config, navigate using arrow keys
4. insert your mac addresses
5. hit `ctrl+o` `enter` `ctrl+x` to save your file and exit the editor
6. run `sudo readme.me /etc/netplan/01-network-config.yaml`

## First Boot

1. shut down VM, remove stick and insert into your PR2100
2. wait for ~2-5 minutes for the PR2100 to boot 
3. acquire PR2100's IP address on your network, use your routers network view or use a scanning tool
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

Now, within a few seconds the fan should spin down!

## Surviving Reboots

[There are 2 issues with the hardware control](https://github.com/WDCommunity/wdnas-hwtools/issues/12):

### Soft Reboots

Soft reboots will always fail because the actual fan speed is not detected and the
the unit is shut down because it thinks it's overheating. There is no way to fix this.

> **Solution:** Don't soft reboot, always shut down and then power on again

### Power Cycles/Regular Boots

`wdhwd.service` will fail to initialize on boot but there is a workaround:

1. ssh into your PR2100
2. run `sudo crontab -e`
3. add the following line to the end of the file: `@reboot sleep 90 && systemctl restart wdhwd.service`

This will restart the service 90 seconds after boot, which means an additional 90 seconds of full blast after every boot.

To avoid having to reboot immediately after inserting the line above, you can run `sudo systemctl restart wdhwd.service` manually.

# Bonus: Installing Wifi Stick

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

<Comment />