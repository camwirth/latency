var run
var URLtobepinged = "http://76.27.100.138/piapp/"
threshold = 22

const myHeaders = new Headers({
    'Content-Type': 'application/json'
})

function run() {
    run = true;
    begin_time = new Date().getTime()
    runtime = 10000 + begin_time
    get_latency()
}

function get_latency() {
    var options = {
        method: "GET",
        cache: "no-cache",
        mode: "cors",
        headers: myHeaders
    }

    getPing().catch(error => {
        setTimeout(() => {
            get_latency()
        }, 500)
        end = new Date().getTime()
        console.log("error")
        latency = end - begin
        console.log(latency)
        // document.getElementById("latency").innerHTML = latency
        if(latency <= threshold) {
            console.log('local')
            stop(true)
        }
    })

    async function getPing(){
        console.log("request made")

        current_time = new Date().getTime();
        console.log(run)
        if(run==true) {
            if(current_time >=runtime){
                stop(false)
            } else {
                begin = new Date().getTime()
                const response = await fetch(URLtobepinged, options)
                end = new Date().getTime()

                latency = end - begin

                if(latency <= threshold) {
                    console.log('local')
                    stop(true)
                }
            }
        }
    }

}

function stop(LOCAL) {
    run = false
    if(LOCAL) {
        document.getElementById('local').innerHTML = 'This device is local'
    } else {
        document.getElementById('local').innerHTML = 'This device is not local'
    }

}

// function run_again() {
    
// }

// function check_latency() {

// }