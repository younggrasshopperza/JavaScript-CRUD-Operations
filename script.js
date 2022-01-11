// Part 2: CRUD operations with array of objects

// CREATE, READ, UPDATE, DELETE
var countryList = document.getElementById('countries');
let countries = [
  {
    name: 'Columbia',
    continent: 'South America'
  },
  {
    name: 'Japan',
    continent: 'South America'
  },
  {
    name: 'Egypt',
    continent: 'Africa'
  }
];
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
    document.getElementById('continent').style.display = 'none';
  }
};
// Read: GET
getCountries = () => {
  var data = '';
  if (countries.length > 0) {
    for (i = 0; i < countries.length; i++) {
      data += '<tr>';
      data += '<td>' + countries[i].name + '</td>';
      data += '<td>' + countries[i].continent + '</td>';
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
  var countryAdded = document.getElementById('add-country');
  var continentAdded = document.getElementById('add-continent');
  // Get the value
  var countryDetails = {
    name: countryAdded.value.trim(),
    continent: continentAdded.value.trim()
  }

  if (countryDetails) {
    // addCountry the new value
    countries.push(countryDetails);
    // Reset input value
    countryAdded.value = '';
    // Dislay the new list
    getCountries();
  }
};
// Update: PUT
editCountry = item => {
  var editCountry = document.getElementById('edit-country');
  var editContinent = document.getElementById('edit-continent');
  // Display value in the field
  editCountry.value = countries[item].name;
  editContinent.value = countries[item].continent;
  // Display fields
  document.getElementById('editForm').style.display = 'block';
  // When the form is submitted
  document.getElementById('saveEdit').onsubmit = () => {
    // Get value
    var countryDetails = {
      name: editCountry.value,
      continent: editContinent.value
    };

    if (countryDetails) {
      // editCountry value
      countries.splice(item, 1, countryDetails);
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