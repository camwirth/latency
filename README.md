programs that record latency using various methods

python_latency directory:
- data: contains latency data collected by using python
- ESP_latency_data: program designed specifically for collecting latency
    data using an ESP32. only collects data for one ip address.
- latencyData.py: first draft of program that collects latency for various
    ip addresses - collects data for various ip addresses.

javascript_latency directory:
- data: contains latency data collected by using javascript and html
- index.html: html program that creates website through which to ping
- index.js: javascript program that works with html program to send a request
    and record time to get a response. Downloads data when time is completed 
    or when stop is pressed.

graphs directory:
- ESP32: collection of graphs presenting latency measurements of the ESP32
- other: collection of graphs presenting latency data of other ip addresses
- file_path.txt: text document to record paths to data files which are to be
    graphed using graph_latencies.py
- graph_latenices: takes csv files written in file_path.txt and graphs data in
    the files
 
ESP32_WiFi
- ESP32_AP-STA: arduino.io files to create a WiFi AccessPoint and to connect
    ESP32 to local WiFi
- ESP32_Server: arduino.io file to create WiFi Access Point, create a server 
    hosted by ESP32, and allow cross-origin requests


Notes on creating raspberrypi bridge and recording latency:
