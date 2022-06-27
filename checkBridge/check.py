import statistics
import pandas as pd
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--stdev', type=int, default=1, help='number of standard deviations threshold is set to')
parser.add_argument('--size', type=int, default=5, help='size of the data set to analyze')
args = parser.parse_args()

stdev_num = args.stdev
size = args.size

def min_method(data, threshold):
    if min(data) < threshold:
        return True
    else:
        return False

def avg_method(data, threshold):
    avg = statistics.mean(data)
    if avg < threshold:
        return True
    else:
        return False



def find_accuracy(response, LOCAL):
    local = 0
    remote = 0
    for i in response:
        if i == True:
            local += 1
        else:
                remote += 1
    if LOCAL is True:
        return local/len(response)
    else:
        return remote/len(response)

def run(file_path, local, threshold):
    min_response = []
    avg_response = []
    sample_data = []
    data_list = []
    j = 0
    done = True

    df = pd.read_csv(file_path)
    data = df.values.tolist()
    for i in data:
        data_list.append(i[0])

    if local:
        threshold = statistics.mean(data_list) + statistics.pstdev(data_list) * stdev_num
        done = False

    for i in range(len(data_list)):
        sample_data.append(data_list[i])
        if i % size == 0:
            j += 1
            min_response.append(min_method(sample_data, threshold))
            avg_response.append(avg_method(sample_data, threshold))
            sample_data = []

    min_accuracy = find_accuracy(min_response, local)
    avg_accuracy = find_accuracy(avg_response, local)

    
    print("the average latency accross all data is " + str(statistics.mean(data_list)))
    print("the standard deviation is: " + str(statistics.pstdev(data_list)))
    print("the threshold is: " + str(threshold))
    print("the minimum latency is: " + str(min(data_list)))
    print("the maximum latency is: " + str(max(data_list)))
    print("Using the min method the accuracy is: " + str(min_accuracy*100) + "%")
    print("Using the avg method the accuracy is: " + str(avg_accuracy*100) + "%")

    if not done:
        print("\nNGROK")
        run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_bridge_netlab_2hrs.csv', False, threshold)
        print("\nVPN")
        run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_VPN_netlab-home.csv', False, threshold)
        print("\nPORT FORWARD")
        run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_portForward_netlab-home.csv', False, threshold)
        print("\n")

print("\nLOCAL")
run('~/latency/javascript_latency/data/ESP32_AP_connection.csv', True, 0)