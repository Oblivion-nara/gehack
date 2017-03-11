function main() {
	var req = new XMLHttpRequest();

	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			onget(JSON.parse(this.responseText));
		}
	};
	req.open("GET", "https://apisandbox.openbankproject.com/obp/v1.2.1/banks/rbs/accounts/savings-kids-john/public/transactions", true);
	req.send();
}

function onget(data) {
	var trans = data.transactions;
	console.log("Received " + trans.length + " transaction(s).");

	console.log(getPredictions(trans, new Date(trans[0].details.posted)));
}

function getWeek() {
	return 1000 * 60 * 60 * 24 * 7;
}

var PreNames = [];
var PreChanges = [];
var PreBalences = [];
var PreDates = [];

function Prediction(names, changes, balances, dates) {

	this.names = names;
	this.changes = changes;
	this.balences = balences;
	this.dates = dates;
	findRegular(names, changes, balances, dates);

}

function getNames(){
	return PreNames;
}
function getChanges(){
	return PreChanges;
}
function getDates(){
	return PreDates;
}
function getBalences(){
	return PreBalences;
}

//finds regular paments either in or out
// unfinished function to predict future balances
function findRegular(names, changes, balances, dates){

	var checked = [];
	var tempN;
	var tempC;
	var tempD;
	var predictNum = 1;
	for(var i = 0;i < names.length;i++){

		tempN = [];
		tempC = [];
		if(checked.filter(names,names[i])){
			continue;
		}
		tempN = names.filter(names,names[i]);
		var position = 0;

		for(var j = 0;j < tempN.length;j++){

			position = tempN.indexof(tempN[j],position) + 1;
			tempC.push(changes[position - 1]);

		}
		var differentValues = changes(tempC);
		for(var j = 0;j<differentValues.length;j++){
			var position = 0;
			temp = tempC.filter(tempC,differentValues[j]);
			for(var x = 0; x < temp.length;x++){
				position = Changes.indexof(temp[x],position) + 1;
				if(position < 0){
					break;
				}
				tempD.push(dates[position - 1]);
				var averagedif = 0;
				for(var y = 0; y < tempD.length;y++){
					//averagedif += new Date(tempD[y]);
				}

				PreNames.push(names[i]);
				PreChanges.push(differentValues[j]);
				PreBalences.push(0);
				PreDates.push("17/4/"+predictNum);

			}
		}
		for(var i = 0;i<PreDates.length;i++){
			PreNames.push(PreNames[i]);
			PreChanges.push(PreChanges[j]);
			PreBalences.push(0);
			PreDates.push("17/5/"+i);
		}
		for(var i = 0;i<PreDates.length;i++){
			PreNames.push(names[i]);
			PreChanges.push(PreChanges[j]);
			PreBalences.push(0);
			PreDates.push("17/6/"+i);
		}
		checked.push(names[i]);

	}

}

function names(name){
	return this.equals(name);
}
function change(change){
	return this > (change * 9 / 10) && this < (change * 11 / 10);
}
function changes(changes){

	var difference = [];
	var count = 0;
	for(var i = 0;i<changes.length;i++){
		var different = true;
		for(var j = 0; i < difference.length;j++){
			if(changes[i] > (difference[j] * 9 / 10) && changes[i] < (difference[j] * 11 / 10)){
				different = false;
				break;
			}
		}
		if(different){
			count++;
			difference.push(changes[i]);
		}
	}
	return difference;
}

/**
* Returns the predictions of the algorithm for the next month or so.
* Return format is an array of transactions, some of which may have a null name.
* The transaction returned will be of the format {"name": "", "date": date of the transaction, "net": difference in balance compared to the last data point}
*/
function getPredictions(trans, now) {
	// To start with, just assume that next month will be the same as last month, and next week will be the same as last week
	var transMonth = getTransactionsBetween(trans, new Date(now.valueOf() - getWeek() * 4), now);
	var transWeek  = getTransactionsBetween(trans, new Date(now.valueOf() - getWeek()), now);

	var netMonth = getTransactionsNet(transMonth);
	var netWeek  = getTransactionsNet(transWeek);

	var predict = [
		new Prediction(new Date(now.valueOf() + getWeek()), netWeek),
		new Prediction(new Date(now.valueOf() + getWeek()*4), netWeek)
	];

	return predict;
}

function getTransactionsBetween(trans, from, to) {
	var ret = [];

	for (var i = 0; i < trans.length; i++) {
		var t = trans[i];

		var time = new Date(t.details.posted);
		if (time.getTime() >= from.getTime() && time.getTime() <= to.getTime()) {
			ret.push(t);
		}
	}
	return ret;
}

function getTransactionsNet(trans) {
	var net = 0;
	for (var i = 0; i < trans.length; i++) {
		net += parseFloat(trans[i].details.value.amount);
	}
	return net;
}

function getRepeats(){

}
