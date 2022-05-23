import tkinter
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib
matplotlib.use('TkAgg')

f = open('latencyData_ESP32-S2.csv','r')
data = f.read()
data = data.split()
latency_data = []

for x in data: 
    if (x != 'ING'):
        latency_data.append(float(x))

latency_data.sort()
latency_dict = {}
latency_dict['ESP32-S2'] = latency_data
latency_ESP_df = pd.DataFrame(latency_dict)

latency_ESP_df.hist(bins=20, figsize=(20,10))
plt.tight_layout()
plt.savefig('ESP32-S2' + '_separate.png', dpi=300, bbox_inches='tight')
latency_ESP_df.plot.hist(alpha=0.5, figsize=(20,10))
plt.tight_layout()
plt.savefig('ESP32-S2'+ '_combined.png', dpi=300, bbox_inches='tight')

f.close()

latency_ESP_df.to_csv('latencyData_ESP32-S2.csv', index=False)