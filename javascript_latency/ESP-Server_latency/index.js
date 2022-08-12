latencyDataStr = "";

var serverURL;
var run;
var latencyData = [];
var i = 0;
const myHeaders = new Headers({
    'Content-Type': 'application/jsxon',
})

function stop(latencyData) {
    //find a way to push up a json object to the server
    var options = {
        method: "POST", 
        mode: "no-cors", 
        headers: myHeaders,
        body: JSON.stringify(latencyData)
    }

    pushData().catch(error => {

    })
    async function pushData() {
        await fetch(serverURL, options)
    }
}

function getRunTime() {
    var runTime = form.time.value;
    endTime = Date().getTime() + runTime*1000*60

    getServerLatency(endTime);
}

function getServerLatency(runtime){
    var options = {
        method: "GET",
        cache: "no-cache",
        headers: myHeaders,
        mode: "no-cors",
    }

    getLatency().catch(error => {
        console.log('error')
    })
    async function getLatency() {
        current_time = new Date().getTime();
        timeleft = (runtime - current_time)/(60000)
        if(current_time >= runtime) {
            document.getElementById("timeleft").innerHTML = "done!";
            stop(latencyData);
        }
        else {
            begin = new Date().getTime();
            await fetch(serverURL, options);
            end = new Date().getTime();
            latency = end - begin;
            latencyData[i] = latency;
            document.getElementById("latency").innerHTML=latency;
            document.getElementById("timeleft").innerHTML=timeleft.toFixed(2);

            setTimeout(() => {
                getLatency();
            }, 500)
        }
        i++;
    }
}