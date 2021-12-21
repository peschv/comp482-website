/*
 * Javascript for handling user input for the newsletter signup form in home.html.
 * Validates whether the user's email is in a valid email format, and displays
 * either a success or error message depending on the validity of said email.
 */

/*
 * Obtain user input and call validateEmail() to confirm email is in valid email
 * form. If validateEmail() returns true, display a success message. Otherwise
 * display error message.
 */
function confirmNewsletter(element) {
  var input = document.getElementById(element).value; //Obtain value of user input

  //If validateEmail is true, hide signup form area, and replace with success message
  if (validateEmail(input)) {
    document.getElementsByClassName("signup")[0].classList.add("hide");
    document.getElementsByClassName("success-message")[0].classList.remove("hide");
  } else { //Display error message
    document.getElementById(element).classList.add("error");
    document.getElementById("error-message").classList.remove("hide");
  }
}

/*
* Verify if email is in a valid email format. Obtained from the following
* source code:
* Author: Tran Nguyen Nhat Thuy
* Code: https://stackoverflow.com/a/38811149
*/
function validateEmail(input) {
  return String(input)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

//Wait for page to load
window.addEventListener('load', function() {
  //Event listener for the submit button
  document.getElementById("submit-button").addEventListener("click", function(){confirmNewsletter("email-input")});
});
