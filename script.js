// Part 5: Using Promise and Fetch to get JSON data

// CREATE, READ, UPDATE, DELETE, SEARCH, SORT
var countryList = document.getElementById('countries');

let countries = new Promise(resolve => {
  fetch("countries.json")
  .then(res => {
    if(res.status !== 200) {
      throw new Error('Cannot fetch the countries');
    }
    return res.json()
  })
  .then(data => resolve(data))
  .catch(err => alert(err.message))
});

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
  countries.then(allCountries => {
    var data = '';
    if (allCountries.length === 0) {
      throw new Error("There is no countries to display")
    }
    for (i = 0; i < allCountries.length; i++) {
      data += '<tr>';
      data += '<td>' + allCountries[i].name + '</td>';
      data += '<td>' + allCountries[i].continent + '</td>';
      data += '<td><button onclick="editCountry(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deleteCountry(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
    countCountries(allCountries.length);
    return countryList.innerHTML = data;
  })
  .catch(err => alert(err.message));
};
// Create: POST
addCountry = () => {
  var countryAdded = document.getElementById('add-country').value.trim();
  var continentAdded = document.getElementById('add-continent').value.trim();
  countries.then(allCountries => {
    if(!countryAdded || !continentAdded) {
      throw new Error('You have not inserted a value in one of the input fields');
    }
    let foundCountry = allCountries.find(country => country.name.toLowerCase().includes(countryAdded.toLowerCase()));
    if(foundCountry) {
      throw new Error('You are adding a duplicate value');
    }
    // Get the value
    var countryDetails = {
      name: countryAdded,
      continent: continentAdded
    }
    if (countryDetails) {
      // addCountry the new value
      allCountries.push(countryDetails);
      // Reset input value
      countryAdded.value = '';
      // Dislay the new list
      getCountries();
    }
  }).catch(err => alert(err.message));
};
// Update: PUT
editCountry = item => {
  var editCountry = document.getElementById('edit-country');
  var editContinent = document.getElementById('edit-continent');
  countries.then(allCountries => {
    // Display value in the field
    editCountry.value = allCountries[item].name;
    editContinent.value = allCountries[item].continent;
    // Display fields
    document.getElementById('editForm').style.display = 'block';
    // When the form is submitted
    document.getElementById('saveEdit').onsubmit = () => {
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
        allCountries.splice(item, 1, countryDetails);
        // Display the new list
        getCountries();
        // Hide fields
        closeInput();
      }
    }
  }).catch(err => alert(err.message));
};
// Delete: Delete
deleteCountry = item => {
  countries.then(allCountries => {
    // deleteCountry the current row
    allCountries.splice(item, 1);
    // Display the new list
    getCountries();
  }).catch(err => alert(err.message));
};
// Search: Country Search
searchbar = () => {
  var searchedCountry = document.getElementById('search').value.trim();
  countries.then(allCountries => {
    if (!searchedCountry) {
      throw new Error('Nothing was entered in the search bar');
    }
    // Filter all the countries in the array with value typed into the input field
    let countriesFound = allCountries.filter(country => country.name.toLowerCase().includes(searchedCountry.toLowerCase()));
    if(countriesFound.length === 0) {
      throw new Error('No countries were found');
    }
    var data = '';
    for (i = 0; i < countriesFound.length; i++) {
      data += '<tr>';
      data += '<td>' + countriesFound[i].name + '</td>';
      data += '<td>' + countriesFound[i].continent + '</td>';
      data += '<td><button onclick="editCountry(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deleteCountry(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
    countCountries(countriesFound.length);
    return countryList.innerHTML = data;
  }).catch(err => alert(err.message));
};

// Sort: Sort countries alphabetically
sortCountries = () => {
  countries.then(allCountries => {
    // Sorting alphabetically in decending order
    allCountries.sort((a, b) => {
      let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
          return -1;
      }
      return 0;
    });
    getCountries();
  }).catch(err => alert(err.message));
}

// Sort: Sort continents alphabetically
sortContinent = () => {
  countries.then(allCountries => {
    // Sorting alphabetically in decending order
    allCountries.sort((a, b) => {
      let fa = a.continent.toLowerCase(),
      fb = b.continent.toLowerCase();
      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
          return -1;
      }
      return 0;
    });
    getCountries();
  }).catch(err => alert(err.message));
}

// Where the script starts. This executes when the file loads on the browser
getCountries();

// Close Edit form
closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}