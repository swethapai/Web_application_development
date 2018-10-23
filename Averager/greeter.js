var i;
i = 0;
var vals = [];
$("#getAvg").click(function () {
    console.log("In calc function");
    var q;
    var avg;
    avg = 0;
    for (q = 1; q < vals.length; q++) {
        avg = avg + vals[q];
    }
    console.log("Vals length is" + vals.length);
    avg = avg / (vals.length - 1);
    $("p").text("The average is " + avg);
    $("#numEntered").val("");
});
function storeVals(num) {
    console.log("In store function");
    i = i + 1;
    vals[i] = parseInt(num);
    console.log("vals[" + i + "]=" + vals[i]);
    return vals[i];
}
function displayInputs() {
    var j;
    for (j = 1; j < vals.length; j++)
        $("p").append(vals[j] + ",");
}
$("#addVal").click(function () {
    var valEntered = $("#numEntered").val();
    var inputs;
    $("p").text("We have ");
    inputs = storeVals(valEntered.toString());
    displayInputs();
    $("#numEntered").val("");
});
$("#reset").click(function () {
    vals = [];
    i = 0;
    $("p").text("Reset complete");
    $("#numEntered").val("");
});
