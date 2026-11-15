---
layout: doc
date: 2024-06-27
title: setting up a fresh hdd with ext4 in linux
description: a public note to myself on how to set up a new hard drive with ext4 in linux
tags:
  - linux
  - ext4
  - nas
  - storage
---

<Title/>

> Only run these commands if you know what you're doing. Working with partitions may lead to total data loss

Fresh ext4 partitions have 2 issues: 
- 5% reserved space for root that is not needed on large drives: 5% of a 20TB is 1TB wasted.
- days or weeks of waiting for the drive to complete the `ext4lazyinit` process, which is a waste of electricity and time.

Here's the steps to set up and mount a new hard drive with ext4 in linux:

1. find the drive you want to format: 
```shell
lsblk -o NAME,MOUNTPOINT,SIZE,MODEL | grep -E '^\w+' | grep -v '/$' | grep -v '^loop'
```
In the output, look for the drive that has no mountpoint and the size and name you expect.

2. Create the partition, replace /dev/sdX with the correct drive
```shell
sudo mkfs.ext4 -m 0 -E lazy_itable_init=0,lazy_journal_init=0 /dev/sdX
```

3. Create a mount point
```shell
sudo mkdir /media/YOURMOUNTPOINTNAME
```

4. find the UUID of the drive, copy the UUID of the drive you just formatted (e.g. sdX)
```shell
ls -lha /dev/disk/by-uuid
```

5. Open the fstab file `sudo nano /etc/fstab`<C/>, then add the following line to the end of the file:
```shell
/dev/disk/by-uuid/UUID /media/YOURMOUNTPOINTNAME ext4 defaults,nofail 0 2
```

6. Mount the drive
```shell
sudo mount -a
```

That's it! You now have a fresh ext4 partition with no wasted space and no waiting for the `ext4lazyinit` process to complete. Enjoy.

## Exisiting partitions

If you missed to force the `lazy_itable_init=0,lazy_journal_init=0` options during the `mkfs.ext4` command, you can still force the lazy init process to complete by running the following commands:

1. unmount the drive
```shell
sudo umount /dev/sdXXX
```

2. force the lazy init process to complete
```shell
sudo mount -o init_itable=0 /dev/sdXXX /media/YOURMOUNTPOINTNAME
```

3. Alternative
If the above command does nothing, this worked for me in another situation ([via](https://www.reddit.com/r/archlinux/comments/11dyl6t/comment/jacd2s0/)):
```shell
tune2fs -m 0 /dev/sdXXX
```

The command might take a couple of minutes to complete, but it will finish the lazy init process immediately. Then your drive will behave as expected. [via](https://askubuntu.com/questions/1379965/how-to-get-a-newly-created-ext4-filesystem-to-finish-writing-the-index-node-imme)

I've probably stumbled across [this post](https://fedetft.wordpress.com/2022/01/23/on-ext4-and-forcing-the-completion-of-lazy-initialization/) 20 times so I include it here for reference.

<Comment />
