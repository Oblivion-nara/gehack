var apiurl = "https://apisandbox.openbankproject.com/obp/v2.2.0";
var bankID = -1;
var accountID = -1;
var token = -1;

//login
function login(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        var text = request.responseText;
        try {
            var json = JSON.parse(text);
            token = json.token;
        }
        catch(err) {
        }
    }
    request.open("POST", "https://apisandbox.openbankproject.com/my/logins/direct", true);n   
    request.setRequestHeader("Authorization","DirectLogin username=\"robert.uk.29@example.com\"\, password=\"d9c663\"\, consumer_key=\"hznak4pyka33m2pn2yq5gr5le0x2itnnsbyht4jp\"");
    request.setRequestHeader("Content-Type","application/json");
    request.send(null);
}
login();
//get request
function getRequest(theUrl){

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        var json = JSON.parse(request.responseText);
        token = json.token;
    }
    request.open("GET", apiurl + theUrl, true); // true for asynchronous
    return request;
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
