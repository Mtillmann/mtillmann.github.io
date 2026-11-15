---
layout: doc
date: 2026-01-13
title: using gnome keyboard shortcut to create new kitty tab and general key disenshittification
description: open a new kitty instance or a new tab in existing instance with keyboard shortcut
tags:
  - gnome
  - kitty
  - ux
  - keyboard
  - note-to-self
---

<Title />   

I like to hit `ctrl+alt+t` to open a terminal instance in my gnome. Additionaly I want the keyboard-shortcut to open a new kitty instance OR if the instance already exists, it should create a new tab inside that window and bring the kitty window to the front.

To achieve this, first I need to enable remote control in kitty config (`crtl+shift+f2`)

```config
allow_remote_control socket-only
```

Next, create the keyboard shortcut in gnome settings (_Settings_ -> _Keyboard_ -> _View and Customize Shortcuts_ -> _Custom Shortcuts_):

```sh 
sh -c "k=/home/martin/.local/kitty.app/bin/kitty; $k @ --to unix:@kt launch --type=tab && $k @ --to unix:@kt focus-window || $k --listen-on unix:@kt"
```
Replace "/home/martin/.local/kitty.app/bin/kitty" in the command with the actual path to your kitty binary.

Done! Of course you can use any other keyboard shortcut.

## Some disenshittification

using `keyd` the copilot key can be made into regular RCTRL/Menu again:

```shell
# install keyd from copr
sudo dnf copr enable alternateved/keyd
sudo dnf install keyd -y
```
then run `sudo mkdir /etc/keyd && sudo nano /etc/keyd/default.conf`<C/> to create the config directory and the config file. Enter:
```ini
[ids]

*

[main]
f23+leftshift+leftmeta = timeout(rightcontrol, 500, S-f10)
capslock = leftmeta
```
Now run `sudo systemctl enable keyd --now`<C/> once and the service is permanently enabled and running. With single presses or combos the copilot key will act like the regular control key. Pressing it longer will open the context menu.
