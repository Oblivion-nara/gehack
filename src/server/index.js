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
})

// Listen for logins
app.get("/login", function(req, res) {
  console.log("User " + req.query.user + " with pass " + req.query.pass);
  res.redirect("/?user=" + req.query.user + "&pass=" + req.query.pass);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});