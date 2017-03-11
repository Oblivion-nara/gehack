var express = require("express");
var app = express();
var path = require("path");

var obp = require("./OBPInterface.js");

// Serve static files
app.use(express.static("src/client/public"));

// Directory of client stuff
var client = path.join(__dirname, "../client/")

var users = {};

// Serve the homepage
app.get("/", function(req, res) {
  var userName = req.query.user;
  var pass = req.query.pass;

  if (!(userName && pass)) {
    res.sendFile(path.join(client, "index.html"));
  }

  if (userName && pass) {

    var token;

    // Get the token first
    obp.getHTTPSRequest(
    {
      host: 'apisandbox.openbankproject.com',
        path: '/my/logins/direct',
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'DirectLogin username="' + userName + '", password="' + pass + '", consumer_key="hznak4pyka33m2pn2yq5gr5le0x2itnnsbyht4jp"'
        }
      },
      function(json) {
        // If there was an error report it
        if (json.error) {
          console.error("Invalid user/password: " + json.error);
        } else {
          token = json.token;

          console.log("Making the user object");
          // Make the user object
          var user = {
            "name": userName,
            "token": token,
            "accounts": []
          }

          // Carry on and get accounts
          obp.getHTTPSRequest(
            {
              host: "apisandbox.openbankproject.com",
              path: "/obp/v1.4.0/accounts/private",
              headers: {
                "Content-Type": "application/json",
                "Authorization": 'DirectLogin token="' + token + '"'
              }
            },
            function(json) {
              for (var i = 0; i < json.accounts.length; i++) {
                var a = json.accounts[i];
                var account = {
                  "bank_id": a.bank_id,
                  "id": a.id,
                  "label": a.label,
                  "transactions": []
                }
                console.log("Got another account", account);

                obp.getHTTPSRequest(
                  {
                    host: 'apisandbox.openbankproject.com',
                    path: '/obp/v1.4.0/banks/' + account.bank_id + '/accounts/' + account.id + '/owner/transactions',
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": 'DirectLogin token="' + token + '"'
                    }
                  },
                  function(json) {
                    for (var i = 0; i < json.transactions.length; i++) {
                      var t = json.transactions[i];
                      var transaction = {
                        "id": t.id,
                        "name": t.details.description,
                        "change": t.details.value.amount,
                        "balance": t.details.new_balance.amount,
                        "date": t.details.completed
                      };
                      console.log("Got a transaction", transaction);
                      account.transactions.push(transaction);
                    }
                  }
                );

                console.log("Pushed user account");
                user.accounts.push(account);
              }
            }
          )
        }
        users[user.name] = user;
      }
    );
    setTimeout(function() {
      res.sendFile(path.join(client, "index.html"));
      console.log("Hello");
    }, 2000);
  }
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
  res.send(JSON.stringify(users));
})

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

var token;

