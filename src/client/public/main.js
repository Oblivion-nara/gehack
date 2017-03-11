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
});

function getDesc(name, value) {
    if (value < 0) {
        return (" "+name+": -£" + Math.abs(value)+",");
    }
    else {
        return (" "+name+": £" + Math.abs(value)+",");
    }
}
