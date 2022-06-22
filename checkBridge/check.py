import statistics
import pandas as pd
from numpy import true_divide
#check using min method
#check using avg method
#check using modified avg method

def min(data):
    data.sort()
    if data[0] < 50:
        return True
    else:
        return False

def avg(data):
    avg = statistics.mean(data)
    if avg < 50:
        return True
    else:
        return False

def find_accuracy(response, LOCAL):
    local = 0
    bridge = 0
    for i in response:
        if i == True:
            local += 1
        else:
                bridge += 1
    if LOCAL is True:
        return local/len(response)
    else:
        return bridge/len(response)

def run(file_path, local):
    min_response = []
    avg_response = []
    sample_data = []
    data_list = []
    j = 0

    if local == True:
        LOCAL = True
        print("LOCAL")
    else:
        LOCAL = False
        print("BRIDGE")

    df = pd.read_csv(file_path)
    data = df.values.tolist()
    for i in data:
        data_list.append(i[0])

    print("the average latency accross all data is " + str(statistics.mean(data_list)))
    for i in range(len(data_list)):
        sample_data.append(data_list[i])
        if i % 5 == 0:
            j += 1
            min_response.append(min(sample_data))
            avg_response.append(avg(sample_data))
            sample_data = []

    min_accuracy = find_accuracy(min_response, LOCAL)
    avg_accuracy = find_accuracy(avg_response, LOCAL)
    print("Using the min method the accuracy is: " + str(min_accuracy))
    print("Using the avg method the accuracy is: " + str(avg_accuracy))

run('~/latency/javascript_latency/data/ESP32_AP_connection.csv', True)
print('\n')
run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_bridge_netlab_2hrs.csv', False)