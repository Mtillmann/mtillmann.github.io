---
layout: doc
date: 2023-02-22
title: how to install a game from iso on steam deck
description: A small guide on how to install a game from an ISO-File on the Steam Deck
tags:
  - linux
  - steamdeck
  - iso
  - abandonware
  - wine
---

<Title/>

## Background

When I got my steam deck I wanted to try and install VTMB on the deck. For some reason there seemed to be no working guide on how to install an ISO and those suggesting PowerISO didn't work at all so I wrote this guide and shared it with my friends. Now I post it here to hopefully help some others who are stuck with the same issue.

> Note: Steps 2, 3 and 4 only must be completed once

## 1. Enter the desktop mode
Press the Power Button, select "exit to desktop mode" and wait for desktop to boot.

## 2. Install necessary software
Click "discover"-app (shopping bag icon) in the bottom bar, search for "wine" and install it, then search for "flatseal" and install it.

## 3. Set Wine permissions
Open "flatseal"-app, search for "wine" in the list on the left and then in the right panel, scroll to "Filesystem" and finally enable all 4 items.

## 4. Prepare your System
Connect a physical keyboard or screenshare your steamdeck with a machine that has a physical keyboard.  
Next, click the Steam-Icon in the lower left corner, navigate to system, click "Konsole".  
If you haven't set a sudo-password, do it now:
```shell
passwd
# enter a password and confirm it
```
## 5. Actually Mount ISO
First, create a mount-folder like this:
```shell
sudo mkdir /run/media/ISO
```
Then actually mount the ISO-File
```shell
sudo mount /path/to/your/iso-file /run/media/ISO -o loop
```
## 6. Install the game
In Dolphin (file browser) navigate to your mount folder, locate the `setup.exe`, right click it and select `Open with Wine Windows Program Loader`. Select your local filesystem (should be `Z:`) during the installation. 

Afterwards, copy any patches to from the ISO to the installation folder. 

## 7. Add non-steam game
While in desktop-mode, open steam and add the game's main executable file as a non-steam game. 
   
## Conclusion
While adding the game to steam I discovered that I own the game in steam and it wouldn't properly run either way. 

Please only use this method for games that you own a physical copy of!


<Comment />
