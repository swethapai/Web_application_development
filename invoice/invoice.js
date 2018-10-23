var Invoice = /** @class */ (function () {
    function Invoice(item, quantity, price, discount) {
        console.log("In constructor");
        this.item = item;
        this.quantity = quantity;
        this.price = price;
        this.discount = discount;
    }
    Invoice.prototype.calculateTotal = function () {
        console.log("In calcTotal()");
        this.total = this.quantity * this.price;
        this.discount = (this.discount / 100) * this.total;
        console.log("Total=" + this.total + "Discount=" + this.discount);
        this.total = this.total - this.discount;
        //alert(this.total);
        return this.total;
    };
    return Invoice;
}());
var validitycheck;
function assignCountry(coun) {
    this.name = coun.name;
    this.symbol = coun.symbol;
    this.hasTaxRate = coun.hasTaxRate;
}
var usa = { name: "United States", symbol: "$", hasTaxRate: 0.30 };
assignCountry(usa);
var saudi = { name: "Saudi Riyal", symbol: " ﷼‎", hasTaxRate: 0.20 };
assignCountry(saudi);
var mexpeso = { name: "Mexican Peso", symbol: "Mex$", hasTaxRate: 0.25 };
assignCountry(mexpeso);
var japan = { name: "Japan", symbol: "¥", hasTaxRate: 0.10 };
assignCountry(japan);
var sar = { name: "South African Rand", symbol: "R", hasTaxRate: 0.15 };
assignCountry(sar);
var sym;
var tax;
function getSymbolAndTAxRate(ct) {
    if (ct == "US") {
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
        tax = mexpeso.hasTaxRate;
        console.log(sym);
    }
    else if (ct == "Japan") {
        sym = japan.symbol;
        tax = japan.hasTaxRate;
        console.log(sym);
    }
    else if (ct == "South African Rand") {
        sym = sar.symbol;
        tax = sar.hasTaxRate;
        console.log(sym);
    }
}
var i;
i = 0;
var totals = [];
var totTax;
var invoiceTotal;
invoiceTotal = 0;
function storeVals(num) {
    console.log("In store function");
    i = i + 1;
    totals[i] = num;
    console.log("vals[" + i + "]=" + totals[i]);
    //return vals[i];
}
function allChecks(qt, pri, disc) {
    console.log("In allChecks() method");
    validitycheck = { valid: { ok: false, not_ok: false }, invalid: { price: false, quant: false, dis: false } };
    if (pri < 0) {
        validitycheck.invalid.price = true;
        alert("Price is negetive. Please re-enter.");
    }
    if (qt < 0) {
        validitycheck.invalid.quant = true;
        alert("The indicated quantity cannot be below zero");
    }
    if (disc < 0 || disc > 100) {
        validitycheck.invalid.dis = true;
        alert("Discount percentage should be within 0-100");
    }
    if (validitycheck.invalid.price == false && validitycheck.invalid.quant == false && validitycheck.invalid.dis == false) {
        validitycheck.valid.ok = true;
        console.log(validitycheck.valid.ok);
    }
}
function printTotalAndTax(tot) {
    totTax = (tax * tot);
    console.log("Tax rate=" + tax);
    console.log("Total tax=" + totTax);
    tot = tot + totTax;
    $("#tax").text(sym + totTax);
    $("#total").text(sym + tot);
    storeVals(tot);
}
function getNewRow(pno, pname, qt, pri, dis) {
    console.log("Get new row");
    //$("#invoicegen").append("<br>")
    $("#invoicegen").append("<tr>");
    $("#invoicegen").append("<td>" + pno + "</td>");
    $("#invoicegen").append("<td>" + pname + "</td>");
    $("#invoicegen").append("<td>" + qt + "</td>");
    $("#invoicegen").append("<td>" + pri + "</td>");
    $("#invoicegen").append("<td>" + dis + "</td>");
    $("#invoicegen").append("<td>" + sym + totTax + "</td>");
    $("#invoicegen").append("<td>" + sym + totals[i] + "</td>");
    $("#invoicegen").append("</tr>");
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
$("select#country").change(function () {
    var countrySel = $('#country').find(":selected").text();
    console.log(countrySel);
    getSymbolAndTAxRate(countrySel);
});
$("#finish").click(function () {
    var q;
    console.log("totals length=" + totals.length);
    for (q = 1; q < totals.length; q++) {
        invoiceTotal = invoiceTotal + totals[q];
    }
    $("tfoot").append("<b>Grand Total=" + invoiceTotal + "</b>");
});
$("#add").click(function () {
    var countrySel = $('#country').find(":selected").text();
    console.log(countrySel);
    getSymbolAndTAxRate(countrySel);
    var pno = $("#partno").val();
    var pn;
    pn = parseInt(pno.toString());
    var itemname = $("#name").val();
    var it;
    it = itemname.toString();
    var qt = $("#qt").val();
    var quan;
    quan = parseInt(qt.toString());
    var pri = $("#price").val();
    var price;
    price = parseInt(pri.toString());
    var disc = $("#disc").val();
    var dis;
    dis = parseInt(disc.toString());
    allChecks(quan, price, dis);
    var total = new Invoice(it, quan, price, dis);
    //total.calculateTotal();
    if (validitycheck.valid.ok == true) {
        printTotalAndTax(total.calculateTotal());
        resetAllFields();
        getNewRow(pn, it, quan, price, dis);
        $("#hidden").show();
    }
});
