/*
* Javascript for generating the data table containing the Month By Month Changes
* in statistics.html. The data displayed shows only the average monthly difference
* in price between the listing and sold price in a given city. Only one city's
* data can be viewed at a time in the table, requiring the user to make a
* selection for which city they want to view.
* This table implements TableSorter plugin to create and style the table.
*/

// Array of objects containing data from city Bathurst
let bathurstData = [
    { month:"January",y2018:"-2200",y2019:"-230",y2020:"-500",y2021:"+4000" },
    { month:"February",y2018:"-1780",y2019:"-300",y2020:"-1000",y2021:"+2800" },
    { month:"March",y2018:"-2000",y2019:"+80",y2020:"-2080",y2021:"+1500" },
    { month:"April",y2018:"-900",y2019:"+230",y2020:"+30",y2021:"+2600" },
    { month:"May",y2018:"-220",y2019:"-840",y2020:"+800",y2021:"+1400" },
    { month:"June",y2018:"+430",y2019:"-770",y2020:"+1200",y2021:"+1900" },
    { month:"July",y2018:"+10",y2019:"-340",y2020:"+1050",y2021:"+1850" },
    { month:"August",y2018:"-120",y2019:"-670",y2020:"+2300",y2021:"+2200" },
    { month:"September",y2018:"-500",y2019:"-450",y2020:"+3740",y2021:"+2090" },
    { month:"October",y2018:"-200",y2019:"+100",y2020:"+2900",y2021:"+2500" },
    { month:"November",y2018:"-700",y2019:"-500",y2020:"+4850",y2021:"+1740" },
    { month:"December",y2018:"-1100",y2019:"-990",y2020:"+3600",y2021:"+1300" }
];
// Array of objects containing data from city Fredericton
let frederictonData = [
  { month:"January",y2018:"+800",y2019:"+400",y2020:"-330",y2021:"+3860" },
  { month:"February",y2018:"+280",y2019:"+300",y2020:"-840",y2021:"+2800" },
  { month:"March",y2018:"-400",y2019:"+590",y2020:"-2100",y2021:"+3560" },
  { month:"April",y2018:"-370",y2019:"+420",y2020:"-1400",y2021:"+5210" },
  { month:"May",y2018:"+320",y2019:"-200",y2020:"+880",y2021:"+5440" },
  { month:"June",y2018:"+850",y2019:"+560",y2020:"+2200",y2021:"+3970" },
  { month:"July",y2018:"+1040",y2019:"-440",y2020:"+3050",y2021:"+4330" },
  { month:"August",y2018:"+940",y2019:"+870",y2020:"+2500",y2021:"+3530" },
  { month:"September",y2018:"+370",y2019:"+1200",y2020:"+4740",y2021:"+3090" },
  { month:"October",y2018:"-130",y2019:"+990",y2020:"+3400",y2021:"+2770" },
  { month:"November",y2018:"-290",y2019:"+350",y2020:"+5050",y2021:"+2540" },
  { month:"December",y2018:"-560",y2019:"-430",y2020:"+6000",y2021:"+3430" }
];
// Array of objects containing data from city Miramichi
let miramichiData = [
  { month:"January",y2018:"-3400",y2019:"-990",y2020:"-430",y2021:"+3190" },
  { month:"February",y2018:"-2790",y2019:"-1410",y2020:"-590",y2021:"+3240" },
  { month:"March",y2018:"-3840",y2019:"-1050",y2020:"-1080",y2021:"+2640" },
  { month:"April",y2018:"-2040",y2019:"-530",y2020:"-1430",y2021:"+2360" },
  { month:"May",y2018:"-1724",y2019:"+140",y2020:"+300",y2021:"+1840" },
  { month:"June",y2018:"-1220",y2019:"-470",y2020:"+930",y2021:"+1530" },
  { month:"July",y2018:"-780",y2019:"-510",y2020:"+1340",y2021:"+2230" },
  { month:"August",y2018:"+100",y2019:"-230",y2020:"+1890",y2021:"+2770" },
  { month:"September",y2018:"-350",y2019:"+220",y2020:"+2400",y2021:"+1500" },
  { month:"October",y2018:"+140",y2019:"+350",y2020:"+2210",y2021:"+1450" },
  { month:"November",y2018:"-290",y2019:"-390",y2020:"+3180",y2021:"+1200" },
  { month:"December",y2018:"-580",y2019:"-540",y2020:"+2960",y2021:"+980" }
];
// Array of objects containing data from city Moncton
let monctonData = [
  { month:"January",y2018:"-1440",y2019:"+440",y2020:"+110",y2021:"+2400" },
  { month:"February",y2018:"-730",y2019:"+610",y2020:"+600",y2021:"+1500" },
  { month:"March",y2018:"+200",y2019:"+360",y2020:"-2380",y2021:"+2230" },
  { month:"April",y2018:"+540",y2019:"-270",y2020:"-1030",y2021:"+2800" },
  { month:"May",y2018:"-250",y2019:"-550",y2020:"+1800",y2021:"+1990" },
  { month:"June",y2018:"+290",y2019:"+490",y2020:"+2100",y2021:"+1039" },
  { month:"July",y2018:"+450",y2019:"-220",y2020:"+3040",y2021:"-200" },
  { month:"August",y2018:"-300",y2019:"+530",y2020:"+3900",y2021:"+1000" },
  { month:"September",y2018:"-870",y2019:"-420",y2020:"+4120",y2021:"+1540" },
  { month:"October",y2018:"+330",y2019:"-360",y2020:"+5310",y2021:"+2300" },
  { month:"November",y2018:"-250",y2019:"-400",y2020:"+6480",y2021:"+1330" },
  { month:"December",y2018:"-130",y2019:"+210",y2020:"+5200",y2021:"+1120" }
];
// Array of objects containing data from city Saint John
let saintjohnData = [
  { month:"January",y2018:"+780",y2019:"-470",y2020:"+600",y2021:"+3700" },
  { month:"February",y2018:"+500",y2019:"+880",y2020:"-900",y2021:"+3820" },
  { month:"March",y2018:"-1300",y2019:"+1030",y2020:"-2480",y2021:"+2550" },
  { month:"April",y2018:"-990",y2019:"+920",y2020:"+960",y2021:"+2860" },
  { month:"May",y2018:"-340",y2019:"+540",y2020:"+1800",y2021:"+3440" },
  { month:"June",y2018:"+180",y2019:"-310",y2020:"+2360",y2021:"+3900" },
  { month:"July",y2018:"-450",y2019:"+630",y2020:"+2070",y2021:"+2750" },
  { month:"August",y2018:"-610",y2019:"-970",y2020:"+2990",y2021:"+1230" },
  { month:"September",y2018:"+320",y2019:"-550",y2020:"+3930",y2021:"-490" },
  { month:"October",y2018:"-730",y2019:"+690",y2020:"+4320",y2021:"+590" },
  { month:"November",y2018:"-660",y2019:"+550",y2020:"+5110",y2021:"-240" },
  { month:"December",y2018:"-900",y2019:"-440",y2020:"+4400",y2021:"+4800" }
];

/*
 * Take as a parameter the city that is to be displayed in the table.
 * Generate table cells and populate these cells with the relevant property
 * values from relevant city's dataset array. Appends to HTML.
 */
function loadTableData(city) {

  //Match city passed as parameter to the relevant dataset name
  switch(city){
    case "bathurst":
        city = bathurstData;
        break;
    case "fredericton":
        city = frederictonData;
        break;
    case "miramichi":
        city = miramichiData;
        break;
    case "moncton":
        city = monctonData;
        break;
    case "saint-john":
        city = saintjohnData;
        break;
  }
  var tableBody = document.getElementById("table-body");  //Table element

  //Create table rows and populate cells with dataset elements
  for(var i = 0;i < city.length; i++){
    tableBody+= '<tr class="table-entry">';
    tableBody+= '<td class="table-data table-month">' + city[i].month + '</td>';
    tableBody+= '<td class="table-data table-2018">' + " $" + city[i].y2018 +'</td>';
    tableBody+= '<td class="table-data table-2019">' + " $" + city[i].y2019 + '</td>';
    tableBody+= '<td class="table-data table-2020">' + " $" + city[i].y2020 +'</td>';
    tableBody+= '<td class="table-data table-2021">' + " $" + city[i].y2021 +'</td>';
    tableBody+= '</tr>';
  }
  document.getElementById('table-body').innerHTML = tableBody;   //Update the HTML

  //Workaround to remove first element in the table, which is an HTML object
  let allRows = document.getElementById("table-body");
  allRows.removeChild(allRows.childNodes[0]);

  changeColor(); //Change background color of table cells that have negative value

  /*
  * Update the zebra striping for current visible rows in the table. Obtained
  * from the following source code:
  * Author: ErinsMatthew
  * Code: https://stackoverflow.com/a/14544030
  */
  $( '#table-body' ).trigger( 'update', [ true ] );
}

/*
 * Change background color of table cells that have a negative value to red.
 * Main purpose is to faciliate readability of the table at a quick glance.
 */
function changeColor() {
  //Get all table cells except for the month dates
  var allCells = document.getElementsByClassName("table-data");

  //Loop through these table cells
  for (var h=0;h<allCells.length;h++){
    //Ignore the dollar sign
    allCells[h].textContent.split("$")[1];
    //If cell includes dash (negative sign) change cell background color to red
    if (allCells[h].textContent.includes("-")) {
      allCells[h].style.backgroundColor = "#ffcccb";
    }
  }
}

/*
* Determine city value user entered in search form, and pass as parameter
* to loadTableData to only display the city that the user selected.
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
   loadTableData(res[0]); //Load table with specified city as parameter
   return res;
 }

//Wait for page to load
window.addEventListener('load', function() {
  //Load table with default city
  loadTableData("bathurst");
  //Event listener for search button
  document.getElementsByClassName("toggle-city")[0].addEventListener("change",function(){submitForm(event)});

  //Call the tablesorter plugin and apply the ice theme
  $(function() {
    $("table").tablesorter({
      theme : 'ice',
      widgets : ['zebra']
    });
  });
});
