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

    #retrun accuracy 
    if LOCAL is True:
        #if local return percentage of local responses
        return local/len(response)
    else:
        #if remote return precentage of remote responses
        return remote/len(response)

#runs the tests and analyzes data 
def run(file_path, local, threshold):

    #create empty lists for data
    min_response = []
    avg_response = []
    median_response = []
    sample_data = []
    data_list = []
    done = True

    #create list of data from csv file
    df = pd.read_csv(file_path)
    data = df.values.tolist()
    for i in data:
        data_list.append(i[0])

    #if local data calcualte the threshold 
    if local:
        threshold = statistics.mean(data_list) + statistics.pstdev(data_list) * stdev_num
        done = False

    #run through data and test groups size of user input
    for i in range(len(data_list)):
        sample_data.append(data_list[i])
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
    print("Average latency: " + str(statistics.mean(data_list)))
    print("Median latency: " + str(statistics.median(data_list)))
    print("Standard deviation: " + str(statistics.pstdev(data_list)))
    print("Threshold: " + str(threshold))
    print("Minimum latency is: " + str(min(data_list)))
    print("Maximum latency is: " + str(max(data_list)))
    print("\n-ACCURACY OF CHECK-")
    print("Accuracy using min method: " + str(min_accuracy*100) + "%")
    print("Accuracy using avg method: " + str(avg_accuracy*100) + "%")
    print("Accuracy using median method: " + str(median_accuracy*100) + "%\n")

    #run the remote data files
    if not done:
        print("\n---NGROK---")
        run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_bridge_netlab_2hrs.csv', False, threshold)
        print("\n---VPN---")
        run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_VPN_netlab-home.csv', False, threshold)
        print("\n---PORT FORWARD---")
        run('~/latency/javascript_latency/data/raspberrypi/ESP32_rp_portForward_netlab-home.csv', False, threshold)
        print("\n")

#begin program by running local data file
print("The threshold is set " + str(stdev_num) + " standard deviation(s) away from the mean")
print("\n---LOCAL---")
run('~/latency/javascript_latency/data/ESP32_AP_connection.csv', True, 0)