
import re
import subprocess
import argparse
import pandas as pd

#collected different IP addresses from within the NET Lab
ip_addresses = ['192.168.0.160', '192.168.0.138', '192.168.0.106', '192.168.0.161']

#ip_addresses = ['192.168.0.128', '192.168.0.170', '192.168.0.112', '192.168.0.197', '192.168.0.162']

#from command line determine how much data will be collected
parser = argparse.ArgumentParser()
parser.add_argument('-c', '--count', type=int, default=1, help='how many times each device is pinged')
args = parser.parse_args()
count = args.count


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
    process = subprocess.Popen(['ping', '-c', str(count), host], stdout=subprocess.PIPE)
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


'''
function: total_data
summary: creates a dataframe combining latency data from all IP addresses
parameters: list of IP addresses (ip_addresses)
returns: dataframe of all latency data
'''
def total_data(ip_addresses):
    #create a dictionary with data lists from each IP address 
    latency_dict = {}
    for host in ip_addresses:
        latency_dict[host] = get_ping_data(host)
    
    #create a dataframe from dictionary
    latency_df = pd.DataFrame(latency_dict)

    return latency_df


'''
function: __main__
summary: main function to call all other functions and prints data to a csv file
paramters: none
returns: none
'''
def __main__ ():
    latency_df = total_data(ip_addresses)
    latency_df.to_csv('latencyData_ESP32-S2.csv', index=False)


#call main function
__main__()
