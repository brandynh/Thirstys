nearbyButtonEl = document.getElementById('nearbyBtn');
byCityButtonEl = document.getElementById('byZipBtn');
nearbyButtonDisplayEl = document.getElementById('nearby-form');


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

// Grabs first 20 and lists out name and URL
function urlList() {
  var requestUrl = 'https://api.openbrewerydb.org/breweries?per_page=15';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Brewery Name and Website \n----------');
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].website_url);
        console.log(data[i].name);
      }
    });
}

// This function will take in user Zip input and concat it onto the API link and sort breweries by relevant zip code
function findByZip(userZip) {
  var byZip = 'https://api.openbrewerydb.org/breweries?by_postal=' + userZip;

  fetch(byZip)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Brewery Name and ZipCode \n----------');
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].postal_code);
        console.log(data[i].name);
      }
    });
}


//This function will take in user city input and concat it onto the API link and sort breweries by relevant city 
function findByCity(userCity) {
  var byCity = 'https://api.openbrewerydb.org/breweries?by_city=' + userCity;

  fetch(byCity)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log('Brewery Name and ZipCode \n----------');
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].city);
        console.log(data[i].name);
      }
    });
}


//function gets users current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

//The function displays the Lat and Longitude for users position
function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude +
    " Longitude: " + position.coords.longitude);
  console.log("I've got your position!");
}

// Prompts user to allow or deny location access if allowed reveals nearby button 
navigator.geolocation.watchPosition(function (position) {
  getLocation();
  nearbyButtonDisplayEl.classList.remove('hide')
},

// If permission denied hides nearby button
  function (error) {
    if (error.code == error.PERMISSION_DENIED)
      nearbyButtonDisplayEl.classList.add('hide');
    console.log("you denied location access");
  });

