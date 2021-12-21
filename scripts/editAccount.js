/*
* Javascript for deleting account, and editing email and name on my-account.html.
*
*/

// Variable for login/signup button, used by closeAccount() function
var div = document.getElementsByClassName("login-button")[0];

/*
 * Allow user to edit name by displaying prompt window with input field. If
 * user did not enter name (determined by whether they altered the placeholder
 * text 'Enter name...'), then display error message and do not change name.
 * If user presses cancel, close modal without changing name. Otherwise, change
 * name to input value.
*/
function editName() {
  //Prompt window displaying input box
  var newName = prompt("Please enter a new name:","Enter name...");
  //Hide error message by default
  document.getElementsByClassName("error-message")[0].classList.add("hide");

  switch(newName) {
    case null: //User pressed cancel, do nothing
        break;
    case "Enter name...": //User left field blank, display error message
        document.getElementsByClassName("error-message")[0].classList.remove("hide");
        break;
    default: //Add new name
        document.getElementsByClassName("name-data")[0].innerHTML = newName;
        break;
  }
}

/*
 * Allow user to edit email by displaying prompt window with input field. If
 * user did not enter a value (determined by whether they altered the placeholder
 * text 'Enter email...'), then display error message and do not change email.
 * If user presses cancel, close modal without changing email. Otherwise,
 * call validateEmail(), and if it returns true then change email to input value.
*/
function editEmail() {
  //Prompt window displaying input box
  var newEmail = prompt("Please enter a new email:","Enter email...");
  //Hide error message by default
  document.getElementsByClassName("error-message")[1].classList.add("hide");

  switch(newEmail) {
    case null: //User pressed cancel
        break;
    case "Enter email...": //User left field blank, display error message
        document.getElementsByClassName("error-message")[1].classList.remove("hide");
        break;
    default:
        //If input value is a valid email, change email to input value
        if(validateEmail(newEmail)){
          document.getElementsByClassName("email-data")[0].innerHTML = newEmail;
        } else { //Else if email not valid, display error message
          document.getElementsByClassName("error-message")[1].classList.remove("hide");
        }
        break;
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

/*
 * Delete user account after user presses "OK" to two confirmation modal
 * boxes requesting user to confirm that they wish to delete account. This is
 * to prevent the user from accidentally deleting the account.
*/
function deleteAccount() {
  //Display first confirmation box
  var a = confirm("Are you sure you want to delete your account?");
  //If user presses Ok, display second confirmation box, else cancel action
  if (a == true) {
    //Double check that user intended to delete account
    var b = confirm("Warning! You are about to delete your account. This action cannot be reversed.");
    //If user presses Ok on second confirmation box, call closeAccount()
    if (b == true) {
      closeAccount();
    }
  }
}

/*
 * Remove user account, then log user out of account and redirect user to
 * the home page. Replace "signout" text with "login/signup", remove visibility
 * of my-account-html and my-lists.html from the navigation menu, and set
 * localStorage property to login-false.
*/
function closeAccount() {
  div.removeClass('login-true');
  div.addClass('login-false');
  localStorage.setItem('logged-in', 'false');
  document.getElementById("login-text").innerHTML = "Login/Signup";
  document.getElementById('my-account').style.display = "none";
  document.getElementById('my-lists').style.display = "none";
  window.location.replace("home.html");
}

//Wait for page to load
window.addEventListener('load', function() {
  //Event listener for edit name button
  document.getElementById("edit-name").addEventListener("click", editName);
  //Event listener for edit email button
  document.getElementById("edit-email").addEventListener("click", editEmail);
  //Event listener for delete account button
  document.getElementById("delete-button").addEventListener("click", deleteAccount);

});
