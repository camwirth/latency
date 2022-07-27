
var threshold = 22;
var URLtobepinged = "http://76.27.100.138/piapp/";
const myHeaders = new Headers({
    'Content-Type': 'application/json'
});
var options = {
    method: 'GET',
    cache: 'no-cache',
    mode: 'no-cors',
    headers: myHeaders
}

function load_image(LOCAL) {
    if(LOCAL) {
        document.getElementById('local').innerHTML = 'This device is Local';
    } else {
        document.getElementById('local').innerHTML = 'This device is not Local';
    }
}

function check_local() {
    document.getElementById('local').innerHTML = '';

    start = new Date().getTime();
    endTime = start + 10000;
    LOCAL = false;

    getPing().catch(error => {
        console.log('error!');
    })

    async function getPing() {
        now = new Date().getTime();

        if(now < endTime && !LOCAL) {
            begin = new Date().getTime();
            await fetch(URLtobepinged, options);
            end = new Date().getTime();

            latency = end - begin;

            if(latency <= threshold) {
                LOCAL = true;
                console.log('reached!')
            } else {
                setTimeout(() => {
                    console.log('failed to reach')
                    getPing();
                }, 500)
            }
        } else {

            if(LOCAL) {
                document.getElementById('local').innerHTML = 'This device is Local';
            } else {
                document.getElementById('local').innerHTML = 'This device is not Local';
            }
        }
    }
}