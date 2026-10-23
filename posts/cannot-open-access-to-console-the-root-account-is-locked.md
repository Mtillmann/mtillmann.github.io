---
layout: doc
date: 2026-10-23
title: "fedora update: cannot open access to console, the root account is locked"
description: another handy note to myself to spare myself hours of arguing with some shitty LLM
tags:
  - note-to-self
  - linux
  - fedora
---

<Title/>

I like fedora but each _critical system update_ feels like playing russian roulette. Last time my bios had to be recovered from usb, this time my file system has partially disintegrated. These errors happening during/after updates may be coincidence or my fault for _holding it wrong_ but they piss me off either way.

Here's how to fix the issue on my cursed asus zenbook (intel ultra 9 285h):

## The issue

After the update, my first reboot got me to my WM but the filesystem was r/o. I just rebooted and after the LUKS prompt, I was greeted with this

```
Generating "/run/initramfs/rdsosreport.txt"

Entering emergency mode. Exit the shell to continue.
Type "journalctl" to view system logs.
You might want to save "/run/initramfs/rdsosreport.txt" to a USB stick or /boot after mounting them and attach it to a bug report.


Cannot open access to console, the root account is locked.
See sulogin(B) man page for more details.

Press Enter to continue.
```

## Enter fedora live boot

1. create a fedora usb stick using "fedora media writer"
2. reboot and hammer `f2`, `f8`, `del` until bios/setup utility opens
3. enter "advanced mode" go to last tab
4. find "boot override", scroll down and select actual partition on usb stick
5. boot into live fedora

## Open the LUKS volume in read-only mode
```bash
# change /dev/nvme0n1p3 to what ever your partition is called
sudo cryptsetup open --readonly /dev/nvme0n1p3 rescue
sudo mkdir -p /mnt/rescue
sudo mount -o ro,rescue=nologreplay,subvolid=5 /dev/mapper/rescue /mnt/rescue
```

## (optional) backup

Copy important files from `/mnt/rescue/home/YOURNAME` to an external drive, then unmount and wait for write operations to finish
```bash
cd /
sudo umount /mnt/rescue
sync
# wait for sync to finish, it might take some minutes depending on your backup size
```

## Check For Errors

```bash
# Check the filesystem
sudo btrfs check --readonly /dev/mapper/rescue
#Check the SSD status, check your actual device name
sudo smartctl -a /dev/nvme0n1
```
If you see anything bad: stop here and ask your LLM how to proceed!

## Unlock and repair in read-write mode

> Warning: `--repair` can destroy data. This is not a routine command

```bash
# again, use actual name of your partition here
sudo cryptsetup close rescue 
sudo cryptsetup open /dev/nvme0n1p3 rescue
sudo btrfs check --repair /dev/mapper/rescue
```

I had to run this twice, first run crashed, second went through without errors. After that, my fedora booted again!
