function byID(id) {
  return document.getElementById(id);
}

// Login form submission
byID("login-form").onsubmit = function() {
  console.log("Form was submitted");

  var userL = byID("user").value;
  var passL = byID("pass").value;
  console.log(userL, passL);

  // Hide the login screen
  byID("login-background").hidden = true;

  // Do something with user and pass
  window.location.replace("/?user=" + userL + "&pass=" + passL);

  // Stops the normal method of submitting
  return false;
}

function goHome() {
  byID("home-page").hidden = false;
  byID("transactions-page").hidden = true;
}

function goTransactions() {
  byID("transactions-page").hidden = false;
  byID("home-page").hidden = true;
}

// Start on the home page
goHome();

// Check for query string
function getParamByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var user = getParamByName("user");
var pass = getParamByName("pass");
var account = getParamByName("account");

if (!user || !pass) {
    byID("login-background").hidden = false;
    byID("account-background").hidden = true;
}

// If there is a user do not show the login
if (user && pass && !account) {
  byID("login-background").hidden = true;
  byID("user-name-display").innerText = user;
  byID("account-background").hidden = false;
  getAjax("/transactions", function(data) {
    userStuff = JSON.parse(data)[user];
    console.log(userStuff);
  makeAccountList();
});
}

if (user && pass && account) {
  byID("login-background").hidden = true;
  byID("account-background").hidden = true;
  getAjax("/transactions", function(data) {
    userStuff = JSON.parse(data)[user];
    console.log(userStuff);
    makeGraphs(2);
});
}

var userStuff;

// Test post
function makeGraphs(n) {
// Prepare the JSON
  var names = [];
  var changes = [];
  var balances = [];
  var dates = [];

  for (i = 0; i < userStuff.accounts[n].transactions.length; i++) {
    names.push(userStuff.accounts[n].transactions[i].name);
    changes.push(userStuff.accounts[n].transactions[i].change);
    balances.push(userStuff.accounts[n].transactions[i].balance);
    dates.push(userStuff.accounts[n].transactions[i].date);
  }

  data = {
      "names": names,
      "changes": changes,
      "balances": balances, 
      "dates": dates
  }
  balance = data.balances;
    myChart.data.datasets[0].data = balance;
    var oldDate = null;
    var desc = "";
    for (var i = 0; i < data.dates.length; i++) {
        if (i==0) {
            balanceDif.push(data.changes[i]);
            desc+=getDesc(data.names[i], data.changes[i]);
            oldDate = data.dates[i];
        }
        else if (oldDate == data.dates[i] && i != data.dates.length-1) {
            balanceDif[i] += data.changes[i];
            desc+=getDesc(data.names[i], data.changes[i]);
        }
        else {
            balanceDif.push(data.changes[i]);
            difDataPoints.push(new DataPoint(desc, balanceDif[i-1], data.dates[i-1]));
            desc = getDesc(data.names[i], data.changes[i]);
            oldDate = data.dates[i];
        }
        if (i == data.dates.length-1) {
            difDataPoints.push(new DataPoint(desc, balanceDif[i], data.dates[i]));
        }
    }


    myChart.data.labels = difDataPoints;
    myChart1.data.labels = difDataPoints;
    myChart.update();
    myChart1.update();
}

var transactions = [];

function Transaction(name, value, date) {
    this.name = name;
    this.value = value;
    this.date = date;
    if (value < 0) {
        this.tooltip = " "+name+": -£" + Math.abs(value);
    }
    else {
        this.tooltip = " "+name+": -£" + Math.abs(value);
    }
}

getAjax("/transactionArrays", function(data) {
    data = JSON.parse(data);
    data.balances.reverse();
    data.dates.reverse();
    data.changes.reverse();
    data.names.reverse();

    var thisMonth = data.dates[data.dates.length-1].substr(5, 2);

    var dates = [];

    var incomeLastMonth = 0;
    var outcomeLastMonth = 0;

    for (var i = 0; i < data.dates.length; i++) {
        dates.push(data.dates[i].substr(0, 10));
    }

    for (var i = data.dates.length-1; i > 0; i--) {
        transactions.push(new Transaction(data.names[i], data.changes[i], dates[i]));
    }

    var oldDate = "";
    var desc = "";
    for (var i = 0; i < data.dates.length; i++) {
        if (i==0) {
            balance.push(data.balances[i]);
            balanceDif.push(parseFloat(data.changes[0]));
            console.log(balanceDif);
            desc+=getDesc(data.names[i], data.changes[i]);
            oldDate = dates[i];
        }
        else if (oldDate == dates[i] && i != data.dates.length-1) {
            balanceDif[balanceDif.length - 1] += parseFloat(data.changes[i]);
            desc += getDesc(data.names[i], data.changes[i]);
        }
        else {
            balanceDif.push(parseFloat(data.changes[i]));
            difDataPoints.push(new DataPoint(desc, balanceDif[balanceDif.length-2].toFixed(2), dates[i-1]));
            desc = getDesc(data.names[i], data.changes[i]);
            oldDate = dates[i];
            balance.push(data.balances[i]);
        }
        if (i == data.dates.length-1) {
            difDataPoints.push(new DataPoint(desc, balanceDif[balanceDif.length-1].toFixed(2), dates[i]));
        }
        if (dates[i].substr(5,2) === thisMonth) {
            if (parseFloat(data.changes[i]) > 0) incomeLastMonth += parseFloat(data.changes[i]);
            else outcomeLastMonth += parseFloat(data.changes[i]);
        }
        else {
            console.log(dates[i].substr(5,2) + " " + thisMonth);
        }
    }

    //console.log(balanceDif);

    myChart.data.datasets[0].data = balance;
    myChart.data.labels = difDataPoints;
    myChart1.data.labels = difDataPoints;
    myChart.update();
    myChart1.update();
    var bString = "Balance: ";
    if (balance[balance.length-1] < 0) bString += "-";
    bString += "£"+balance[balance.length-1];
    document.getElementById('total').innerHTML = bString+".  Transactions in the last month:";
    document.getElementById('up').innerHTML = incomeLastMonth.toString();
    document.getElementById('down').innerHTML = outcomeLastMonth.toString();

    for (var i = 0; i < 3; i++) {
        document.getElementById('date'+i).innerHTML = transactions[i].date;
        document.getElementById('name'+i).innerHTML = transactions[i].name;
        document.getElementById('change'+i).innerHTML = transactions[i].value;
    }

});

function getDesc(name, value) {
    if (value < 0) {
        return (" "+name+": -£" + Math.abs(value)+",");
    }
    else {
        return (" "+name+": £" + Math.abs(value)+",");
    }
}

function makeAccountList() {
    byID("account-list").innerHTML = "";

    for (var i = 0; i < userStuff.accounts.length; i++) {
        var name = userStuff.accounts[i].label || userStuff.accounts[i].id;
        byID("account-list").innerHTML += '<li class="mdl-list__item" onclick="function() { window.location = \'/?user=\"' + user + '\"&pass=\"' + pass + '\"&account=\"' + name + '\"  }"><span class="mdl-list__item-primary-content">' + name + '</span></li>'
    }
}