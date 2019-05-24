socket = io();

const dropdown_mults = "<option value=0.000001>µ</option><option value =0.001>m</option><option selected value=1></option><option value=1000>k</option><option value=1000000>M</option><option value=1000000000>G</option>";

window.onclick = function (event){
    if (event.button == 0) {
        socket.emit("click");
    }
}

socket.on('clickres', function() {
    console.log("response from server");
});

function switchConverter(type){
    console.log(type);
}

function convertDistance () {

}

socket.on('convtypes', function(data) {
    for (type in data.out) {
        document.getElementById(data.out[type] + "_mult_out").innerHTML = dropdown_mults;
        document.getElementById(data.out[type] + "_mult_in").innerHTML = dropdown_mults;
    }
});

var testInput = {val_in:10, fact_in:1, unit_in:"meter", fact_out:1, unit_out:"banana"};

socket.on("returnDist", function(data) {
    console.log(data);
});

socket.emit('requestTypes');