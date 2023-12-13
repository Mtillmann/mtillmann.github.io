---
layout: doc
date: 2023-12-13
title: Installing a wifi stick on the PR2100 with Ubuntu Server
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

> DO THIS WHILE YOUR MACHINE IS STILL CONNECTED TO THE NETWORK VIA CABLE

To enable your PR2100 to connect to wifi, you'll need a wifi stick that works with linux.
Once you have one, follow these steps:

1. ssh into your PR2100
2. run `sudo apt install wpasupplicant`<Cp/>
3. plug in your wifi stick
4. run `lshw -C network`<Cp/> and look for an `*-network`-entry with the description `Wireless interface`
5. copy the `logical name` of the entry, e.g. `wlan0` or something more cryptic like `wlx801f02cd1234`
6. open `/etc/netplan/01-network-config.yaml` with `sudo nano /etc/netplan/01-network-config.yaml`<Cp/> and add the following lines:
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

7. run `sudo netplan apply -debug`<Cp/> to apply the changes
8. now run `ip address`<Cp/> and look for an entry with your stick's logical name, e.g. `wlan0` or `wlx801f02cd1234`. It should include `state up` and `inet` with an IP address. 
9. power down your PR2100, remove the network cable and boot it up again

You should now be able to ssh into your PR2100 via wifi.

<Comment/>