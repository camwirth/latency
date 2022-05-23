import tkinter
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib
matplotlib.use('TkAgg')

csv_files = ['desktop_latencies.csv', 'raspberypi_latencies.csv', 'shellyrgbw2_latencies.csv', 'latencyData_ESP32-S2.csv', 'ESP32-S2-AP_latencies.csv']

for file in csv_files:
    file_name = file.replace('.csv', '')
    latency_df = pd.read_csv(file)
    latency_df.hist(bins=40, figsize=(20,10))
    plt.tight_layout()
    plt.savefig(file_name + '_separate.png', dpi=300, bbox_inches='tight')
    latency_df.plot.hist(alpha=0.5, figsize=(20,10))
    plt.tight_layout()
    plt.savefig(file_name + '_combined.png', dpi=300, bbox_inches='tight')
