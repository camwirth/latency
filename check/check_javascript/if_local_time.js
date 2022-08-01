
var threshold = 22;
var URLtobepinged = "http://76.27.100.138/piapp/";
const myHeaders = new Headers({
    'Content-Type': 'application/json'
});
var options = {
    method: 'GET',
    cache: 'no-cache',
    mode: 'cors',
    headers: myHeaders
}

function stop(LOCAL) {
    if(LOCAL) {
        document.getElementById('local').innerHTML = 'This device is Local';
    } else {
        document.getElementById('local').innerHTML = 'This device is not Local';
    }
    console.log('done!')
}

function run() {
    start = new Date().getTime()
    endTime = start + 10000
    document.getElementById('local').innerHTML = '';

    check_local(threshold + 1, endTime)
}

function check_local(latency, endTime) {
    begin = new Date().getTime()
    if(latency <= threshold) {
        stop(true)
    } else if (begin >= endTime) {
        stop(false)
    } else {
        getPing().catch(error => {
            setTimeout(() => {
                end = new Date().getTime()
                latency = end - begin
                console.log(latency)
                check_local(latency, endTime)
            }, 500)
        })
        async function getPing() {
            console.log('started')
            console.log('fetching')
            await fetch(URLtobepinged, options);
        }
    }
}