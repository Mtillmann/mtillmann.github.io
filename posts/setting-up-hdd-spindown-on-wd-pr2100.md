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
  - hd-idle
---

<Title/>

If you're using your PR2100 as a backup device or data grave, you may want to spin down the HDDs when they're not in use to save energy and reduce noise.

> Spinning down the HDDs (after a reasonable delay) might increase their lifespan but also increases the time it takes to access data on them. If you're using your PR2100 as a NAS, you may not want to do this.

> Spoiler: Approach 4 is the only one that consistently and reliably worked for me. 

## Approach 1: udev rules

1. ssh into your PR2100
2. _for each drive_
   1. find out the [short serial](https://wiki.archlinux.org/title/Udev#Identifying_a_disk_by_its_serial) by running `udevadm info /dev/sdX | grep SHORT`<C/>, replace `sdX` with the device id of your drive, e.g. `sda`
   2. run `sudo nano /etc/udev/rules.d/69-hdparm.rules`<C/> and enter the following line
    ```ini
    ACTION=="add", SUBSYSTEM=="block", KERNEL=="sd[a-z]", ENV{ID_SERIAL_SHORT}=="SERIAL_FROM_ABOVE", RUN+="/usr/sbin/hdparm -B 127 -S 241 /dev/sdX"
    ```
    replace `SERIAL_FROM_ABOVE` with the short serial you acquired in step 2.1 and `sdX` with the device id of your drive, e.g. `sda`
3. reboot your PR2100 (hard)
4. run `sudo systemctl status udev.service`<C/> and look for any errors related to your drives

> Never worked for me

## Approach 2: cron

1. ssh into your PR2100
2. run `sudo crontab -e`<C/>
3. _for each drive_
   1. enter a new line at the bottom of the file
    ```
    @reboot sleep 30 && /usr/sbin/hdparm -B 127 -S 241 /dev/sdX
    ```
    replace `sdX` with the device id of your drive, e.g. `sda`
4. reboot your PR2100 (hard)

The `-B` parameter must be set below 128, because [values above 127 apparently disable spindown](https://wiki.archlinux.org/title/hdparm#Power_management_configuration:~:text=Values%20from%201%20to%20127%20permit%20spin%2Ddown%2C%20whereas%20values%20from%20128%20to%20254%20do%20not.).

> Worked for me initially while testing with an old samsung drive, but not with my new WD Red drives

## Approach 3: `hdparm.conf`

See [this post](https://stackoverflow.com/questions/49841690/hdparm-conf-settings-dont-seem-to-run-at-boot) for a configuration example AND
several hacks that may or may not be required to make it work.

> Never worked for me

## Approach 4: `hd-idle`

> Heads up: [for reasons related to using usb boot media](https://github.com/storaged-project/udisks/issues/892) you must set the spindown time to less than 10 minutes. YMMV

[Install using the instructions here](https://github.com/adelolmo/hd-idle). 

Very easy to set up and the most straightforward solution I've found so far.

I'm using the following configuration in `/etc/default/hd-idle`:

```ini{3}
START_HD_IDLE=true
# documentation...
HD_IDLE_OPTS="-i 0 -a sda -i 450"
```
This disables spindown by default (my M.2 ssd wont need it) and sets the spindown time to 7:30 minutes for `sda`. 

Append `-a sdX -i NN` for each additional drive you want to spin down.

### Inspecting hd-idle's log

To see if your config is working as expected, set `HD_IDLE_OPTS="-d -i 0 -a sda -i 60"`<C/>, then restart hd-idle by running `sudo service hd-idle restart`<C/>.

This will enable debug logging and set the spindown time to 60 seconds for easier inspection.

Next, make sure your drive is awake by writing to the disk `touch /YOUR/MOUNT/FOLDER/wakeup`<C/>, then wait for it to spin down again.

Now, run `watch -c "sudo SYSTEMD_COLORS=1 systemctl status hd-idle"`<C/> and keep
watching the log for a minute. 

`sda`s `reads` and `writes` values should not change and the `idleDuration` should increase every time the log is updated.

When the `idleDuration` reaches 60 seconds, a line reading `sda spindown` should appear in the log. 

Congratulations, your drive is now spinning down after 60 seconds of inactivity.

Revert the changes to `HD_IDLE_OPTS` and restart hd-idle again to go back to your normal configuration.

> This is what I'm using now and I am very happy with it 👍

## Approach 5: `udisks2`

The documentation suggests [that you can control the spindown using udisks](https://wiki.archlinux.org/title/udisks#Apply_ATA_settings) and that it will remedy the issue where the udisks "housekeeping" process wakes up the drives every 10 minutes but it didn't work for me.

> Never worked for me

## Check if it works

After the drives _should have_ spun down, you can check if they're still active by running one of the following commands:

### Using `hdparm`

run `sudo hdparm -C /dev/sda`<C/> and look for `drive state is:  standby` in the output.

```
/dev/sda:
 drive state is:  standby
```

### Using `smartctl`

`sudo apt install smartmontools -y`<C/> ([reason](https://wiki.archlinux.org/title/hdparm#Querying_the_status_of_the_disk_without_waking_it_up)) then `sudo smartctl -i -n standby /dev/sda`<C/>.

 The output should look like this:
  ```
    smartctl 7.2 2020-12-30 r5155 [x86_64-linux-5.15.0-91-generic] (local build)
    Copyright (C) 2002-20, Bruce Allen, Christian Franke, www.smartmontools.org

    Device is in STANDBY mode, exit(2)
  ```

## `hdparm` Spindown Time Notation

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
