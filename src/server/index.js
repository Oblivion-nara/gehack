var express = require("express");
var app = express();
var path = require("path");

// Serve static files
app.use(express.static("src/client/public"));

// Directory of client stuff
var client = path.join(__dirname, "../client/")

// Serve the homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(client, "index.html"));
});

// Test transaction data
var transactions = [
  {
    "name": "Food",
    "change": -20,
    "balance": 412,
    "date": "10/3/17"
  },
  {
    "name": "Wage",
    "change": 100,
    "balance": 512,
    "date": "11/3/17"
  }
]

// Serve transaction data
app.get("/transactionArrays", function(req, res) {
  // Prepare the JSON
  var names = [];
  var changes = [];
  var balances = [];
  var dates = [];

  for (i = 0; i < transactions.length; i++) {
    names.push(transactions[i].name);
    changes.push(transactions[i].change);
    balances.push(transactions[i].balance);
    dates.push(transactions[i].date);
  }
  
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    "names": names,
    "changes": changes,
    "balances": balances,
    "dates": dates
  }));
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});