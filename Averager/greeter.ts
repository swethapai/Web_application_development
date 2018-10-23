var i:number;
i=0;
var vals:number[]=[];

$("#getAvg").click(function() {
	console.log("In calc function");
	var q:number;
	var avg:number;
	avg=0;
	for(q=1;q<vals.length;q++) {
     avg=avg+vals[q];
	}
	console.log("Vals length is"+vals.length);
	avg=avg/(vals.length-1);
	$("p").text("The average is "+avg);
	$("#numEntered").val("");
});

function storeVals (num: string) {
	console.log("In store function");
	i=i+1;
	vals[i] = parseInt(num);
	console.log("vals["+i+"]="+vals[i]);
	return vals[i];
}

function displayInputs () {
    var j:number;
    for(j=1;j<vals.length;j++)
	$("p").append(vals[j]+",");
}

$("#addVal").click(function(){
	let valEntered= $("#numEntered").val();
	var inputs:number;
	$("p").text("We have ");
	inputs=storeVals(valEntered.toString());
	displayInputs();
	$("#numEntered").val("");
});

$("#reset").click(function() {
   vals=[];
   i=0;
   $("p").text("Reset complete");
   $("#numEntered").val("");
});




