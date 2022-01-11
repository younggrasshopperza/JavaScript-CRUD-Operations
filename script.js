// Part 4: Sorting the array alphabetically

// CREATE, READ, UPDATE, DELETE
var countryList = document.getElementById('countries');
let countries = [
  {
    name: 'Columbia',
    continent: 'South America'
  },
  {
    name: 'Japan',
    continent: 'Asia'
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
  try {
    var countryAdded = document.getElementById('add-country').value.trim();
    var continentAdded = document.getElementById('add-continent').value.trim();
    if(!countryAdded || !continentAdded) {
      throw new Error('You have not inserted a value in one of the input fields');
    }
    // Get the value
    var countryDetails = {
      name: countryAdded,
      continent: continentAdded
    }
    if (countryDetails) {
      // addCountry the new value
      countries.push(countryDetails);
      // Reset input value
      countryAdded.value = '';
      // Dislay the new list
      getCountries();
    }
  } catch (err) {
    alert(err.message);
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
    try {
      console.log(editCountry.value.trim())
      if(!editCountry.value.trim() || !editContinent.value.trim()) {
        throw new Error('You have not inserted a value in one of the input fields');
      }
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
    } catch (err) {
      alert(err.message);
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
// Search: Country Search
searchbar = () => {
  var searchedCountry = document.getElementById('search').value.trim();
  try {
    if (!searchedCountry) {
      throw new Error('Nothing was entered in the search bar');
    }
    // Filter all the countries in the array with value typed into the input field
    let countriesFound = countries.filter(country => country.name.toLowerCase().includes(searchedCountry.toLowerCase()));
    if(countriesFound.length === 0) {
      throw new Error('No countries were found');
    }
    countries = countriesFound;
    getCountries();
  } catch (err) {
    alert(err.message);
  }
};

// Sort: Sort countries alphabetically
sortCountries = () => {
  // Sorting alphabetically in decending order
  countries.sort((a, b) => {
    let fa = a.name.toLowerCase(),
    fb = b.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });
  getCountries();
}

// Sort: Sort continents alphabetically
sortContinent = () => {
  // Sorting alphabetically in decending order
  countries.sort((a, b) => {
    let fa = a.continent.toLowerCase(),
    fb = b.continent.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
  });
  getCountries();
}

// Where the script starts. This executes when the file loads on the browser
getCountries();

// Close Edit form
closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}