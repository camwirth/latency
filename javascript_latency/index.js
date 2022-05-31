latencyDataStr = "";
begin_time = new Date().getSeconds();
//runseconds = $("#time").val();
//console.log(runseconds)
//var runlength = begin_time + runseconds;
//console.log(runlength)

function start(){
    run = true;
    pingURL();
    latencyData = [];
}

function stop(){
    run = false;
    document.getElementById("latencyData").innerHTML = latencyData;
    fileDownload();
}

function fileDownload(){
    for(i=0; i<latencyData.length; i++){
        line = String(latencyData[i]) + ", \n";
        latencyDataStr += line;
    }
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([latencyDataStr], {type: "text/csv"}));
    a.download = "js_latencyData.csv";
    a.click();
}

var URLtobepinged = "http://192.168.0.100/"
var run;
var latencyData = [];
var i = 0;

const myHeaders = new Headers({
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': '*'
})
function pingURL(){
    //current_time = new Date().getSeconds();
    //console.log(current_time);
    //if(current_time >= runlength)
    //{
        //stop();
    
    //figure out how to locate an input
    document.getElementById("URL")
    //need to update and improve my options 
    var options = {
        method: "GET",
        cache: "no-cache",
        mode: "no-cors",
        headers: myHeaders
    }
    getPing().catch(error => {
        console.log('error!');
        document.getElementById("latency").innerHTML = latency
    })
   
    async function getPing(){
        if(run == true){
            start = new Date().getTime();
            const response = await fetch(URLtobepinged)
            end = new Date().getTime();
            latency = end - start;
            latencyData[i] = latency;
            document.getElementById("latency").innerHTML = latency
            setTimeout(() => {
                getPing();
            }, 1000)
        }
        i++;
    }
}
