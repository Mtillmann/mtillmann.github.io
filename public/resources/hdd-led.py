import os
import sys
import argparse
from datetime import datetime

parser = argparse.ArgumentParser()
parser.add_argument('mode', help='power, usb or reset')
parser.add_argument('-d','--disk',  action="append", help='disk')
parser.add_argument('-b', '--blink', action='store_true', help='blink on idle - only for mode = power')
parser.add_argument('-p','--probemode', default='h', help='h=hdparm,s=smartctl')
parser.add_argument('--debug', action='store_true', help='print some debug info')

args = parser.parse_args()
disks = args.disk

def debug(line):
  if args.debug:
    print(f"{datetime.now()} - {line}")

for key, value in vars(args).items():
  debug(f"{key}: {value}")

if args.mode != "reset" and len(disks) == 0:
  print("no disks specified")
  sys.exit(1)

if os.geteuid() != 0:
  print("this script needs to be run as root")
  sys.exit(1)

if args.mode == "reset":
  debug("resetting leds")
  cmd = "wdhwc led --power --steady --blue && wdhwc led --power --blink && wdhwc led --usb --steady && wdhwc led --usb --blink"
  debug(f"issuing command: {cmd}")
  os.system(cmd)
  print("LEDs reset")
  sys.exit(0)

active_disk_count = 0

for disk in disks:
  if args.probemode == 'h':
    cmd = f"hdparm -C {disk}"
  else:
    cmd = f"smartctl -i -n standby {disk} | grep -i \"power mode is\""

  debug(f"checking {disk} using command: {cmd}")

  stream = os.popen(cmd)
  cmd_output = stream.read().strip().lower()
  if "active" in cmd_output or "idle" in cmd_output:
    debug(f"{disk} appears to be awake")
    active_disk_count += 1
  else:
    debug(f"{disk} is sleeping")

led_cmd = ''
if args.mode == "power":
  if args.blink:
    if active_disk_count > 0:
      led_cmd = f'wdhwc led --power --steady --blue && wdhwc led --power --blink'
    else:
      led_cmd = f'wdhwc led --power --blink --green && wdhwc led --power --steady'
  else:
    if active_disk_count > 0:
      led_cmd = f'wdhwc led --power --steady --blue && wdhwc led --power --blink'
    else:
      led_cmd = f'wdhwc led --power --steady --green && wdhwc led --power --blink'
else:
  if active_disk_count > 0:
    led_cmd = "wdhwc led --usb --steady"
  else:
    led_cmd = "wdhwc led --usb --steady --blue"

debug(f"{active_disk_count} disks active")
debug(f"issuing command: {led_cmd}")

os.system(led_cmd)
