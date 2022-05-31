import re 
import subprocess
import argparse
import pandas as pd

file_name = 'ESP32-S2-STA_unsorted(1).csv'
output_file_path = './netlab_data/csv_files/'

#with open('./netlab_data/file_names.txt', 'a') as file:
    #file.write(file_name + '\n')

#ip address for Adafruit QT Py ESP32-S2
ip_address = '192.168.0.100'

#add argparse to get desired run time from user
parser = argparse.ArgumentParser()
parser.add_argument('-t', '--time', type=float, default=1, help='for how many hours ping data will be collected')
parser.add_argument('-f', '--filePath', type=str, help='write path for file data is saved to')
parser.add_argument('-n', '--name', type=str, default=ip_address, help='name for dataframe latency data will be collected into')
args = parser.parse_args()
#convert time from hours to seconds (integer value)
final_time = int(args.time*60*60)
file_name = args.filePath
name = args.name

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
latency_dict[name] = get_ping_data(ip_address)
latency_df = pd.DataFrame(latency_dict)
latency_df.to_csv(file_name, index=False)
