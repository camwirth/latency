var i = 0;
var totalOutcomes = [];
totalCount = 100;

function download(lst) {
    graph_label = "valid_device?";
    dataStr= graph_label + ", \n";
    //create string separated with commas and new lines
    for(i=0; i<lst.length; i++){
        line = String(lst[i]) + ", \n";
        dataStr += line;
    }
    //create blob and download into a file
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([dataStr], {type: "text/csv"}));
    a.download = "valid_device?.csv";
    a.click();
}
function checkData(latencyData) {
    latencyData.sort();
    if(latencyData[0] < 50) { 
        return true;
    }
    else {
        return false;
    }
}

function pingURL() {
    var URLtobepinged = "http://192.168.0.199";
    var count = 0;
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
    var itr = 0;
    var latencyData = [];

    getPing().catch(error => {
        console.log('error!');
    })

    async function getPing() {
        if(count < totalCount) {
            if(itr < 5) {
                console.log('start');
                begin = new Date().getTime();
                const response = await fetch(URLtobepinged, options);
                end = new Date().getTime();
        
                latency = end - begin;
                latencyData.push(latency);
                    
                itr++;

                setTimeout(() => {
                    getPing();
                }, 500)
            }
            else {
                itr = 0;
                count++;
                document.getElementById("counts").innerHTML = String(totalCount - count); 
                console.log('done');
                totalOutcomes.push(checkData(latencyData));
                console.log(totalOutcomes);
                getPing();
            }
        }
        else {
            True = 0;
            False = 0;
            for(i=0; i<totalOutcomes.length; i++) {
                if(totalOutcomes[i]) True++;
                else False++;
            }
            document.getElementById("accuracy").innerHTML = "Accuracy of the data is: " + String(True/totalOutcomes.length*100) + "%";
            download(totalOutcomes);
        }
    }
}