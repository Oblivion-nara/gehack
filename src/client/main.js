function byID(id) {
  return document.getElementById(id);
}

// Login form submission
byID("login-form").onsubmit = function() {
  console.log("Form was submitted");

  var user = byID("user").value;
  var pass = byID("pass").value;
  console.log(user, pass);

  // Do something with user and pass

  // Stops the normal method of submitting
  return false;
}