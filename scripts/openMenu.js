/*
 * JavaScript for navigation menu.
 * The menu is represented by a hamburger style icon in the top right corner
 * of the page. When clicked, a vertical site menu appears. To close the
 * menu, user clicks on the icon a second time, selects the "X" button from
 * the  menu, or selects any other page from the menu.
 */

/*
 * Opens menu if the menu was hidden, otherwise closes menu if the 'X' button
 * or menu icon is clicked.
 */
function openCloseMenu() {
  var element = document.getElementsByClassName("menu");
  //If menu is currently displayed, then hide it
  if (element[0].style.display == "block") {
    element[0].style.display = "none"
  } else { //Else display menu
    element[0].style.display = "block";
    // Add event listener for closing menu
    document.getElementById("close").addEventListener("click", openCloseMenu);
  }
}

// Wait for page to load
window.addEventListener('load', function() {
  //Event listener for opening menu
  document.getElementById("menu-icon").addEventListener("click", openCloseMenu);
});
