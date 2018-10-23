var i:number;
i=0;
var totals:number[]=[];
var totTax : number;
var invoiceTotal:number;
invoiceTotal=0;
let sym: string;
let tax: number;
let validitycheck: InvoiceState;

class Invoice {
    item: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;

    constructor(item:string, quantity: number, price:number, discount:number) {
        console.log("In constructor");
        this.item=item;
        this.quantity=quantity;
        this.price=price;
        this.discount=discount;
    }

    calculateTotal() {
        console.log("In calcTotal()");
        this.total = this.quantity * this.price;
        this.discount = (this.discount/100)*this.total;
        console.log("Total="+this.total+"Discount="+this.discount);
        this.total = this.total - this.discount;
        //alert(this.total);
        return this.total;
    }
}

interface Country {
    name: string;
    symbol: string;
    hasTaxRate: number;
}

interface Valid {
    ok : boolean;
    not_ok: boolean;
}

interface Invalid {
    price: boolean;
    quant: boolean;
    dis: boolean;
}

interface InvoiceState {
    valid: Valid;
    invalid: Invalid;
}

function assignCountry (coun: Country) {
    this.name = coun.name;
    this.symbol = coun.symbol;
    this.hasTaxRate = coun.hasTaxRate;
}

let usa = {name: "United States", symbol: "$", hasTaxRate: 0.30};
assignCountry(usa);

let saudi = {name: "Saudi Riyal", symbol:" ﷼‎", hasTaxRate: 0.20};
assignCountry(saudi);

let mexpeso = {name:"Mexican Peso", symbol:"Mex$", hasTaxRate: 0.25};
assignCountry(mexpeso);

let japan = {name: "Japan", symbol:"¥", hasTaxRate:0.10};
assignCountry(japan);

let sar = {name: "South African Rand", symbol: "R", hasTaxRate: 0.15};
assignCountry(sar);

function getSymbolAndTAxRate (ct: string) {
if(ct == "US") {
    
    sym = usa.symbol;
    tax = usa.hasTaxRate;
    console.log(sym);
}

else if (ct == "Saudi Riyal") {
    sym = saudi.symbol;
    tax = saudi.hasTaxRate;
    console.log(sym);
}

else if (ct == "Mexican Peso") {
    sym = mexpeso.symbol;
    tax=mexpeso.hasTaxRate;
    console.log(sym);
}
else if (ct == "Japan") {
    sym = japan.symbol;
    tax= japan.hasTaxRate;
    console.log(sym);
}
else if (ct == "South African Rand") {
    sym = sar.symbol;
    tax = sar.hasTaxRate;
    console.log(sym);
}
}

function storeVals (num: number) {
	console.log("In store function");
	i=i+1;
	totals[i] = num;
	console.log("vals["+i+"]="+totals[i]);
	//return vals[i];
}

function allChecks(qt: number, pri: number, disc: number) {

    console.log("In allChecks() method");
    validitycheck = {valid: {ok:false, not_ok:false} ,invalid: {price: false, quant: false, dis: false}};

    if (pri<0) {
        validitycheck.invalid.price = true;
        alert("Price is negetive. Please re-enter.");
    }

    if (qt<0) {
        validitycheck.invalid.quant = true;
        alert("The indicated quantity cannot be below zero");
    }

    if (disc<0 || disc>100) {
        validitycheck.invalid.dis = true;
        alert("Discount percentage should be within 0-100");
    }

    if(validitycheck.invalid.price==false && validitycheck.invalid.quant==false && validitycheck.invalid.dis==false) {
        validitycheck.valid.ok = true;
        console.log(validitycheck.valid.ok);
    }
}

function printTotalAndTax(tot: number) {
    totTax = (tax*tot);
    console.log("Tax rate="+tax);
    console.log("Total tax="+totTax);
    tot = tot+totTax;
    //$("#tax").text(sym + totTax);
    //$("#total").text( sym + tot );
    storeVals(tot);  
}

function getNewRow(pno:number, pname: string, qt:number, pri:number, dis:number) {
    console.log("Get new row");
    //$("#invoicegen").append("<br>")
    $("#invoicegen").append("<tr>")
    $("#invoicegen").append("<td>"+pno+"</td>");
    $("#invoicegen").append("<td>"+pname+"</td>");
    $("#invoicegen").append("<td>"+qt+"</td>");
    $("#invoicegen").append("<td>"+pri+"</td>");
    $("#invoicegen").append("<td>"+dis+"</td>");
    $("#invoicegen").append("<td>"+sym+totTax+"</td>");
    $("#invoicegen").append("<td>"+sym+totals[i]+"</td>");
    $("#invoicegen").append("</tr>")
}

function resetAllFields() {
    $("#partno").val("");
    $("#name").val("");
    $("#qt").val("");
    $("#price").val("");
    $("#disc").val("");
    $("#tax").text("");
    $("#total").text("");

}

$("select#country").change(function(){
    var countrySel = $('#country').find(":selected").text();
    console.log(countrySel);
    getSymbolAndTAxRate(countrySel);
    
});

$("#finish").click(function(){
var q:number;
console.log("totals length="+totals.length);
for(q=1;q<totals.length;q++) {
invoiceTotal = invoiceTotal + totals[q];
}
$("tfoot").append("<b>Grand Total="+sym+invoiceTotal+"</b>");
});

$("#add").click(function(){

    var countrySel = $('#country').find(":selected").text();
    console.log(countrySel);
    getSymbolAndTAxRate(countrySel);
    
    let pno= $("#partno").val();
    var pn: number;
    pn = parseInt(pno.toString());
    let itemname = $("#name").val();
    var it: string;
    it = itemname.toString();
    let qt= $("#qt").val();
    var quan: number;
    quan = parseInt(qt.toString());
    let pri = $("#price").val();
    var price: number;
    price = parseInt(pri.toString());
    let disc = $("#disc").val();
    var dis: number;
    dis= parseInt(disc.toString());
    dis.toFixed(2);

    allChecks(quan, price, dis);

    let total = new Invoice(it, quan, price, dis);
    //total.calculateTotal();
    if(validitycheck.valid.ok == true) {
    printTotalAndTax(total.calculateTotal());
    resetAllFields();
    getNewRow(pn,it,quan, price, dis);
    $("#hidden").show();
    }

});