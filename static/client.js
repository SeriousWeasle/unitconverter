socket = io();

window.onclick = function (event){
    if (event.button == 0) {
        socket.emit("click");
        console.log(event);
    }
}

socket.on('clickres', function() {
    console.log("response from server");
});