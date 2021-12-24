/*
* Javascript for the Manage Lists modal in my-lists.html. This contains the
* following actions: sharing a list, printing a list, deleting a list and
* renaming a list. Note: sharing and printing an empty list is not a permitted
* action. This is indicated by not underling the share and print list link for
* an empty list, as well as displaying a disabled cursor when hovering over these
* links. If a user still attempts to print an empty list, they will print an
* empty page. If a user attempts to share an empty list, the Manage Lists modal
* will close.
*/

/*
 * Array objects containing the list name (or list id element) along with its
 * corresponding public URL. When users share their lists, the URL they share
 * will be taken from this array.
*/
let urls = [
  {name:"list1", url:"https://www.nbrealtyprices.com/public-493bvE2kE"},
  {name:"list2", url:"https://www.nbrealtyprices.com/public-543hgW1tY"}
];

var copyUrl = 0; //The url to be copied

/*
 * Show or hide modal. If modal elements contains class 'hide', remove the class
 * 'hide' to show modal, otherwise add class 'hide' to hide the modal.
 */
 function showModal(inputId) {
  var element = document.getElementById(inputId);
  if (element.classList.contains("hide")){
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

/*
 * Take the name of a list as parameter. Obtain the correct URL value from
 * the urls dataset, write it to HTML, and open Share Modal window.
*/
function shareList(listName){
  //Close current Manage Lists modal
  showModal("modal-manage-lists");

  //Locate url value associated with the listname in the array urls
  let element = urls.find(item => item.name === listName);
  copyUrl = element.url;

  //Add url name for this list to share modal HTML element
  document.getElementsByClassName("url-name")[0].innerHTML = copyUrl;

  //Display share modal
  document.getElementById("modal-share-lists").classList.remove("hide");
}

/*
 * Share modal that executes when user presses either Cancel or Copy in the
 * Share modal window. When user presses copy and the url is copied to their
 * clipboard successfully, then a success message will appear for 3 seconds,
 * before the Share modal is replaced by the previous Manage Lists modal.
 * Copying to clipboard function obtained from the following source code:
 * Author: Derek Wang
 * Code: https://stackoverflow.com/a/64422721
*/
function shareModal(choice){
  switch (choice) {
    case "cancel": //Close modal
        showModal("modal-share-lists");
        break;
    case "copy": //Copy URL to clipboard and then close modal
        if (navigator.clipboard) {
            navigator.clipboard.writeText(copyUrl).then(() => {

                //Show success message
                var successMsg = document.getElementsByClassName("success")[0];
                successMsg.classList.remove("hide");
                console.log('Copied to clipboard successfully.');

                //After 3 seconds, hide success message and close modal
                setTimeout(function(){
                      successMsg.classList.add("hide");
                      showModal("modal-share-lists");
                }, 3000);

            }, (err) => {
                console.log('Failed to copy the text to clipboard.', err);
            });
        } else if (window.clipboardData) {
            window.clipboardData.setData("Text", copyUrl);
            console.log("clipboardData");
        }
        break;
  }
  //Reopen previous Manage Lists modal
  showModal("modal-manage-lists");
}

/*
 * Take as parameter a list id element (ex. list1). Print the list specified
 * by this parameter value after hiding all other list names and contents
 * from the page. Once print has executed, re-display these hidden list names
 * and hide all list contents (as user must click "Show List" to display contents).
*/
function printList(listName){
  //Get the list name
  var inputListName = document.getElementById(listName).getElementsByTagName("H3")[0];
  //Get the list contents
  var inputListContent = document.getElementById(listName).getElementsByClassName("list-content")[0];

  //Get all list names
  var allListNames = document.getElementsByClassName("list-heading");
  //Get all list contents
  var allListContents = document.getElementsByClassName("list-content");

  //Loop through all list names
  for(var i=0;i<allListNames.length;i++) {
    //If list name is the same as the input value, then display both name and contents
    if (allListNames[i].textContent === inputListName.textContent) {
      allListNames[i].style.display = "block";
      allListContents[i].classList.remove("hide");
    } else { //Else hide list name and contents
      allListNames[i].style.display = "none";
      allListContents[i].classList.add("hide");
    }
  }
  window.print(); //Call print

  //Reset all lists to display list header names and hide list contents
  for(var j=0;j<allListNames.length;j++){
    allListNames[j].style.display = "block";
    allListContents[j].classList.add("hide");
  }
}

/*
 * Take as parameter a list id element. Display prompt window asking user to
 * input new list name. If user does not leave field blank, then replace
 * previous name with new name. If user does leave field blank, exit modal
 * without replacing name.
 */
function renameList(listName){

  //Open prompt window with user input
  var newName = prompt("Please enter new name", "Enter new name...");

  switch(newName) {
    case null: //User pressed cancel
        break;
    case "": //User left field blank
      break;
    case "Enter new name...": //User left field blank
        break;
    default:
        //Get previous list name
        var prevName = document.getElementById(listName).textContent;

        //Add new name to inner HTML
        document.getElementById(listName).innerHTML = newName;

        //Get all list names
        var allLists = document.getElementsByClassName("manage-list-name");

        /*
         * Loop through all list names until an array element value matches the
         * previous list name. When this occurs, add new name at this array location
         * and exit loop.
         */
        for (var i=0;i<allLists.length;i++) {
          if (allLists[i].textContent === prevName) {
            allLists[i].innerHTML = newName;
            break;
          }
        }
        break;
  }
}

/*
 * Take as parameter a list id element that is to be deleted. Display confirmation
 * window asking user to confirm if they want to delete the list. If they press
 * "Ok" then remove list name element from both the HTML and Manage Lists modal.
 * If list is now empty, display message that there are no lists to display.
 */
function deleteList(listName){
  //Open confirmation window
  var a = confirm("Are you sure you want to delete this list?");
  //If user presses "Ok"
  if (a == true) {
    document.getElementById(listName).remove(); // Remove from HTML
    document.getElementById('manage-'+listName).remove(); //Remove from Manage Lists modal
  }
  //If there are currently no lists, hide "There are no lists to display" statements
  if(document.getElementsByClassName("list-element").length === 0) {
    //Hide 'no lists' statement in Manage Lists modal
    document.getElementsByClassName("no-lists")[0].classList.remove("hide");
    //Hide 'no lists' statement on the My Lists page
    document.getElementsByClassName("no-lists")[1].classList.remove("hide");
  }
}

//Wait for page to load
window.addEventListener('load', function() {
  //Event listener for Manage Lists navigation bar button, opening its modal window
  document.getElementById("menu-manage-lists").addEventListener("click", function (){showModal("modal-manage-lists")});
  //Event listener for Close button in Manage Lists modal window
  document.getElementById("manage-list-button").addEventListener("click", function (){showModal("modal-manage-lists")});

  //Event listeners for list1: rename, share, print, and delete
  document.getElementById("rename-list1").addEventListener("click", function(){renameList("list1-heading-name")});
  document.getElementById("share-list1").addEventListener("click", function(){shareList("list1")});
  document.getElementById("print-list1").addEventListener("click", function(){printList("list1")});
  document.getElementById("delete-list1").addEventListener("click", function(){deleteList("list1")});

  //Event listeners for list2: rename, share, print, and delete
  document.getElementById("rename-list2").addEventListener("click", function(){renameList("list2-heading-name")});
  document.getElementById("share-list2").addEventListener("click", function(){shareList("list2")});
  document.getElementById("print-list2").addEventListener("click", function(){printList("list2")});
  document.getElementById("delete-list2").addEventListener("click", function(){deleteList("list2")});

  //Event listener for Cancel button in Share List modal window
  document.getElementById("modal-cancel-button").addEventListener("click", function (){shareModal("cancel")});
  //Event listener for Copy button in Share List modal window
  document.getElementById("modal-copy-button").addEventListener("click", function (){shareModal("copy")});
});
