import tkinter
import argparse
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib
matplotlib.use('TkAgg')

#file path for the netlab data
input_file_path = 'netlab_data/csv_files/'
output_file_path = 'netlab_data/plots/'

with open('./netlab_data/file_names.txt') as file:
    csv_files = file.read()

csv_files = csv_files.split()

for file in csv_files:
    if file.find('.csv') != -1:
        file_name = file.replace('.csv', '')
    else:
        file_name = file
    
    df = pd.read_csv(input_file_path + file)


    #figure out how to save to the correct path and correct file name
    df.hist(bins=40)
    plt.tight_layout()
    plt.savefig(output_file_path + file_name + '_hist.png', dpi=300, bbox_inches='tight')

    df.plot.line()
    plt.tight_layout()
    plt.savefig(output_file_path + file_name + '_line.png', dpi=300, bbox_inches='tight')

