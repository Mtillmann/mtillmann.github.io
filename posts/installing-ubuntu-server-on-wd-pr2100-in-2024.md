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

> Hint: The installer will not exit, it'll say "Install Complete!" at the top. When the security updates are finished, there'll be a message like "subiquity/late/run" in the log and no more new lines. Just close the VM window and reboot it without the CD-ROM, as described in the original guide.

## Networking Setup

**If you can get copy and paste to work on your instance, do that and paste the configuration and mac addresses to the file.** 

I couldn't get copy and paste to work, so I did this:

1. run `wget https://raw.githubusercontent.com/aamkye/ubuntu_on_WD_PRx100/master/readme.md`<Cp/>
2. run `nano readme.md`
3. keep pressing `ctrl+k` to remove lines before and after the netplan config, navigate using arrow keys
4. insert your mac addresses
5. hit `ctrl+o` `enter` `ctrl+x` to save your file and exit the editor
6. run `sudo readme.me /etc/netplan/01-network-config.yaml`<Cp/>

## First Boot

1. shut down VM, remove stick and insert into your PR2100
2. wait for ~2-5 minutes for the PR2100 to boot. The main LED should have a solid blue light when booting is complete, although you can try and connect to it before that.
3. acquire your PR2100's IP address on your network: use your routers network view or use a scanning app
4. ssh into the PR2100 using the credentials you set during the ubuntu server install

> Note: unless the next step is completed, the fan will spin at full speed AND the blue LED will blink forever

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
2. run `sudo crontab -e`<Cp/>
3. add the following line to the end of the file: `@reboot sleep 90 && systemctl restart wdhwd.service`<Cp/>
4. run `sudo systemctl restart wdhwd.service`<Cp/> immediately to avoid having to reboot

This will restart the service 90 seconds after boot.


<Comment />