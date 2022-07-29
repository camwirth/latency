
var save;
latencyDataStr = "";

var URLtobepinged = "http://76.27.100.138/piapp/";
var run;
var latencyData = [];
var i = 0;

const myHeaders = new Headers({
    'Content-Type': 'application/json',
})

//get time to run the program from the user
timetorun = prompt("Enter the time (in minutes) you would like to ping", "")

//get start time of program running - begin to ping
function start(){
    run = true;
    //get time to run program
    begin_time = new Date().getTime();
    runtime = timetorun*60*1000 + begin_time;
    latencyData.setlength = 0;
    i = 0;
    pingURL();

}

//reset latency data and time
function reset(){
    latencyData = [];
    run = false;
    save = false;
    timetorun = prompt("Enter the time (in minutes) you would like to ping", "");
}

//stop program and download data
function stop(){
    run = false;
    document.getElementById('timeleft').innerHTML = 'done!'
    fileDownload()
    save = true;
}

//converts latencyData array to a downloaded csv file
function fileDownload(){
    //get a label for the df to describe the data
    graph_label = prompt("Enter the label for the data", "");
    latencyDataStr = graph_label + ", \n";
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

function run_again() {
    if (error) {
        setTimeout(() => {
            pingURL();
        }, 500)
    }
}

//sends GET request and records latency time
function pingURL(){

    //set options for fetch command
    var options = {
        method: "GET",
        cache: "no-cache",
        mode: "cors",
        headers: myHeaders
    }
    error = false

    //catch error from the fetch command
    getPing().catch(error => {
        setTimeout(() => {
            pingURL()
        }, 500)
        // pingURL()
        end = new Date().getTime()
        console.log('error!');
        error = true
        latency = end - begin
        document.getElementById("latency").innerHTML = latency
        document.getElementById('timeleft').innerHTML = timeleft.toFixed(2);
        latencyData[i] = latency
        i++ 
    })

    //send GET request to given url for given time or until program is reset/stopped
    async function getPing(){
        console.log('request made')
        //check if runtime has completed
        current_time = new Date().getTime();
        timeleft = (runtime - current_time)/(1000*60)
        if(run==true){
            if(current_time >= runtime){
                //program ran the entire given time
                stop();
                //fileDownload(latencyData);
                document.getElementById("timeleft").innerHTML = "done!";
            }
            else{
                //program is not completed
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
                }, 500)
            }
            i++;
        }
        else if (save){
            fileDownload(latencyData);
        }
    }



    if (error) {
        setTimeout(() => {
            getPing();
        }, 500)
    }

}
