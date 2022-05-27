//need to improve start, stop, and collecting URL from the user
//need to create an array to store latency data
//store data in a downloadable blob in order to process and store data

function start(){
    run = true;
    pingURL();
}

function stop(){
    run = false;
}

var URL = window.prompt("Write a URL:", "http://google.com");
var run;

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
            document.getElementById("latency").innerHTML = latency
            setTimeout(() => {
                getPing();
            }, 1000)
        }
            
    }
}
