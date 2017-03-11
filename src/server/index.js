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

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});