
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
        // begin = new Date().getTime()
        getPing().catch(error => {
            setTimeout(() => {
                end = new Date().getTime()
                latency = end - begin
                check_local(latency, endTime)
            }, 500)
        })
        async function getPing() {
            console.log('started')
            if(begin >= endTime) {
                console.log('done!')
                LOCAL = false
                stop(LOCAL)
            } else {
                console.log('fetching')
                await fetch(URLtobepinged, options);
            }
        }
    }










    // if(latency <= threshold) {
    //     stop(true)
    // }
    // LOCAL = false
    // document.getElementById('local').innerHTML = '';

    // start = new Date().getTime();
    // endTime = start + 10000;

    // begin = new Date().getTime();
    // getPing().catch(error => {
    //     setTimeout(() => {
    //         end = new Date().getTime()
    //         latency = end - begin
    //         console.log('continuing')
    //         check_local(latency)
    //     }, 500)
    //     })
    //     // LOCAL = false
    //     // console.log('error!');
    //     // console.log(error)
    //     // end = new Date().getTime();
    //     // latency = end - begin
    //     // console.log(latency)
    //     // if (end >= endTime ) {
    //     //     console.log('not done yet')
    //     // } else {
    //     //     console.log('done!')
    //     // }

    //     // if (latency <= threshold) {
    //     //     LOCAL = true;
    //     //     stop(LOCAL)
    //     // } else if(end >= endTime) {
    //     //     console.log('is it working?')
    //     //     stop(LOCAL)

    //     // } else {
    //     //     setTimeout(() => {
    //     //         console.log('failed to reach')
    //     //         getPing();
    //     //     }, 500) 
    //     // }
    // })

    // // begin = new Date().getTime();
    // async function getPing() {
    //     console.log('started')
    //     if(begin >= endTime) {
    //         console.log('done!')
    //         LOCAL = false
    //         stop(LOCAL)
    //     } else {
    //         console.log('fetching')
    //         await fetch(URLtobepinged, options);
    //     }






        // now = new Date().getTime();

        // if(now < endTime && !LOCAL) {
        //     begin = new Date().getTime();
        //     await fetch(URLtobepinged, options);
        //     end = new Date().getTime();

        //     latency = end - begin;

        //     if(latency <= threshold) {
        //         LOCAL = true;
        //         console.log('reached!')
        //     } else {
        //         setTimeout(() => {
        //             console.log('failed to reach')
        //             getPing();
        //         }, 500)
        //     }
        // } //else {
        //     if(LOCAL) {
        //         document.getElementById('local').innerHTML = 'This device is Local';
        //     } else {
        //         document.getElementById('local').innerHTML = 'This device is not Local';
        //     }
        // }
    }

    // if(LOCAL) {
    //     document.getElementById('local').innerHTML = 'This device is Local';
    // } else {
    //     document.getElementById('local').innerHTML = 'This device is not Local';
    // }

// }