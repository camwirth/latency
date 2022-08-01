var run 
// var URLtobepinged = "http://76.27.100.138/piapp/"
var URLtobepinged= "https://192.168.4.1"
threshold = 22

function run() {
    run = true;
    begin_time = new Date().getTime()
    runtime = 10000 + begin_time
    get_latency()
}

function get_latency() {
    async function makeRequest() {
        try {
            console.log('making request')

            current_time = new Date().getTime()
            if(run==true) {
                if(current_time >= runtime) {
                    stop(false)
                } else {
                    begin = new Date().getTime()
                    const response = await axios.get(URLtobepinged)
                    end = new Date().getTime()
                    
                    latency = end - begin

                    if (latency <= threshold) {
                        console.log('local')
                        stop(true)
                    }
                }
            }
        } catch (err) {
            setTimeout(() => {
                get_latency()
            }, 500)
            end = new Date().getTime()
            console.log('error')
            latency = end - begin
            console.log(latency)
            if(latency <= threshold) {
                console.log('local')
                stop(true)
            }
        console.log(err.response.status)    //prints html error status code
        console.log(err.message)        
        console.log(err.response.headers)
        console.log(err.response.data)
        }
    }

    makeRequest()
}

function stop(LOCAL) {
    run = false
    if(LOCAL) {
        document.getElementById('local').innerHTML = 'This device is local'
    } else {
        document.getElementById('local').innerHTML = 'This device is not local'
    }
}
