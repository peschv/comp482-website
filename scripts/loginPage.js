/*
 * Javascript for user login and signup forms on login.html. Evaluates if
 * input values are valid, and displays error messages if they are invalid.
 * If signup form inputs are valid, then replace page content with a success
 * message and a confetti animation using the Canvas Confetti plugin. If login
 * form inputs are valid, redirect user to the homepage.
*/

//Display signup form element
function showForm() {
  document.getElementsByClassName("signup-form")[0].classList.remove("hide");
}

/*
 * Evaluate login form input and log user into account if input is valid.
 * If user enters an invalid email, as determined by validateEmail(), display
 * email error message. If password is of insufficient length, then display
 * password error message. Otherwise if both email and password are in a valid
 * format then log user into account by setting localStorage 'logged-in' to
 * 'true', calling displayLogout() and redirect user to the my-account.html page.
 * If an unknown error occurs during login, display error message and ask user
 * to try again.
*/
function login() {
  var input = document.getElementsByClassName("user-email")[0].value;
  var pswd = document.getElementById("password1");
  var emailError = document.getElementsByClassName("email-error")[0];
  var pswdError = document.getElementsByClassName("password1-error")[0];
  var loginError = document.getElementsByClassName("login-error")[0];

  //Reset error messages
  emailError.classList.add("hide");
  pswdError.classList.add("hide");
  loginError.classList.add("hide");

  if (!validateEmail(input)) { //If email is invalid
    emailError.classList.remove("hide");
  } else if (!passwordLength(pswd)) { //If password is too short
    pswdError.classList.remove("hide");
  } else if (validateEmail(input) && passwordLength(pswd)) { //If password and email are valid
    localStorage.setItem('logged-in', 'true');
    displayLogout();
    window.location.replace("my-account.html");
  } else { //If unknown error occurred
     loginError.classList.remove("hide");
  }
}

/*
 * Sign up a new user. Display error messages if email is not in a valid
 * email format, as determined by a call to validateEmail(). Display error
 * messages if password length is less than 8 characters, or if password and
 * confirm password input fields do not match.
 * Otherwise, when signup is successful, replace page contents with statement
 * that signup was a success and a request for user to check their email for
 * a confirmation email to complete the signup process. Briefly also display
 * confetti animation, and include a More Confetti button allowing users to
 * replay the confetti.
*/
function signup() {
  var email = document.getElementsByClassName("user-email")[1].value; //Email input
  var pswd2 = document.getElementById("password2"); //First password input field
  var pswd3 = document.getElementById("password3"); //Confirm password input field

  var emailError = document.getElementsByClassName("email-error")[1]; //Email error
  var pswd2Error = document.getElementsByClassName("password2-error")[0]; //Password error
  var pswd3Error = document.getElementsByClassName("password3-error")[0]; //Confirm password error

  //Reset error messages to hidden
  emailError.classList.add("hide");
  pswd2Error.classList.add("hide");
  pswd3Error.classList.add("hide");

  //If email is invalid, display error message
  if (!validateEmail(email)) {
    emailError.classList.remove("hide");
  //If passwords don't match, display error message
  } else if (!validatePasswords(pswd2,pswd3)) {
    pswd3Error.classList.remove("hide");
  //If email and passwords are valid, i.e. signup was successful
  } else if(validateEmail(email) && validatePasswords(pswd2,pswd3)) {
    //Hide page contents
    document.getElementsByClassName("site-content")[0].classList.add("hide");
    //Display success message
    document.getElementsByClassName("success-container")[0].classList.remove("hide");
    playConfetti(); //Play confetti
  //An unknown error occurred
  } else {
    //Display message at top of form indicating an error occurred and to please try again
    document.getElementsByClassName("signup-error")[0].classList.remove("hide");
  }
}

/*
 * Validate if both passwords entered into signup form match. If passwords match,
 * return true. Otherwise, return false.
*/
function validatePasswords(pswd2, pswd3) {
  if (pswd2.value === pswd3.value) {
    return true;
  } else {
    return false;
  }
}

/*
 * Verify if the password length is at least 8 characters. If so, keep error message
 * hidden for the first password input field. Otherwise, display error message
 * stating length of password must be at least 8 characters.
*/
function passwordLength() {
  var pswd2 = document.getElementById("password2").value; //User's input in password field
  if (pswd2.length<8) { //If password is too short
    document.getElementsByClassName("password2-error")[0].classList.remove("hide");
    //Add another event listener for this input field
    document.querySelectorAll("INPUT[type='password']")[2].addEventListener("click",function(){passwordLength()});
  } else { //If password is sufficient length
    document.getElementsByClassName("password2-error")[0].classList.add("hide");
  }
}

/*
 * Change text display at top left of page to "Logout" from "Login/Signup",
 * and unhide my-accounts.html and my-lists.html pages from the navigation
 * menu.
*/
function displayLogout() {
  document.getElementById("login-text").innerHTML = "Logout";
  document.getElementById('my-account').style.display = "block";
  document.getElementById('my-lists').style.display = "block";
}

/*
 * Call the Canvas Confetti plugin to play a confetti animation that
 * distributes the confetti in a random formation, as determined by a call to
 * randomInRange(). To maintain accessibility, this confetti animation is
 * disabled for users that have set their devices to prefer reduced motion.
*/
function playConfetti() {
  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
    disableForReducedMotion: true
  });
}
//Random number assignment for use in playConfetti().
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
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
  //Event listener for signup form arrow icon
  document.getElementById("arrow-signup-form").addEventListener("click", showForm);
  //Event listener for login button
  document.getElementById("form-login-button").addEventListener("click", login);
  //Event listener for signup button
  document.getElementById("form-signup-button").addEventListener("click", signup);

  //Event listener for more confetti button
  document.getElementsByClassName("more-confetti")[0].addEventListener("click", playConfetti);
  //Event listener for first password input field in the signup form
  document.querySelectorAll("INPUT[type='password']")[2].addEventListener("click",function(){passwordLength()});
});
