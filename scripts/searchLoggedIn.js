/*
* Javascript for searchListings.html when user is logged in.
* Allows users to add listings to custom lists.
*/

// Boolean flag used by modalChoice() to indicate if user added a new list
var isNewList = false;

/*
 * Show or hide modal. If modal elements contains class 'hide', remove the class
 * 'hide' to show modal, otherwise add class 'hide' to hide the modal.
 */
 function showModal() {
  //Obtain modal element
  var element = document.getElementsByClassName("modal")[0];

  if (element.classList.contains("hide")){
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

/*
* When user clicks Add Selected button and has selected at least one checkbox,
* open modal that allows them to choose which list to add the items to. If user
* failed to select a checkbox, then display alert error message.
*/
function addSelected(){

  //Boolean flag to determine if user has checked at least one checkbox
  var selectionMade = false;

  //Get all checkboxes
  var uInputs = document.getElementById("table-body").getElementsByClassName("checkbox");

  //Loop through all checkboxes until the end or until one checked checkbox is located
  for (var i=0;i<uInputs.length;i++) {
    //If user checked a checkbox
    if (uInputs[i].checked) {
      selectionMade = true; //Change to true to indicate user selected a checkbox
      break; //Exit the loop
    }
  }
  //If selectionMade is true, indicating a checkbox was selected, then show modal
  if (selectionMade) {
    showModal();
  } else { //Else display error alert that user must select at least one checkbox
    alert("ERROR: Please select at least one checkbox from the first column above and try again.");
  }
}

/*
 * When user clicks Select All button, select all checkboxes in the table.
 */
function selectAll(){
  //Get all checkboxes
  var uInputs = document.getElementById("table-body").getElementsByClassName("checkbox");

  // For each checkbox, if checkbox is not selected, then select it.
  for (var i=0;i<uInputs.length;i++) {
    if (!uInputs[i].checked) {
      uInputs[i].checked = true;
    }
  }
}

/*
 * When user clicks Deselect All button, deselect any selected checkboxes in
 * the table.
 */
function deselectAll(){
  //Get all checkboxes
  var uInputs = document.getElementById("table-body").getElementsByClassName("checkbox");

  //For each checkbox, if checkbox is selected, then deselect it.
  for (var i=0;i<uInputs.length;i++) {
    if (uInputs[i].checked) {
      uInputs[i].checked = false;
    }
  }
}

/*
 * Take as parameter the choice user made in the modal window. There are only
 * two possible values for this choice: "cancel" and "add". "Cancel" calls
 * showModal() to close the modal window. "Add" will add the user's selected
 * rows to either a pre-existing list or a new list, following by deselecting
 * all checkboxes, closing the modal and displaying a success alert message.
 * If user adds a new list, it is first verified if the new list name input is
 * valid (i.e. was not left blank), and then adds the relevant HTML elements to
 * to the page for this new list.
 */
function modalChoice(choice){
  //Check if user pressed "Cancel" or "Add" in the modal window
  switch (choice) {
    case "cancel":
        showModal(); //Close modal
        break;
    case "add":
        //User adds items to an existing list
        if (!isNewList) {
          deselectAll(); //Deselect all checkboxes
          showModal(); //Close modal
          alert("Items were added to your list"); //Display success alert message
          break;
        //User adds new list but leaves new list name input field blank
        } else if (isNewList && document.getElementsByClassName("new-list")[0].value === ""){
          //Display alert error message
          alert("You have left the list name field blank. Please enter a list name or select from the list options");
          break;
        //User adds new list
        } else if (isNewList) {

          /*
           * Get last list element that simply contains the "Add New List..." text
           * prompt, and temporarily remove it. It will be readded to the bottom
           * of the list elements once the user's new list element has been appended.
           */
          var lastList = document.getElementsByClassName("add-new-list")[0];
          document.getElementById("list-selector").removeChild(lastList);

          //Obtain the value that the user entered in the input field
          var listName = document.getElementsByClassName("new-list")[0].value;
          var newList = document.createElement("option"); //Create a new list element
          var numOfLists = document.getElementsByClassName("list-option").length;

          //Set new list attributes
          newList.setAttribute("value", "list"+(numOfLists+1));
          newList.setAttribute("name", listName);
          newList.setAttribute("class","list-option");
          newList.innerText = listName;

          //Append the newly created list
          document.getElementById("list-selector").appendChild(newList);
          //Append the previously removed last list element that allows user to add a new list
          document.getElementById("list-selector").appendChild(lastList);
          //Remove input field from the modal
          document.getElementsByClassName("new-list")[0].remove();

          //Default to showing the first option when modal is re-opened
          document.getElementById("list-selector").selectedIndex = "0";
          isNewList = false; //Reset to indicate the new list was added to the lists
          deselectAll(); //Deselect all checkboxes
          showModal(); //Close modal
          alert("Items were added to your list"); //Display success alert message
          break;
        //An error occurred, display error message
        } else {
          console.log("There was an error adding items to list");
          break;
        }
    }
}

/*Opens an input field in the "Add Selected Items" modal window allowing user
*to add a new list.
*Source code: https://stackoverflow.com/a/52162172
*/
function addInput(){
  isNewList = true;
  var modal = document.getElementById("modal-lists");
  var newList = document.createElement("input");
  newList.setAttribute("type", "text");
  newList.setAttribute("name", "new");
  newList.classList.add("new-list");
  modal.appendChild(newList);
}

/*
 * For logged in users, make 'Go back to My Lists' link element visible.
 * Otherwise, keep this element hidden.
 */
function goBackVisibility(){
  if (localStorage.getItem('logged-in') === "true"){
    document.getElementsByClassName("go-back")[0].classList.remove("hide");
  } else {
    document.getElementsByClassName("go-back")[0].classList.add("hide");
  }
}

//Event listeners for when user is logged in
window.addEventListener('load', function() {
  //Check if user is logged in, then display Go Back icon
  goBackVisibility();
  //Event listener for Add Selected table button
  document.getElementById("add-selected").addEventListener("click",addSelected);
  //Event listener for Select All table button
  document.getElementById("select-all").addEventListener("click",selectAll);
  //Event listener for Deselect All table button
  document.getElementById("deselect-all").addEventListener("click",deselectAll);

  //Event listener for Cancel button in modal window
  document.getElementById("modal-cancel-button").addEventListener("click",function(){modalChoice("cancel")});
  //Event listener for Add button in modal window
  document.getElementById("modal-add-button").addEventListener("click",function(){modalChoice("add")});
  //Event listener for Add New List selection from the modal window dropdown menu
  document.querySelectorAll('option[value="newlist"]')[0].addEventListener("click",addInput);

});
