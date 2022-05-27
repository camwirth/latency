//need to improve start, stop, and collecting URL from the user
//need to create an array to store latency data
//store data in a downloadable blob

function start(){
    run = true;
    pingURL();
    latencyData = [];
}

function stop(){
    run = false;
    document.getElementById("latencyData").innerHTML = latencyData;
}

var URL = "http://192.168.0.100/"
var run;
var latencyData = [];
var i = 0;

const myHeaders = new Headers({
    'Content-Type': 'application/json',
    //'Access-Control-Allow-Origin': '*'
})
function pingURL(){
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
            const response = await fetch(URL)
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
