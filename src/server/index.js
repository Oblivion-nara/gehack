var express = require("express");
var app = express();
var path = require("path");

var obp = require("./OBPInterface.js");

// Serve static files
app.use(express.static("src/client/public"));

// Directory of client stuff
var client = path.join(__dirname, "../client/")

// Serve the homepage
app.get("/", function(req, res) {
  res.sendFile(path.join(client, "index.html"));
});

// Transaction object
var transactions = [];

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

app.get("/transactions", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(transactions));
})

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

var token;

obp.getHTTPSRequest(
  {
      host: 'apisandbox.openbankproject.com',
      path: '/my/logins/direct',
      headers: {
          "Content-Type": "application/json",
          "Authorization": 'DirectLogin username="robert.uk.29@example.com", password="d9c663", consumer_key="hznak4pyka33m2pn2yq5gr5le0x2itnnsbyht4jp"'
      }
  },
  function(json) {
    token = json.token;
    console.log(token);

    obp.getHTTPSRequest(
      {
        host: 'apisandbox.openbankproject.com',
        path: '/obp/v1.4.0/banks/gh.29.uk/accounts/851273ba-90d5-43d7-bb31-ea8eba5903c7/owner/transactions',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'DirectLogin token="' + token + '"'
        }
      },
      function(json) {
        
        for (i = 0; i < json.transactions.length; i++) {
          var t = json.transactions[i];
          transactions.push({
            "id": t.id,
            "name": t.details.description,
            "change": t.details.value.amount,
            "balance": t.details.new_balance.amount,
            "date": t.details.completed
          });
        }

      }
    );
  }
);