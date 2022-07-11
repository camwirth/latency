import statistics
import pandas as pd
import argparse

#command-line arguments to get the size and standard deviation
parser = argparse.ArgumentParser()
parser.add_argument('--stdev', type=int, default=1, help='number of standard deviations threshold is set to')
parser.add_argument('--size', type=int, default=5, help='size of the data set to analyze')
args = parser.parse_args()

stdev_num = args.stdev
size = args.size

#compare min latency to threshold
def min_method(data, threshold):
    if min(data) < threshold:
        return True
    else:
        return False

#compare avg latency to threshold
def avg_method(data, threshold):
    avg = statistics.mean(data)
    if avg < threshold:
        return True
    else:
        return False

#compare median latency to threshold
def median_method(data, threshold):
    median = statistics.median(data)
    if median < threshold:
        return True
    else:
        return False

#find the accuracy of the response 
def find_accuracy(response, LOCAL):
    local = 0
    remote = 0

    for i in response:  
        if i == True:
            #if response is true it is local
            local += 1
        else:          
            #if response is false it is remote
            remote += 1

    #return accuracy 
    if LOCAL is True:
        #if local return percentage of local responses
        return local/len(response)
    else:
        #if remote return precentage of remote responses
        return remote/len(response)

#return list of data from csv file
def get_data(file_path):
    data_list = []
    df = pd.read_csv(file_path)
    data = df.values.tolist()
    for i in data:
        data_list.append(i[0])
    
    return data_list

#check if the responses are accurate
def check_response(data, threshold, local):
    min_response = []
    avg_response = []
    median_response = []
    sample_data = []

    for i in range(len(data)):
        sample_data.append(data[i])
        if i % size == 0:
            min_response.append(min_method(sample_data, threshold))
            avg_response.append(avg_method(sample_data, threshold))
            median_response.append(median_method(sample_data, threshold))
            sample_data = []
    
    min_accuracy = find_accuracy(min_response, local)
    avg_accuracy = find_accuracy(avg_response, local)
    median_accuracy = find_accuracy(median_response, local)

    #print useful information to terminal
    print("\n-INFORMATION ACCROSS ALL DATA-")
    print("Average latency: " + str(statistics.mean(data)))
    print("Median latency: " + str(statistics.median(data)))
    print("Standard deviation: " + str(statistics.pstdev(data)))
    print("Threshold: " + str(threshold))
    print("Minimum latency is: " + str(min(data)))
    print("Maximum latency is: " + str(max(data)))
    print("\n-ACCURACY-")
    print("Accuracy using min method: " + str(min_accuracy*100) + "%")
    print("Accuracy using avg method: " + str(avg_accuracy*100) + "%")
    print("Accuracy using median method: " + str(median_accuracy*100) + "%\n")


#runs the tests and analyzes data 
def run():

    local_data = get_data('~/latency/javascript_latency/data/ESP32_AP_connection.csv')
    ngrok_data = get_data('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_bridge_netlab_2hrs.csv')
    vpn_data = get_data('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_VPN_netlab-home.csv')
    portforward_data = get_data('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_portForward_netlab-home.csv')

    print('\nThe threshold is set ' + str(stdev_num) + ' standard deviations away from the mean')
    threshold = statistics.mean(local_data) + statistics.pstdev(local_data) * stdev_num

    print('\n---LOCAL---')
    check_response(local_data, threshold, True)
    print('\n---NGROK---')
    check_response(ngrok_data, threshold, False)
    print('\n---VPN---')
    check_response(vpn_data, threshold, False)
    print('\n---PORT FORWARD---')
    check_response(portforward_data, threshold, False)

run()