//is there a way to keep this repetative to gather data?
//ideas/goals: iterate through this to gather certain data elements and find the accuracy 

iterations = prompt("how many iterations?", "");
var i = 0;

function checkData(latencyData) {
    latencyData.sort();
    var img = document.createElement('img');
    if(latencyData[0] < 50) {
        document.getElementById("local").innerHTML = "This device is Local";
        img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsUp.png';
        document.getElementById('IMAGE').appendChild(img); 
        return true;
        //document.getElementById('image').createElement('img').src('./thumbsUp.png')
    }
    else {
        document.getElementById("local").innerHTML = "This device is not Local";
        img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsDown.png';
        document.getElementById('IMAGE').appendChild(img); 
        return false;
    }
}

function pingURL() {
    total = [];
    document.getElementById("local").innerHTML = "";
    console.log('start');
    var URLtobepinged = "http://192.168.0.199";
    //var URLtobepinged = "https://dec1-76-27-100-138.ngrok.io/piapp/";
    const myHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    var options = {
        method: "GET",
        cache: "no-cache",
        mode: "no-cors",
        headers: myHeaders
    };
    var count = 0;
    var latencyData = [];

    getPing().catch(error => {
        console.log('error!');
    })

    async function getPing() {
        //if(i <= int(iterations)){
            if(count != 4) {
                begin = new Date().getTime();
                const response = await fetch(URLtobepinged, options);
                end = new Date().getTime();
    
                latency = end - begin;
                latencyData.push(latency);
                
                count++;
    
                setTimeout(() => {
                    getPing();
                }, 500)
            }
            else {
                checkData(latencyData)
                console.log('done !');
                //total.append(checkData(latencyData));
            }
        }
    //}
}

