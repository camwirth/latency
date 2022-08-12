$(document).ready(function() {

    var socket = io.connect('http://127.0.0.1:5000');

    $('#start_ping').on('click', function() {
        console.log('Send request to begin check');
        socket.emit('begin_check');
    })

    socket.on('ping', (callback) => {
        console.log('recieved ping')
        callback();
    })
})