import re 
import subprocess
import argparse
import pandas as pd

#ip address for Adafruit QT Py ESP32-S2
ip_address = '192.168.0.100'

#add argparse to get desired run time from user
parser = argparse.ArgumentParser()
parser.add_argument('-t', '--time', type=float, default=1, help='for how many hours ping data will be collected')
args = parser.parse_args()
#convert time from hours to seconds (integer value)
final_time = int(args.time*60*60)

'''
function: get_ping_data
summary: collects data from pinging various IP addresses
parameters: IP address
returns: list of latency data in miliseconds 
'''
def get_ping_data(ip_address):
    process = subprocess.Popen(['ping', '-c', str(final_time), ip_address], stdout=subprocess.PIPE)
    ping_data = str(process.communicate())
    latency_data = []
    ping_data = re.findall('time=\d+.\d+', ping_data)
    for i in ping_data:
        latency_data.append(float(i.replace('time=', '')))
    #latency_data.sort()
    return latency_data

#create dataframe of latency_data and write to a csv file 
latency_dict = {}
latency_dict[ip_address] = get_ping_data(ip_address)
latency_df = pd.DataFrame(latency_dict)
latency_df.to_csv('ESP32-S2_latency_data_1.csv', index=False)
