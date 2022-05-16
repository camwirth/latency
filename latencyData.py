
import re
import subprocess
import argparse
import pandas as pd
import matplotlib.pyplot as plt

ip_addresses = ['www.google.com', '8.8.8.8', 'netlab.byu.edu']

#from command line determine how much data will be collected
parser = argparse.ArgumentParser()
parser.add_argument('-c', '--count', type=int, default=1, help='how many times each device is pinged')
args = parser.parse_args()
count = args.count

#ping ip address
def get_ping_data(host):
    ping_success = subprocess.call(['ping', '-c', '1', host])
    process = subprocess.Popen(['ping', '-c', str(count), host], stdout=subprocess.PIPE)
    ping_data = str(process.communicate())

    latency_data = []   
    #to do - improve error if the ping does not work 
    #ping_data = re.findall('time=\d+.\d+', ping_data)
    #for i in ping_data:
        #latency_data.append(i.replace('time=', ''))

    
    if ping_success == 0:
        ping_data = re.findall('time=\d+.\d+', ping_data)
        for i in ping_data:
            latency_data.append(i.replace('time=', ''))
    else:
        latency_data = ['ping failed']*count

    return latency_data



#collect data for each of the ip addresses
latency_dict = {}
for host in ip_addresses:
    #create dictionary to create a dataframe
    latency_dict[host] = get_ping_data(host)

#if the ping fails - no data is collected, how can i add that to my data frame? 
latency_df = pd.DataFrame(latency_dict)

print(latency_df)

#plot the histogram for the 
plt.hist(latency_df[ip_addresses[0]])
plt.show()