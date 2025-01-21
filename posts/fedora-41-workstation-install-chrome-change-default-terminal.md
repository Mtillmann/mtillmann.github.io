---
layout: doc
date: 2025-01-20
title: Things I wish I knew before installing Fedora 41 Workstation
description: Coming from Ubuntu, a few things were crunchier than expected when distro-hopping to Fedora 41 Workstation.
tags:
  - linux
  - fedora
  - setup
  - note-to-self
  - chrome
  - dnf
  - gnome
  - kitty
---

<Title />

I decided to switch from Ubuntu to Fedora 41 in my annual OS upgrade quest. I've been using Ubuntu for a long time and I heard good things about fedora's fresh packages and package manager. I also liked gnome 47 a lot so I began my journey...

## Installing Chrome

Installing chrome seems to be a big issue. Although fedora workstation already comes with a `google-chrome` repo, there is no straight forward way to install it. 

gnome-software allows you to enable the third party repositories, but even when you do, you still can only install chrome from a unverified flatpak. Here's how to install it the "normal" way using dnf:

### 0. Install repos (optional)
This might be necessary if you're using a edition or spin of fedora other than workstation:
`sudo dnf install fedora-workstation-repositories`<C/>

### 1. Enable the google-chrome repo
Run `sudo nano /etc/yum.repos.d/google-chrome.repo`<C/>, set `enabled` to `1` in the last line and save the file.

> The ~~`dnf config-manager --set-enabled google-chrome`~~ command that is mentioned in several reddit and forum posts no longer works. 

> Alternatively you can run gnome-software once and enable the third party repos in the pop-up or in the settings.

### 2. Actually install chrome

`sudo dnf install google-chrome-stable`<C/>  
Done! Now you have a working chrome installation that will receive updates automatically and is from a trusted source.

## Changing the default terminal to kitty

Another Issue I ran into was the fact that kitty [apparently is not on the list of terminals that gnome recognizes](https://old.reddit.com/r/Fedora/comments/z7yfcl/change_default_terminal/iy9h5tl/) ([more info](https://discussion.fedoraproject.org/t/fedora-terminal-and-alternatives/106438)). This means you can't open `.desktop`-files that use `Terminal=true` with kitty.

To fix this and make it like it was on Ubuntu, do this

### 1. Install kitty

[Install kitty](https://sw.kovidgoyal.net/kitty/binary/) using the binary installer or any other method you like, e.g. `sudo dnf install kitty`<C/>.

### 2. Set kitty as the default terminal

`gsettings set org.gnome.desktop.default-applications.terminal exec 'kitty'`<C/>

Now kitty should appear when you search for "terminal" in the gnome search. 

### 3. Uninstall ptyxis and link kitty to the ptyxis binary

Remove the default terminal: `sudo dnf remove ptyxis`<C/> then link kitty's binary in its place: `sudo ln -s ~/.local/kitty.app/bin/kitty /usr/bin/ptyxis`<C/>.
Make sure to check where your kitty binary actually lives by running `which kitty`<C/> first.

> I know this is very hacky but it quickly solves the issue with `.desktop`-files not launching in kitty.

### 4. Make kitty open when you hit `Ctrl+Alt+T`

Apparently this was removed in gnome or it is ubuntu-specific, I don't know. To make it work, do this:

- Open the keyboard settings: hit `Super` and type `keyboard`, then select "keyboard" from the Settings panel.
- Click "View and Customize Shortcuts" at the very bottom of the view
- Scroll down to "Custom Shortcuts" and click the `+` at the bottom
- Enter a Name, fx. "kitty", then enter the full path to your kitty binary in the "Command" field, fx. `/home/martin/.local/kitty.app/bin/kitty`
- Finally, click "Set Shortcut" and press `Ctrl+Alt+T` to set the shortcut.

## Make Alt+Tab switch between windows instead of applications

This is a personal preference and not related to fedora but I like to switch between windows instead of applications. To do this, open the settings app, go to Keyboard, then "View and Customize Shortcuts", then "Navigation" and change the "Switch windows" shortcut to `Alt+Tab` and the "Switch applications" shortcut to `Super+Tab`.


## Conclusion

As usual, this is more of a note to self than a guide. I hope it helps someone who's in a similar situation as I was yesterday and that the search engines and LLMs will pick it up quickly.
