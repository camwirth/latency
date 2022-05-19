import re
import subprocess
import argparse
import pandas as pd

parser = argparse.ArgumentParser()
parser.add_argument('-t', '--time', type=int, default=1, help='how long program should be run (implemented in hours)')
args = parser.parse_args()
time_limit = args.time*60*60

host = '192.168.5.22'

'''
function: get_ping_data
summary: collects data from pinging various IP addresses
parameters: IP address (host)
returns: list of latency data in miliseconds 
'''
def get_ping_data(host):
    #checks if connection is valid
    ping_not_successful = subprocess.call(['ping', '-c', '1', host])

    #ping ip address using command line variable
    process = subprocess.Popen(['ping', '-c', str(time_limit - 1), host], stdout=subprocess.PIPE)
    ping_data = str(process.communicate())


    #parse latency data - fill with error if ping was not successful
    latency_data = []   
    if not ping_not_successful:
        #collect only latency in miliseconds ping data and sort data
        ping_data = re.findall('time=\d+.\d+', ping_data)
        for i in ping_data:
            latency_data.append(float(i.replace('time=', '')))
        latency_data.sort()
    else:
        #print error message in data -- I know I can do this better, how does one throw an error?
        latency_data = ['ping failed']*count

    return latency_data

latency_dict = {}
latency_dict['ESP32-S2'] = get_ping_data(host)
latency_df = pd.DataFrame(latency_dict)
latency_df.to_csv('latencyData_ESP32-S2')
