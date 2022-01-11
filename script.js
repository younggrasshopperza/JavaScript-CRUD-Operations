// Part 1: CRUD operations with array of strings

// CREATE, READ, UPDATE, DELETE
var countryList = document.getElementById('countries');
var countries = ['Brazil', 'Germany', 'England', 'Lesotho', 'Spain', 'Belgium', 'Namibia', 'Italy', 'Eswatini', 'Netherlands', 'Malaysia'];

// Counter: Number of countries in the array
countCountries = data => {
  var count = document.getElementById('counter');

  if (data) {
    count.innerHTML = 'There are a total of ' + data + ' countries';
    // Show the heading text for the table
    document.getElementById('name').style.display = 'block';
  } else {
    count.innerHTML = 'No country';
    // Hide the heading text for the table
    document.getElementById('name').style.display = 'none';
  }
};
// Read: GET
getCountries = () => {
  var data = '';
  if (countries.length > 0) {
    for (i = 0; i < countries.length; i++) {
      data += '<tr>';
      data += '<td>' + countries[i] + '</td>';
      data += '<td><button onclick="editCountry(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deleteCountry(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
  }
  countCountries(countries.length);
  return countryList.innerHTML = data;
};
// Create: POST
addCountry = () => {
  var countryAdded = document.getElementById('add-name');
  // Get the value
  var country = countryAdded.value;

  if (country) {
    // the new country value
    countries.push(country.trim());
    // Reset input value
    countryAdded.value = '';
    // Dislay the new list
    getCountries();
  }
};
// Update: PUT
editCountry = item => {
  var editCountry = document.getElementById('edit-name');
  // Display value in the field
  editCountry.value = countries[item];
  // Display fields
  document.getElementById('editForm').style.display = 'block';
  // When the form is submitted 
  document.getElementById('saveEdit').onsubmit = () => {
    // Get value
    var country = editCountry.value;
    if (country) {
      // editCountry value
      countries.splice(item, 1, country.trim());
      // Display the new list
      getCountries();
      // Hide fields
      closeInput();
    }
  }
};
// Delete: Delete
deleteCountry = item => {
  // deleteCountry the current row
  countries.splice(item, 1);
  // Display the new list
  getCountries();
};

// Where the script starts. This executes when the file loads on the browser
getCountries();

// Close Edit form
closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}