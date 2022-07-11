
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
    //var img = document.createElement('img');
    if(LOCAL) {
        document.getElementById('local').innerHTML = 'This device is Local';
        //img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsUp.png';
        //document.getElementById('IMAGE').appendChild(img);
    } else {
        document.getElementById('local').innerHTML = 'This device is not Local';
        //img.src = 'file:///home/camillewirthlin/latency/javascript_latency/check/thumbsDown.png';
        //document.getElementById('IMAGE').appendChild(img);
    }
}

function check_local() {
    document.getElementById('local').innerHTML = '';
    //document.getElementById('IMAGE').innerHTML = '';

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
            const response = await fetch(URLtobepinged, options);
            end = new Date().getTime();

            latency = end - begin;

            if(latency < threshold) {
                LOCAL = true;
                console.log('reached!')
            } else {
                setTimeout(() => {
                    console.log('failed to reach')
                    getPing();
                }, 500)
            }
        } else {
            var img = document.createElement('img');
            if(LOCAL) {
                document.getElementById('local').innerHTML = 'This device is Local';
            } else {
                document.getElementById('local').innerHTML = 'This device is not Local';
            }
        }
    }
}