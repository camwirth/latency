import re
import subprocess
import argparse
import pandas as pd
import time 


parser = argparse.ArgumentParser()
parser.add_argument('-t', '--time', type=float, default=24, help='how long program should be run (implemented in hours)')
args = parser.parse_args()

time_limit = int(args.time*60*60)
current_time = 0

host = '192.168.0.100'
done = False

ofile = open('latencyData_ESP32-S23.csv', 'a+')

def getdata():
    ping_data = subprocess.Popen(['ping', '-c', '1', host], stdout=subprocess.PIPE)
    ping_data = str(ping_data.communicate())
    time_idx = ping_data.find("time=")
    ms_parsing = ping_data[time_idx + 5:]
    time_idx = ms_parsing.find(' ')
    latency_data = ms_parsing[:time_idx]
    return latency_data

while done is False:
    if current_time == time_limit:
        done = True

    ofile.write(getdata() + '\n')
    time.sleep(1)

    current_time += 1

ofile.close()

