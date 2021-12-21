/*
 * Javascript for obtaining user's login status. If the user is determined to
 * be logged in, then display "Logout" text at top left of page and display the
 * my-accounts.html and my-lists.html pages in the navigation menu list.
 * Otherwise, have the text at top left display "Login/Logout" and hide the
 * my-accounts.html and my-lists.html pages.
 * Only an event listener was added for "Logout", as when the text is
 * displaying "Login/Signup" and is clicked on, the user will be simply
 * redirected to the login.html page.
 * When user clicks "Logout", they will be redirected to the homepage.
*/

/*
 * Log user out of website, call displayLoginSign() to change the text at top
 * left corner of page to "Login/Signup" from "Logout" and automatically
 * redirect user to the homepage.
 */
function logout() {
  //Only proceed if user is logged in
  if (localStorage.getItem('logged-in') === "true") {
    displayLoginSignup(); //Replace "Logout" text with "Login/Signup"
    window.location.replace("home.html"); //Redirect user to homepage
  }
}

/*
 * Change text display at top left of page to "Login/Signup" from "Logout",
 * hide my-account.html and my-lists.html pages in navigation menu, and set
 * localStorage 'logged-in' to false.
*/
function displayLoginSignup() {
  localStorage.setItem('logged-in', 'false');
  document.getElementById("login-text").innerHTML = "Login/Signup";
  document.getElementById('my-account').style.display = "none";
  document.getElementById('my-lists').style.display = "none";
}

/*
 * Change text display at top left of page to "Logout" from "Login/Signup",
 * and unhide my-accounts.html and my-lists.html pages from the navigation
 * menu.
 * Note: localStorage 'logged-in' will have been set to 'true' in loginPage.js
 * when user logged in.
*/
function displayLogout() {
  document.getElementById("login-text").innerHTML = "Logout";
  document.getElementById('my-account').style.display = "block";
  document.getElementById('my-lists').style.display = "block";
}

//Wait for page to load, then add event listener for logout button
window.addEventListener('load', function() {
  document.getElementById("login-text").addEventListener("click", logout);
});

/*
 * Once all elements have loaded, check if user has already logged into
 * the website. If user is logged in, call displayLogout() otherwise call
 * displayLoginSignup().
*/
window.onload = function(){
  localStorage.setItem('logged-in', 'false');
  console.log("VALUE:"+localStorage.getItem('logged-in'));
  if(localStorage.getItem('logged-in') === 'true') { //If user logged in
    displayLogout();
  } else { //If user not logged in
    displayLoginSignup();
  }
};
