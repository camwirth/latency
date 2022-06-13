import argparse
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib

def get_file_name(file):
    split_file = file.split('/')
    file_name = split_file[len(split_file) - 1]
    file_name = file_name.replace('.csv', '')
    return file_name

#read file path from the text file
with open('file_path.txt') as f:
    file_read = f.read()
    csv_files = file_read.split('\n')[1:]

for file in csv_files:
    #find the correct directory for the graphs to be saved in
    if file.find('ESP32') != -1:
        output_file_path = './ESP32/'
        if file.find('python') != -1: 
            output_file_path += 'python/'
        else:
            if file.find('javascript') != -1:
                output_file_path += 'javascript/'
                if file.find('raspberrypi') != -1:
                    output_file_path += 'raspberrypi/'

    else:
        output_file_path = './other/'

    file_name = get_file_name(file)

    df = pd.read_csv(file)

    #create and save histogram
    ax = df.hist(bins=40)
    plt.xlabel("Time (ms)")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.savefig(output_file_path + file_name + '_hist.png', dpi=300, bbox_inches='tight')

    #create and save line graph
    df.plot.line()
    plt.xlabel("Time (ms)")
    plt.ylabel("Frequency")
    plt.tight_layout()
    plt.savefig(output_file_path + file_name + '_line.png', dpi=300, bbox_inches='tight')