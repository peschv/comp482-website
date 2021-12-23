/*
 * Javascript for my-lists.html for the following actions: showing list contents,
 * checking if a list is empty, deleting items from lists, deselecting items
 * from lists, and adding a new list (which is a function in the central
 * navigation menu, along with Manage Lists which is handled in myListsManage.js
 * and Customize View which is handled in myListsCustomize.js).
*/

/*
 * Take as parameter a list id element. If list contents are hidden, make
 * them visible and transform arrow icon to point down. Otherwise, hide list contents
 * and transform arrow icon to point right.
*/
function showList(listNum) {
  var element = document.getElementById(listNum).getElementsByClassName("list-content")[0];
  var icon = document.getElementById(listNum).getElementsByClassName("show-button")[0];

  //If list contents are hidden
  if (element.classList.contains("hide")){
    element.classList.remove("hide");
    //Rotate icon to down arrow
    icon.style.transform = 'rotate(90deg)';
  } else { //Else if list contents are displayed
    element.classList.add("hide");
    //Rotate icon to right arrow
    icon.style.transform = 'rotate(0deg)';
  }
  //Check if list is empty
  isListEmpty(listNum);
}

/*
 * Take as parameter a list id element (ex. list1). Loop through table in said
 * list, and if table does not contain rows (i.e. is empty), then display
 * message that table is empty.
*/
function isListEmpty(listNum){
  //Obtain table element
  var table = document.getElementById(listNum).getElementsByTagName("TABLE")[0];
  if (table.rows.length === 0) { //If table is empty
    var x = document.createElement('P');
    var xText = document.createTextNode("This list is empty.");
    x.appendChild(xText);
    table.appendChild(x);
  }
}

/*
 * Take as parameter table id element from which one wishes to delete items.
 * Display confirmation box asking user if they want to delete items. If user
 * presses 'Ok', then check which checkboxes were selected and delete those rows.
 * Obtained from the following source code:
 * Author: Angel Politis
 * Code: https://stackoverflow.com/a/57636139
*/
function deleteItems(tableName){
  var x = confirm("Are you sure you want to delete these items?");
  if (x == true) {
    const table = document.getElementById(tableName);

    /* Create the index used in the loop. */
    var index = 1;

    //Check which checkboxes were selected and remove these items
    /* Repeat as long as the index is less than the number of rows. */
    while (index < table.rows.length) {
      /* Get the input of the cell. */
      var input = table.rows[index].cells[0].children[0];
      /* Check whether the input exists and is checked. */
      if (input && input.checked) {
        /* Delete the row at the current index. */
        table.deleteRow(index);
      } else {
        /* Increment the index. */
        index++;
      }
    }
  }
}

/*
 * Take as parameter the table id element (ex. table1). Loop through all
 * checkboxes in this table, and deselect any checkboxes that were selected.
*/
function deselectItems(tableName){
  //All checkboxes for the given table
  var checkboxes = document.getElementById(tableName).getElementsByClassName("checkbox");

  for (var i=0;i<checkboxes.length;i++) {
    //If checkbox is selected, then deselect it
    if (checkboxes[i].checked) {
      checkboxes[i].checked = false;
    }
  }
}

/*
 * Prompt user to add a new list name in the input field. If name is valid,
 * then add new list name to the page along with relevant elements and
 * attributes. New list name also added to Manage Lists modal. New list has a
 * table that is empty by default.
 * If use leaves the new list name blank or null, prompt window will exit
 * without adding a new list.
*/
function addList(){
  //Prompt user to add a name for the new list
  var listName = prompt("Please enter name of new list:", "Enter list name...");

  switch(listName) {
    case null: //User pressed cancel
        break;
    case "Enter list name...": //User left field blank, do nothing
        break;
    default: //Add new list
        //If there are currently no lists, hide "There are no lists to display" statements
        if(document.getElementsByClassName("list-element").length === 0) {
          //Hide 'no lists' statement in Manage Lists modal
          document.getElementsByClassName("no-lists")[0].classList.add("hide");
          //Hide 'no lists' statement on the My Lists page
          document.getElementsByClassName("no-lists")[1].classList.add("hide");
        }
        //Get the number of lists
        var numOfLists = document.getElementsByClassName("list-element").length;
        //Create new list id name, following format of 'list + number'
        var newListId = 'list'+(numOfLists+1);

        //Create list-element container to hold the list on My Lists page
        var div1 = document.createElement('DIV');
        div1.classList.add("list-element");
        div1.setAttribute("id", newListId);
        var element1 = document.getElementById("all-lists");
        element1.appendChild(div1);

        //Create container for list heading that holds list name and show list buttons
        var div2 = document.createElement('DIV');
        div2.classList.add("list-heading-container");
        div2.setAttribute("id",newListId+"-heading-container");
        var element2 = document.getElementById(newListId);
        element2.appendChild(div2);

        //Create header element that states the list's name
        var header = document.createElement('H3');
        var headerText = document.createTextNode(listName);
        header.appendChild(headerText)
        header.classList.add("list-heading");
        header.setAttribute("id",newListId+"-heading-name");
        var element3 = document.getElementById(newListId+"-heading-container");
        element3.appendChild(header);

        //Create container for 'Show List' buttons for this list
        var div3 = document.createElement('DIV');
        div3.classList.add("list-buttons");
        div3.setAttribute("id",newListId+"-buttons");
        //Add event listener for the show list container
        div3.addEventListener("click", function(){showList(newListId);});
        element3.appendChild(div3);

        //Create text element that states "Show List" for this list
        var showListElement = document.createElement('A');
        var showListText = document.createTextNode("Show List");
        showListElement.appendChild(showListText);
        showListElement.classList.add("show-text");
        showListElement.setAttribute("id","show-"+newListId+"-text");
        var element4 = document.getElementById(newListId+"-buttons");
        element4.appendChild(showListElement);

        //Create img arrow icon element located beside "Show List" text
        var showButton = document.createElement('IMG');
        showButton.classList.add("icon");
        showButton.classList.add("show-button");
        showButton.setAttribute("id","show-"+newListId+"-button")
        showButton.setAttribute("src","./images/right-arrow.png");
        showButton.setAttribute("alt","Show");
        element4.appendChild(showButton);

        //Create container to hold the list's contents
        var div4 = document.createElement('DIV');
        div4.classList.add("list-content");
        div4.classList.add("hide");
        div4.setAttribute("id",newListId+"-content");
        element2.appendChild(div4); //Append to id newListId, declared above as element2

        //Create table element that will display the listings in this list
        var table = document.createElement('TABLE');
        table.setAttribute("id","table"+(numOfLists+1));
        var element5 = document.getElementById(newListId+"-content");
        element5.appendChild(table);

        //In the Manage Lists modal, create a list container for this new list
        var newUl = document.createElement('UL');
        newUl.classList.add("manage-list");
        newUl.setAttribute("id","manage-"+newListId);
        var element6 = document.getElementsByClassName("modal-content-lists")[0];
        element6.appendChild(newUl);

        //In Manage Lists modal, create list name element for the new list
        var li1 = document.createElement('LI');
        var li1Text = document.createTextNode(listName);
        li1.appendChild(li1Text);
        li1.classList.add("manage-list-name");
        var element7 = document.getElementById("manage-"+newListId);
        element7.appendChild(li1);

        //In Manage Lists modal, add "Share List" link for the new list
        var li2 = document.createElement('LI');
        var li2A = document.createElement('A');
        var li2AText = document.createTextNode("Share List");
        li2A.appendChild(li2AText);
        li2A.classList.add("manage-list-actions");
        li2A.classList.add("share-list");
        li2A.classList.add("empty");
        li2A.setAttribute("id","share-"+newListId);
        li2.appendChild(li2A);
        element7.appendChild(li2);

        //In Manage Lists modal, create "Print List" link for the new list
        var li3 = document.createElement('LI');
        var li3A = document.createElement('A');
        var li3AText = document.createTextNode("Print List");
        li3A.appendChild(li3AText);
        li3A.classList.add("manage-list-actions");
        li3A.classList.add("print-list");
        li3A.classList.add("empty");
        li3A.setAttribute("id","print-"+newListId);
        li3.appendChild(li3A);
        element7.appendChild(li3);

        //In Manage Lists modal, create "Rename List" link for the new list
        var li4 = document.createElement('LI');
        var li4A = document.createElement('A');
        var li4AText = document.createTextNode("Rename List");
        li4A.appendChild(li4AText);
        li4A.classList.add("manage-list-actions");
        li4A.classList.add("rename-list");
        li4A.setAttribute("id","rename-"+newListId);
        li4.appendChild(li4A);
        element7.appendChild(li4);

        //In Manage Lists modal, create "Delete List" link for the new list
        var li5 = document.createElement('LI');
        var li5A = document.createElement('A');
        var li5AText = document.createTextNode("Delete List");
        li5A.appendChild(li5AText);
        li5A.classList.add("manage-list-actions");
        li5A.classList.add("delete-list");
        li5A.setAttribute("id","delete-"+newListId);
        li5.appendChild(li5A);
        element7.appendChild(li5);

        //In Manage Lists modal, create event listeners for rename, share, print, and delete links
        document.getElementById("rename-"+newListId).addEventListener("click", function(){renameList(newListId+"-heading-name")});
        document.getElementById("share-"+newListId).addEventListener("click", function(){shareList(newListId)});
        document.getElementById("print-"+newListId).addEventListener("click", function(){printList(newListId)});
        document.getElementById("delete-"+newListId).addEventListener("click", function(){deleteList(newListId)});
        break;
  }
}

//Wait for page to load
window.addEventListener('load', function() {

  //Event listeneter for Add New List button in navigation bar
  document.getElementById("menu-new-list").addEventListener("click", addList);

  //Event listeners for Deselect All buttons at the bottom of each table
  document.getElementById("list1-deselect-all").addEventListener("click", function(){deselectItems("table1")});
  document.getElementById("list2-deselect-all").addEventListener("click", function(){deselectItems("table2")});

  //Event listeners for Delete Selected Items buttons at bottom of each table
  document.getElementById("list1-delete").addEventListener("click", function (){deleteItems("table1")});
  document.getElementById("list2-delete").addEventListener("click", function (){deleteItems("table2")});

  //Event listeners for Show List buttons that displays each list's contents
  document.getElementById("list1-buttons").addEventListener("click", function (){showList("list1")});
  document.getElementById("list2-buttons").addEventListener("click", function (){showList("list2")});

});
