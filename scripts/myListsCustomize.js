/*
* Javascript for the Customize Lists modal in my-lists.html.
*/

/*
 * Show or hide modal. If modal elements contains class 'hide', remove the class
 * 'hide' to show modal, otherwise add class 'hide' to hide the modal.
*/
 function showModal(listNum) {
  var element = document.getElementById(listNum);
  if (element.classList.contains("hide")){
    element.classList.remove("hide");
  } else {
    element.classList.add("hide");
  }
}

/*
 * Change the columns that are displayed in the tables based on the checkboxes
 * user has selected in the Customize Lists modal.
*/
function customize() {
  //Array of column classes
  const columns = ["table-address","table-city","table-date","table-listing",
  "table-sold","table-diff-dollar","table-diff-percent","table-status"];

  const deselectedColumns = []; //Initialize array for unselected checkboxes
  const selectedColumns = []; //Initialize array for selected checkboxes
  var uInputs = document.getElementsByClassName("columns-checkbox"); //Checkbox elements

  /*
   * Loop through all checkbox elements to check which checkboxes were selected.
   * Obtained from the following source code:
   * Author: Alligator.io
   * Code: https://alligator.io/js/push-pop-shift-unshift-array-methods/
  */
  for (var i=0;i<uInputs.length;i++) {

    // If user unchecked checkbox, add column class to deselectedColumns array
    if (!uInputs[i].checked) {
      deselectedColumns.push(columns[i]);
    } else { // Else checkbox is checked, add column class to selectedColumns array
      selectedColumns.push(columns[i]);
    }
  }
  //For each element in deselectedColumns array, call addClass function
  for (var z=0; z < deselectedColumns.length; z++) {
    addClass(deselectedColumns[z]);
  }
  //For each element in selectedColumns array, call removeClass function
  for (var x=0; x < selectedColumns.length; x++) {
    removeClass(selectedColumns[x]);
  }
  /*
   * If user deselects all checkboxes, display error message and a border
   * around the checkbox selection area. Otherwise, hide error message and border.
   */
  if (selectedColumns.length === 0){
     document.getElementsByClassName("error-message")[0].classList.remove("hide");
  } else {
     document.getElementsByClassName("error-message")[0].classList.add("hide");
     showModal("modal-customize-view"); //Close modal
  }
}

/*
 * Take a class name as parameter. Locate all elements in my-lists.html
 * that match the class name, and add class "hide" to it. Obtained from
 * the following source code:
 * Author: James
 * Code: https://stackoverflow.com/a/42416476
*/
function addClass(myClass) {
  //Obtain all class elements that match parameter class name
  let els = document.querySelectorAll("."+myClass);
  //For each element that matched parameter name, add "hide" class
  els.forEach(function(el) {
    el.classList.add('hide');
  });
}

/*
 * Take a class name as parameter. Locate all elements in my-lists.html
 * that match the class name, and remove class "hide" from it. Obtained from
 * the following source code:
 * Author: James
 * Code: https://stackoverflow.com/a/42416476
*/
function removeClass(myClass) {
  //Obtain all class elements that match parameter class name
  let els = document.querySelectorAll("."+myClass);
  //For each element that matched parameter name, add "hide" class
  els.forEach(function(el) {
    el.classList.remove('hide');
  });
}

//Wait for page to load
window.addEventListener('load', function() {

  //Event listener for Customize View button, which opens Customize View modal
  document.getElementById("menu-customize-view").addEventListener("click", function (){showModal("modal-customize-view")});
  //Event listener for Close button in Customize View modal
  document.getElementById("customize-view-button").addEventListener("click", function (){customize()});

});
