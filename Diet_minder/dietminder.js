var arr = [];
var proval;
function addEntry(food, cals) {
    var entry;
    entry = [food, cals];
    arr.push(entry);
    $("#hiddenfield").show();
    $("#ul").append("<li>" + entry + "</li>");
    $("#food").val("");
    $("#cals").val("");
}
$("#edit").click(function () {
    var food = $("#food").val();
    var cals = $("#cals").val();
    var sfood;
    sfood = food.toString();
    var scals;
    scals = cals.toString();
    var editedarr;
    editedarr = [sfood, scals];
    console.log(editedarr);
    console.log(sfood);
    console.log(scals);
    arr.splice(proval, 1, editedarr);
    $("#ul li:eq(" + proval + ")").text(editedarr[0] + "," + editedarr[1]);
    $("#add").text("Add an entry");
    $("#food").val("");
    $("#cals").val("");
    $("#edit").hide();
});
$("#add").click(function () {
    var food = $("#food").val();
    var cals = $("#cals").val();
    var sfood;
    sfood = food.toString();
    var scals;
    scals = cals.toString();
    addEntry(sfood, scals);
});
$("#editentry").click(function () {
    var promptval = prompt("Enter the serial number of the entry you want to edit");
    proval = parseInt(promptval.toString()) - 1;
    console.log(proval);
    if (proval < 0 || (proval + 1) > arr.length) {
        alert("The serial number you have entered does not exist");
        return;
    }
    console.log(arr[proval][0]);
    console.log(arr[proval][1]);
    $("#food").val(arr[proval][0]);
    $("#cals").val(arr[proval][1]);
    $("#edit").show();
});
$("#delete").click(function () {
    var deleteIndex = prompt("Enter the serial number of the entry you want to delete");
    var delVal = parseInt(deleteIndex.toString()) - 1;
    if (delVal < 0 || (delVal + 1) > arr.length) {
        alert("The serial number you have entered does not exist");
        return;
    }
    console.log(delVal);
    arr.splice(delVal, 1);
    //$("#ul li:eq("+delVal+")").text("This entry was deleted");
    $("#ul li:eq(" + delVal + ")").remove();
});
$("#sum").click(function () {
    var i;
    var sumcals;
    sumcals = 0;
    for (i = 0; i < arr.length; i++) {
        sumcals = sumcals + parseInt(arr[i][1]);
        console.log(parseInt(arr[i][1]));
    }
    $("h6").text("The total calories consumed on the selected date is " + sumcals);
});
