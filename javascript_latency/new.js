//create variables 
var done;                                       //if program has run through desired time
latencyDataStr = "";                            //string to parse data into a csv file

//get time to run the program from the user
timetorun = prompt("Enter the time (in minutes) you would like to ping", "")

/**Function title: start
 * inputs/outputs: none
 * Summary: this function gets start time of program running, and begins to ping
 * the URL
 */
function start(){
    var latencyData = [];   //clear latencyData
    run = true;
    //get time to run program
    begin_time = new Date().getTime();
    runtime = timetorun*60*1000 + begin_time;   //convert timetorun to ms

    pingURL();
}

/**Function title: stop
 * inputs/outputs: none
 * Summary: stops pinging URL and resets program
 */
function stop(){
    run = false;
    if(done)
    {
        fileDownload();
    }
    else
    {   //reset and prompt for time again
        timetorun = prompt("Enter the time (in minutes) you would like to ping", "");
    }
}



/**Function title: fileDownload
 * inputs/outputs: none
 * Summary: converts latencyData array to a downloaded csv file
 */
function fileDownload(){
    //create string separated with commas and new lines
    for(i=0; i<latencyData.length; i++){
        line = String(latencyData[i]) + ", \n";
        latencyDataStr += line;
    }
    //create blob and download into a file
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([latencyDataStr], {type: "text/csv"}));
    a.download = "js_latencyData.csv";
    a.click();
}
var URLtobepinged = "http://192.168.0.100/"     //ip address for ESP32-S2
var run;                                        //tells program when to start/stop
var i = 0; 
var latencyData = [];

const myHeaders = new Headers({                 //headers for fetch command
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': '*'
})

/**Function title: pingURL
 * inputs/outputs: none 
 * Summary: creates getPing function and catches error
 */
function pingURL(){

    //set options for fetch command
    var options = {
        method: "GET",
        cache: "no-cache",
        mode: "no-cors",
        headers: myHeaders
    }

    //catch error from the fetch command
    getPing().catch(error => {
        console.log('error!');
        document.getElementById("latency").innerHTML = latency
    })

    /**Function title: getPing
     * inputs/outputs: none 
     * Summary: sends a GET request to given url for a given ammount of time or until
     * program is rest/stopped
     */
    async function getPing(){
        //check if runtime has completed
        current_time = new Date().getTime();
        timeleft = (runtime - current_time)/(1000*60)
        if(run==true){
            if(current_time >= runtime){
                //program ran the entire given time
                done = true;
                stop();
                document.getElementById("timeleft").innerHTML = "done!";
            }
            else{
                //program is not completed
                done = false;
            
                //collect begin time before sending GET request
                begin = new Date().getTime();
                //send GET request
                const response = await fetch(URLtobepinged, options)
                //collect end time after GET request has been completed
                end = new Date().getTime();

                //save latency data and update time left
                latency = end - begin;
                latencyData[i] = latency;
                document.getElementById("latency").innerHTML = latency;
                document.getElementById("timeleft").innerHTML = timeleft.toFixed(2);

                //wait 1 s and recursively run through getPing 
                setTimeout(() => {
                    getPing();
                }, 1000)
            }
            i++;
        }
    }
}
