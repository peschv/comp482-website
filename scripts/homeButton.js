/*
* Javascript for menu icon button animation on home.html. The goal of the animation is
* to obtain the user's attention so that they know where the menu feature is
* located. If the user has not clicked on the menu within 10 seconds of navigating
* to the page, then the animation is triggered. The assumption being that the user
* may not realize where to click for the menu if they have not located it within
* the 10 second timeframe.
*
* Source code for timer: https://stackoverflow.com/a/47637179
*/

//Starts timer. If user doesn't press menu icon for 10 seconds, call notPressed function.
var btnTimer = window.setTimeout(notPressed,10000);

/*
 * When menu button has not be pressed in the given window of time defined by
 * btnTimer, then re-animate menu icon and display text below the menu icon
 * telling user to click the icon to view the menu. This text is also initally
 * animated to draw the user's attention.
*/
function notPressed() {

  //Remove previous animation, and add new animation
  document.getElementById("menu-icon").classList.remove("animate__swing");
  document.getElementById("menu-icon").classList.add("animate__tada");

  //Display and animate text telling user to click on icon above for the menu
  document.getElementById("click-menu").classList.remove("hide");
  document.getElementById("click-menu").classList.add("animate__backInUp");
}

//If menu button is pressed, remove timer
function pressed() {
  clearTimeout(btnTimer);
}

//Wait for page to load, then add event listener for opening menu
window.addEventListener('load', function() {
  document.getElementById("menu-icon").addEventListener("click", pressed);
});
