import os
import sys

if os.geteuid() != 0:
  print("this script needs to be run as root")
  sys.exit(1)

# list of disks to check, e.g. ["/dev/sda", "/dev/sdb"]
disks = ["/dev/sda"]
active_disk_count = 0

# if True, the green LED will blink when the disks are idle
blink_on_idle = True

for disk in disks:
  cmd = f"smartctl -i -n standby {disk} | grep -i \"power mode is\""
  stream = os.popen(cmd)
  cmd_output = stream.read().strip().lower()
  if "active" in cmd_output or "idle" in cmd_output:
    active_disk_count += 1

led_cmd = ''

if blink_on_idle:
    if active_disk_count > 0:
        led_cmd = 'wdhwc led --power --steady --blue && wdhwc led --power --blink'
    else:
        led_cmd = 'wdhwc led --power --blink --green && wdhwc led --power --steady'
else:
    if active_disk_count > 0:
        led_cmd = 'wdhwc led --power --steady --blue && wdhwc led --power --blink'
    else:
        led_cmd = 'wdhwc led --power --steady --green && wdhwc led --power --blink'

os.system(led_cmd)