---
layout: doc
date: 2026-02-23
title: Getting howdy to run on fedora 43 (workstation)
description: Step by step setup for getting howdy to run on modern fedora
tags:
  - linux
  - fedora
  - howdy
  - gnome
  - biometric-login
  - note-to-self
---

<Title/>

This guide is a note to myself and based on [this issue](https://github.com/boltgolt/howdy/issues/1069) and [Ronny's forked COPR version](https://copr.fedorainfracloud.org/coprs/ronnypfannschmidt/howdy-beta/):

## Step 1. Install COPR and howdy

```
sudo dnf copr enable ronnypfannschmidt/howdy-beta
sudo dnf install howdy howdy-gtk
```

This will take some time as >1GiB of packages are pulled in.

## Step 2. Find your (IR) Camera Device and add to config

Run `ls -la /dev/video*`<C/> and then try every device with mpv like this `mpv /dev/video0`. If the video is flashing and black-and-white, you've likely found your IR camera device! (`sudo dnf install mpv -y`<C /> if you haven't installed mpv)

Add the discovered device to the howdy config by running `sudo howdy config`<C />, search for `device_path`, add your device and save the file.

## Step 3. Add your face

Run `sudo howdy add` or use `howdy-gtk` if you prefer ui.

## Step 4. Add howdy as auth method

To use howdy for the gnome login screen, add

```
auth        sufficient    pam_howdy.so no_confirmation
```
as _the second line_ to `/etc/pam.d/gdm-password`<C/>, by running `sudo nano /etc/pam.d/gdm-password`<C/>. 

To use howdy as a general `sudo` auth method, add the line above as the second line to `/etc/pam.d/sudo` by running `sudo nano /etc/pam.d/sudo`<C/>.

<Comment />
