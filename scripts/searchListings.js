/*
* Javascript for generating and searching through data table containing
* listings on search-listings.html. This table implements TableSorter plugin to
* create and style the table.
*/

/*
 * The dataset that populates the table. Each object in the array contains 8
 * properties: address, city, date, listing, sold, dollar, percent, status.
 * These properties correspond to a given house's street number and name, city
 * the house is located in, the date the house was sold, the listing price, the
 * sold price, the difference between the listing and sold price as a dollar
 * amount, the difference between the listing and sold price as a percentage,
 * and the status (i.e. if the house was sold under, over or at the asking/listing
 * price. This means the status property only has 3 possible values: At Asking,
 * Over-Asking, Under-Asking).
 */
let dataset = [
    { address:"18 Water St",city:"Miramichi",date:"2020-01-02",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"203 John St",city:"Miramichi",date:"2021-09-05",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"1923 Main St",city:"Saint John",date:"2020-11-13",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"63 Waterview Ave",city:"Bathurst",date:"2021-04-29",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"4 Walnut Cres",city:"Bathurst",date:"2020-08-18",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"923 Queen St",city:"Moncton",date:"2019-03-26",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"50 Duke St",city:"Moncton",date:"2020-12-30",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"1823 Pleasant St",city:"Fredericton",date:"2020-06-19",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"832 Oak Cres",city:"Saint John",date:"2020-07-01",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"318 Jane St",city:"Miramichi",date:"2021-05-13",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"749 McDonald Rd",city:"Miramichi",date:"2021-11-07",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"6 Honey St",city:"Miramichi",date:"2021-10-04",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"68 Ford St",city:"Bathurst",date:"2018-11-12",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"3345 Comeau St",city:"Miramichi",date:"2021-01-25",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"805 River St",city:"Saint John",date:"2021-09-09",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"698 Kingston Ave",city:"Fredericton",date:"2018-02-06",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"2309 Knox St",city:"Bathurst",date:"2020-07-17",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"34 King St",city:"Saint John",date:"2019-09-26",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"9439 Main St",city:"Moncton",date:"2019-10-30",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"5 Frost St",city:"Moncton",date:"2018-03-27",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"93 Winnipeg Cres",city:"Saint John",date:"2020-05-08",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"1490 Duke St",city:"Fredericton",date:"2021-03-22",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"2 Waverly Rd",city:"Miramichi",date:"2018-12-13",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"297 Pine St",city:"Fredericton",date:"2019-10-01",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"439 Queen St",city:"Fredericton",date:"2018-07-19",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"2083 King St",city:"Fredericton",date:"2021-04-20",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"39 Winston St",city:"Saint John",date:"2021-08-03",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"798 Mountain Rd",city:"Moncton",date:"2020-10-14",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"902 Beech St",city:"Fredericton",date:"2020-12-28",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"585 Ross St",city:"Saint John",date:"2019-06-22",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"75 Duke St",city:"Moncton",date:"2019-11-03",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"39 Pleasant St",city:"Moncton",date:"2018-11-20",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"878 Birch St",city:"Saint John",date:"2020-01-03",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"40 Tulip St",city:"Moncton",date:"2021-08-21",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"9 Murray Rd",city:"Miramichi",date:"2018-08-07",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"321 McCoombs St",city:"Fredericton",date:"2019-05-25",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"765 Harper Rd",city:"Moncton",date:"2020-05-22",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"2390 Harvey Rd",city:"Fredericton",date:"2021-07-17",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"22 Cunard St",city:"Miramichi",date:"2020-09-23",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"984 Dawson St",city:"Moncton",date:"2020-12-15",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"668 Victoria Ave",city:"Fredericton",date:"2020-02-17",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"2167 Howard St",city:"Saint John",date:"2021-05-21",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"1485 Henderson St",city:"Moncton",date:"2019-07-30",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"3854 Mountain Rd",city:"Moncton",date:"2018-04-02",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"11 Snowball Ave",city:"Saint John",date:"2020-09-04",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"5392 Champlain St",city:"Moncton",date:"2021-01-12",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"43 Riverside Dr",city:"Miramichi",date:"2018-06-26",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"672 Manse St",city:"Fredericton",date:"2019-03-15",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"18 Stanley Rd",city:"Moncton",date:"2018-03-03",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"203 Simcoe Rd",city:"Fredericton",date:"2021-10-06",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"193 Smythe St",city:"Miramichi",date:"2020-06-24",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"63 Oxford St",city:"Moncton",date:"2020-08-11",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"4 Elgin St",city:"Fredericton",date:"2020-05-22",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"923 York St",city:"Saint John",date:"2019-06-28",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"50 Wright St",city:"Moncton",date:"2019-01-20",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"1823 Albert Rd",city:"Moncton",date:"2020-09-28",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"832 Lobban Ave",city:"Saint John",date:"2020-11-30",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"318 Hannah Rd",city:"Moncton",date:"2021-11-11",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"749 Palmer Dr",city:"Miramichi",date:"2018-04-18",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"6 Reid St",city:"Fredericton",date:"2019-03-22",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"59 Kerr St",city:"Moncton",date:"2018-02-05",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"2498 Wellington Rd",city:"Fredericton",date:"2021-10-24",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"846 Church St",city:"Miramichi",date:"2019-09-26",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"9597 Park Dr",city:"Moncton",date:"2020-01-28",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"319 Tweedie St",city:"Fredericton",date:"2020-12-02",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"48 Winslow St",city:"Saint John",date:"2019-12-09",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"832 Nickel Rd",city:"Moncton",date:"2019-11-18",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"13 Cassidy St",city:"Moncton",date:"2018-06-30",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"742 Hickey St",city:"Saint John",date:"2020-06-21",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"4189 Wood St",city:"Moncton",date:"2021-05-05",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"51 Mersereau Rd",city:"Miramichi",date:"2018-05-14",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"72 Gordon Rd",city:"Fredericton",date:"2019-11-26",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"77 Flam St",city:"Moncton",date:"2020-05-30",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"1328 Wellington Rd",city:"Fredericton",date:"2021-05-28",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"110 Sickles St",city:"Miramichi",date:"2019-04-08",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"83 Desmond Dr",city:"Moncton",date:"2020-08-09",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"283 McIntosh St",city:"Fredericton",date:"2020-12-08",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"223 Brad St",city:"Saint John",date:"2021-07-26",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"80 Edgewood Dr",city:"Moncton",date:"2019-03-30",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"438 Cedarwood Dr",city:"Moncton",date:"2018-05-19",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"832 Fenton St",city:"Saint John",date:"2020-01-01",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"418 Lebreton St",city:"Moncton",date:"2021-09-13",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"79 Bremner Dr",city:"Miramichi",date:"2018-10-09",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"66 Archer Rd",city:"Fredericton",date:"2019-12-04",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"978 Murdock Rd",city:"Moncton",date:"2018-07-13",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"513 James St",city:"Fredericton",date:"2021-10-15",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"43 Blance St",city:"Miramichi",date:"2019-02-12",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"3 Radio Dr",city:"Moncton",date:"2020-12-12",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"65 Petrie St",city:"Fredericton",date:"2020-12-03",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"93 Edward St",city:"Saint John",date:"2021-05-20",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"750 Smith Ave",city:"Moncton",date:"2019-09-08",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"223 Sweeney Ln",city:"Moncton",date:"2020-06-19",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"472 Miller Ave",city:"Saint John",date:"2020-02-07",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"1238 Kingston Ave",city:"Moncton",date:"2021-08-10",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"83 Aiken Dr",city:"Miramichi",date:"2018-11-10",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"68 McWilliam Dr",city:"Fredericton",date:"2020-02-17",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"},

    { address:"54 Beaumont Ave",city:"Moncton",date:"2020-04-18",listing: "150,000",sold: "120,000",dollar:"30,000",percent:"22.2%",status:"Under-Asking"},
    { address:"33 Uplands Ave",city:"Fredericton",date:"2021-06-08",listing:"290,000",sold:"300,000",dollar:"10,000",percent:"3.4%",status:"Over-Asking"},
    { address:"643 Hillside Dr",city:"Miramichi",date:"2020-07-19",listing:"80,000",sold:"100,000",dollar:"20,000",percent:"22.2%",status:"Over-Asking"},
    { address:"80 Manderson Dr",city:"Moncton",date:"2018-07-16",listing:"330,000",sold:"330,000",dollar:"0",percent:"0%",status:"At Asking"},
    { address:"24 Gremley Rd",city:"Fredericton",date:"2020-05-15",listing:"450,000",sold:"400,000",dollar:"50,000",percent:"11.8%",status:"Under-Asking"},
    { address:"211 Flynn St",city:"Saint John",date:"2019-05-29",listing:"300,000",sold:"230,000",dollar:"70,000",percent:"26.4%",status:"Under-Asking"},
    { address:"98 Dolan Ave",city:"Moncton",date:"2019-03-13",listing:"210,000",sold:"270,000",dollar:"60,000",percent:"25%",status:"Over-Asking"},
    { address:"493 Sunnyside Ave",city:"Moncton",date:"2020-08-18",listing:"140,000",sold:"160,000",dollar:"20,000",percent:"13.3%",status:"Over-Asking"},
    { address:"72 Hachey St",city:"Saint John",date:"2020-08-28",listing:"190,000",sold:"200,000",dollar:"10,000",percent:"5.1%",status:"Over-Asking"},
    { address:"3418 Railway St",city:"Moncton",date:"2021-07-10",listing:"160,000",sold:"145,000",dollar:"15,000",percent:"9.8%",status:"Under-Asking"},
    { address:"89 Hamilton St",city:"Bathurst",date:"2018-12-20",listing:"160,000",sold:"140,000",dollar:"20,000",percent:"13.3%",status:"Under-Asking"},
    { address:"56 Lawlor Ln",city:"Fredericton",date:"2019-06-20",listing:"120,000",sold:"150,000",dollar:"30,000",percent:"22.2%",status:"Over-Asking"}
];

/*
 * Create table cells and populate these cells with the relevant property
 * values from dataset array. Appends to HTML.
 */
function loadTableData() {

  var tableBody = document.getElementById("table-body"); //Table element

  //Create table rows and populate cells with dataset elements
  for(var i = 0;i < dataset.length; i++){
    tableBody+= '<tr class="table-entry">';
    tableBody+= '<td class="table-input"><input type="checkbox" class="checkbox" value=i/></td>';
    tableBody+= '<td class="table-data table-address">' + dataset[i].address + '</td>';
    tableBody+= '<td class="table-data table-city">' + dataset[i].city + '</td>';
    tableBody+= '<td class="table-data table-date">' + dataset[i].date + '</td>';
    tableBody+= '<td class="table-data table-listing">' + dataset[i].listing + '</td>';
    tableBody+= '<td class="table-data table-sold">' + dataset[i].sold + '</td>';
    tableBody+= '<td class="table-data table-diff-dollar">' + dataset[i].dollar + '</td>';
    tableBody+= '<td class="table-data table-diff-percent">' + dataset[i].percent + '</td>';
    tableBody+= '<td class="table-data table-status">' + dataset[i].status + '</td>';
    tableBody+= '</tr>';
  }

  /*Create an error row that tells user no entries match the search criteria
  *Hide this row by default by adding class hide.
  */
  tableBody+= '<tr id="last-entry" class="hide">';
  tableBody+= '<td>' + "There are no matching entries" + '</td>';
  tableBody+= '</tr>';

  //Update the HTML
  document.getElementById('table-body').innerHTML = tableBody;

  //Workaround to remove first element in the table, which is an HTML object
  let allRows = document.getElementById("table-body");
  allRows.removeChild(allRows.childNodes[0]);
}

/*
 * Determine which rows to show or hide based on parameter values. This function
 * is called by submitForm() when user presses "search".
 * The parameter is an object containing two values of property city and date.
 * For example, if user selects city: Miramichi, date: 2018, the parameter
 * value is (Miramichi,2018).
 * This function searches the city and date columns of the table to obtain the
 * cells with values matching the parameter values. It then displays these rows,
 * and hides all other rows that do not match the parameter values.
 * If there are no entries that match the search parameter values, then text
 * is displayed that no matching entries were found.
*/
function showHide(obj) {
  var city = obj[0]; //Value of the first parameter which is the city property
  var date = obj[1]; //Value of the second parameter which is the date property
  var rows = document.querySelectorAll(".table-entry"); //All rows in the table
  var rowsHidden = 0; //Keeps track of number of hidden table rows
  var c = document.getElementsByClassName("table-data table-city"); //All cells in the city column
  var d = document.getElementsByClassName("table-data table-date"); //All cells in the date column

  //Loop through all rows
  for (var i=0; i<rows.length;i++){
    //Get year from the date
    var dYear = d[i].textContent.split('-')[0];

    /*
     * If it's the same city and same date as selected by user, show entry.
     * Also if city value contains a dash, replace this dash with a blank space.
    */
    if (c[i].textContent.toUpperCase() == city.replace(/-/g, ' ').toUpperCase() && dYear == date) {
      rows[i].classList.remove("hide");
    //If user did not select a city, show all entries that match date irrespective of city
    } else if((city.split(',')[0] === "default") && dYear == date) {
      rows[i].classList.remove("hide");
    //If it's not the same city and date, hide entry
    } else {
      rows[i].classList.add("hide");
      rowsHidden++;
    }
  }
  //If table is empty, i.e. all rows are hidden, display text that no matching entries found
  if (rows.length == rowsHidden){
    document.getElementById("last-entry").classList.remove("hide");
  } else {
    document.getElementById("last-entry").classList.add("hide");
  }

  /*
  * Update the zebra striping for current visible rows in the table. Obtained
  * from the following source code:
  * Author: ErinsMatthew
  * Code: https://stackoverflow.com/a/14544030
  */
  $( '#table-body' ).trigger( 'update', [ true ] );
}

/*
 * Verify that the user is logged into an account on the website, and
 * subsequently display checkbox column and table buttons (located at bottom
 * of table) that contain actionable items for the checkbox column.
 * Otherwise, if user not logged in, hide this checkbox column and table buttons.
 */
function displayCheckboxes(){
  var ch = document.getElementsByClassName("table-input"); //Checkbox cells
  var tb = document.getElementsByClassName("table-button"); //Table buttons

  //Loop through all entries in table
  for(var i=0;i<ch.length;i++){
    //If user is not logged in, hide checkboxes
    if (localStorage.getItem('login-false')) {
      ch[i].classList.add("hide");
    } else {
      ch[i].classList.add("show");
      //Workaround to set height of checkbox cells to same height as rest of table columns
      ch[i].style.height = document.getElementsByClassName("table-address")[i].offsetHeight+"px";
    }
  }
  //Loop through all table buttons at bottom of table
  for(var i=0;i<tb.length; i++){
     //If user is not logged in, hide buttons
    if (localStorage.getItem('login-false')) {
      tb[i].classList.add("hide");
    } else {
      tb[i].classList.add("show");
    }
  }
}

/*
* Determine city and data values user entered in search form, and pass these as
* parameters to showHide() to display only the relevant table rows. Also calls
* customize() display only the columns that the user selected.
*
* This function was obtained from the following source code:
* Author: tabnine
* Code: https://www.tabnine.com/academy/javascript/how-to-use-option-selected-property/
*/
function submitForm(ev) {
  ev.preventDefault();
  let selectInputs = document.querySelectorAll('select');
  let res = [];
  selectInputs.forEach(input => {
   res.push(input.value)
  })
  console.log(res);
  showHide(res); //Call function to determine which rows to display
  customize(); //Call function to determine which table columns to display
  return res;
}

/*
 * Change the columns that are displayed in the table based on the checkboxes
 * user has selected in the selection container.
 */
function customize() {
  //Array of column classes
  const columns = ["table-address","table-city","table-date","table-listing",
  "table-sold","table-diff-dollar","table-diff-percent","table-status"];

  const deselectedColumns = []; //Initialize array for unselected checkboxes
  const selectedColumns = []; //Initialize array for selected checkboxes

  //All checkbox elements
  var uInputs = document.getElementsByClassName("columns-checkbox");

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

  //For each element in deselectedColumns array, call hide function to hide this class
  for (var z=0; z < deselectedColumns.length; z++) {
    hide(deselectedColumns[z]);
  }

  //For each element in selectedColumns array, call show function
  //This accounts for users checking then unchecking same boxes
  for (var x=0; x < selectedColumns.length; x++) {
    show(selectedColumns[x]);
  }

  /*
   * If user deselects all checkboxes, display error message and a border
   * around the checkbox selection area. Otherwise, hide error message and border.
   */
  if (selectedColumns.length === 0){
    document.getElementById("column-selector").classList.add("error");
    document.getElementById("error-message").classList.remove("hide");
  } else {
    document.getElementById("column-selector").classList.remove("error");
    document.getElementById("error-message").classList.add("hide");
  }
}

/*
 * Adds hide class to the elements matching the class passed in the parameter.
 * Obtained from source code:
 * Author: James
 * Code: https://stackoverflow.com/a/42416476
*/
function hide(myClass) {
  //Obtains NodeList of all elements that match parameter name
  let els = document.querySelectorAll("."+myClass);
  //For each element that matched parameter name, add "hide" class
  els.forEach(function(el) {
    el.classList.add('hide');
  });
}

/*
 * Removes hide class from the elements matching the class passed in the parameter.
 * Obtained from source code:
 * Author: James
 * Code: https://stackoverflow.com/a/42416476
*/
function show(myClass) {
  //Obtains NodeList of all elements that match parameter name
  let els = document.querySelectorAll("."+myClass);
  //For each element that matched parameter name, add "hide" class
  els.forEach(function(el) {
    el.classList.remove('hide');
  });
}

/*
 * Print table containing search listings.
 * Print selection will include only site title, column names and table cells.
 */
function printTable(){

  var hiddenContainer = document.getElementsByClassName("selection-container")[0];
  var hiddenButtons = document.getElementsByClassName("header-buttons")[0];
  var hiddenPrint = document.getElementById("print-container");

  //Hide elements prior to printing
  hiddenContainer.classList.add("hide");
  hiddenButtons.classList.add("hide");
  hiddenPrint.classList.add("hide");

  window.print(); // Call print

  //Redisplay elements once print page has generated
  hiddenContainer.classList.remove("hide");
  hiddenButtons.classList.remove("hide");
  hiddenPrint.classList.remove("hide");
}

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

//Wait for page to load
window.addEventListener('load', function() {
   //Call function to populate the table with the dataset
   loadTableData();
   //Call function to display checkboxes column in data table
   displayCheckboxes();
   //Event listener for search button
   document.getElementById("search-button").addEventListener("click",function(){submitForm(event)})
   //Event listener for print button
   document.getElementById("print-container").addEventListener("click",printTable);

   //Call the tablesorter plugin and apply the ice theme
   $(function() {
     $("table").tablesorter({
         theme : 'ice',
         widgets : ['zebra']
       });
   });
});
