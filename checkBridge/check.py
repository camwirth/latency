import statistics
import pandas as pd
import argparse
#check using min method
#check using avg method
#check using modified avg method

parser = argparse.ArgumentParser()
parser.add_argument('-s', '--stdev', type=int, default=1, help='number of standard deviations threshold is set to')
args = parser.parse_args()

stdev_num = args.stdev
STDEV = 0

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

def run(file_path, local, local_stdev):
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
        local_stdev = statistics.pstdev(data_list)
        done = False
    
    threshold = local_stdev * stdev_num

    print("the average latency accross all data is " + str(statistics.mean(data_list)))
    print("the standard deviation is: " + str(statistics.pstdev(data_list)))
    print("the threshold is: " + str(threshold))
    print("the minimum latency is: " + str(min(data_list)))
    print("the maximum latency is: " + str(max(data_list)))

    for i in range(len(data_list)):
        sample_data.append(data_list[i])
        if i % 5 == 0:
            j += 1
            min_response.append(min_method(sample_data, threshold))
            avg_response.append(avg_method(sample_data, threshold))
            sample_data = []

    min_accuracy = find_accuracy(min_response, local)
    avg_accuracy = find_accuracy(avg_response, local)

    print("Using the min method the accuracy is: " + str(min_accuracy*100) + "%")
    print("Using the avg method the accuracy is: " + str(avg_accuracy*100) + "%")

    if not done:
        print("\nNGROK")
        run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_bridge_netlab_2hrs.csv', False, local_stdev)
        print("\nVPN")
        run('/home/camillewirthlin/latency/javascript_latency/data/raspberrypi/ESP32_rp_VPN_netlab-home.csv', False, local_stdev)
        print("\nPORT FORWARD")
        run('/home/camillewirthlin/latency/javascript_latency/data/raspberrypi/ESP32_rp_portForward_netlab-home.csv', False, local_stdev)

print("\nLOCAL")
run('~/latency/javascript_latency/data/ESP32_AP_connection.csv', True, 0)