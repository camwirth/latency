//use two methods to check if device is local

var threshhold = 22;
var URLtobepinged = "";
const myHeaders = new Headers({
    'Content-Type': 'application/json'
});
var options = {
    method: "GET",
    cache: "no-cache",
    mode: "no-cors",
    headers: myHeaders
};

//uses time method to check if device is local 
function time_method() {
    //reset webpage images
    document.getElementById("local").innerHTML = "";
    document.getElementById("IMAGE").innerHTML = "";

    //get start time and calculate end time 
    start = new Date.getTime();
    endTime = start + 6000; //program will check latency for 6 seconds
    LOCAL = false;

    getPing().catch(error => {
        console.log('error!');
    })

    async function getPing() {
        if(Date().Time() < endTime)
        {
            begin = new Date().getTime();
            const response = await fetch(URLtobepinged, options);
            end = new Date().getTime();

            latency = end - begin;

            //check if latency measurement is local 
            if(latency < threshold) {
                LOCAL = true;
            } else {
                setTimeout(() => {
                    getPing();
                }, 500)
            }
        }
    }

    //show result
    var img = document.createElement('img');
    if(LOCAL) {
        document.getElementById("local").innerHTML = "This device is Local";
        img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsUp.png';
        document.getElementById('IMAGE').appendChild(img); 
        return true;
    } else {
        document.getElementById("local").innerHTML = "This device is not Local";
        img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsDown.png';
        document.getElementById('IMAGE').appendChild(img); 
        return false;
    }
}

function count_method() {
    //reset webpage images
    document.getElementById("local").innerHTML = "";
    document.getElementById("IMAGE").innerHTML = "";
    var count = 0;
    var latencyData = [];

    getPing().catch(error => {
        console.log('error!');
    })

    async function getPing() {
        if(count != 5) {    //continue until count is equal to 5
            begin = new Date().getTime();
            const response = await fetch(URLtobepinged, options);
            end = new Date().getTime();

            latency = end - begin;
            //add latency to latency data list
            latencyData.push(latency);
            
            count++;

            setTimeout(() => {
                getPing();
            }, 500)
        }
        else {  //once finished check the latency data list
            checkData(latencyData)
        }
    }
}

function checkData(latencyData) {
    latencyData.sort();
    var img = document.createElement('img');
    //check that smalles latency is smaller than the threshold and write outcome
    if(latencyData[0] < threshold) {
        document.getElementById("local").innerHTML = "This device is Local";
        img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsUp.png';
        document.getElementById('IMAGE').appendChild(img); 
        return true;
    }
    else {
        document.getElementById("local").innerHTML = "This device is not Local";
        img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsDown.png';
        document.getElementById('IMAGE').appendChild(img); 
        return false;
    }
}