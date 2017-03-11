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

// If there is a user do not show the login
if (user && pass) {
  byID("login-background").hidden = true;
}

// Test post
getAjax("/transactions", function(data) {
  console.log(JSON.parse(data));
});

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

});

function getDesc(name, value) {
    if (value < 0) {
        return (" "+name+": -£" + Math.abs(value)+",");
    }
    else {
        return (" "+name+": £" + Math.abs(value)+",");
    }
}
