import tkinter
import argparse
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib
matplotlib.use('TkAgg')


def get_file_name(file):
    split_file = file.split('/')
    file_name = split_file[len(split_file) - 1]
    file_name = file_name.replace('.csv', '')
    return file_name

with open('file_path.txt') as f:
    csv_files = f.read()

csv_files = csv_files.split('\n')

for file in csv_files:
    if file.find('ESP32') != -1:
        output_file_path = './ESP32/'
        if file.find('python') != -1: 
            output_file_path += 'python/'
        else:
            if file.find('javascript') != -1:
                output_file_path += 'javascript/'
    else:
        output_file_path = './other/'

    file_name = get_file_name(file)

    df = pd.read_csv(file)
    df.hist(bins=40)
    plt.tight_layout()
    plt.savefig(output_file_path + file_name + '_hist.png', dpi=300, bbox_inches='tight')

    df.plot.line()
    plt.tight_layout()
    plt.savefig(output_file_path + file_name + '_line.png', dpi=300, bbox_inches='tight')