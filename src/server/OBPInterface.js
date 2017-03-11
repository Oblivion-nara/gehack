var https = require("https");

var apiurl = "https://apisandbox.openbankproject.com/obp/v2.2.0";
var bankID = -1;
var accountID = -1;
var token = -1;

function getHTTPSRequest(options, callback) {
    https.request(
        options,
        function(response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                callback(JSON.parse(str));
            });
        }
    ).end();
}

//post request
function test(){
    var http = new XMLHttpRequest();
    var url = "get_data.php";
    var params = "lorem=ipsum&name=binny";
    http.open("POST", URL + url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(params);
}

// Export functions
module.exports = {
    getHTTPSRequest: getHTTPSRequest
}