var countryList = document.getElementById('countries');
countries = ['Brazil', 'Germany', 'England', 'Lesotho', 'Spain', 'Belgium', 'Namibia', 'Italy', 'Eswatini', 'Netherlands', 'Malaysia'];
  
countCountries = data => {
  var count = document.getElementById('counter');

  if (data) {
    count.innerHTML = 'There are a total of ' + data + ' countries';
  } else {
    count.innerHTML = 'No country';
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
    // addCountry the new value
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

getCountries();

closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}