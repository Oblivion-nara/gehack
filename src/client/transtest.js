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

function Prediction(date, net) {
	this.name = null;
	this.date = date;
	this.net = net;
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
