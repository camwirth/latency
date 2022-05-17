import tkinter
import pandas as pd
from matplotlib import pyplot as plt
import matplotlib
matplotlib.use('TkAgg')

latency_df = pd.read_csv('latencyData.csv')

#plot histagram with data from each IP address seperately 
latency_df.hist(figsize=(20,10))
#plot histogram with data from each IP address together
latency_df.plot.hist(alpha=0.5, figsize=(20,10))
plt.tight_layout()
plt.show()