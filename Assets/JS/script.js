nearbyButtonEl = document.getElementById("nearbyBtn");
byCityButtonEl = document.getElementById("byZipBtn");
cardContainerEl = document.getElementById("card-container");

var searchButtonEl = document.getElementById("search-button");
var userInputEl = document.getElementById("autocomplete-input");
var liOneEl = document.getElementById("liOne");
var liTwoEl = document.getElementById("liTwo");
var liThreeEl = document.getElementById("liThree");
var loc;

nearbyButtonEl.addEventListener("click", getNearbyInfo);
searchButtonEl.addEventListener("click", setLoc);

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
  var elems = document.querySelectorAll(".modal");
  var searchByCityModal = M.Modal.init(elems, {});
});

function getNearbyInfo() {


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  //The function displays the Lat and Longitude for users position
  function showPosition(position) {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
    console.log("Latitude: " + position.coords.latitude +
      " Longitude: " + position.coords.longitude);
    console.log("I've got your position!");
    nearUser();

  }

  // Prompts user to allow or deny location access if allowed reveals nearby button 
  navigator.geolocation.watchPosition(function (position) {

    getLocation();

  },

    // If permission denied hides nearby button
    function (error) {
      if (error.code == error.PERMISSION_DENIED)
      console.log("you denied location access");
    });

  function nearUser() {
    var nearUserURL = "https://api.openbrewerydb.org/breweries?by_dist=" + userLat + "," + userLon;

    fetch(nearUserURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {

            for (i = 0; i < data.length; i++) {
              var city = data[i].city;
              var name = data[i].name;
              var phone = data[i].phone;
              var postalCode = data[i].postal_code
              var state = data[i].state;
              var street = data[i].street;
              var website = data[i].website_url;
              setCardInfoNearby(city, name, phone, postalCode, state, street, website);

            }
            console.log(data)
          });

        } else {
          alert('Error: ' + response.statusText);
        }
      }).catch(function (error) {
        alert('Error');
      });

    
      getLocation();
      
  },

      // If permission denied hides nearby button
      function (error) {
          if (error.code == error.PERMISSION_DENIED)
              nearbyButtonEl.reset();
          console.log("you denied location access");
      });

  function nearUser() {
      var nearUserURL = "https://api.openbrewerydb.org/breweries?by_dist="+userLat+","+userLon;

      fetch(nearUserURL)
          .then(function (response) {
              if (response.ok) {
                  response.json().then(function (data) {

                      for(i = 0; i < data.length; i++){
                          var city = data[i].city;
                          var name = data[i].name;
                          var phone = data[i].phone;
                          var postalCode = data[i].postal_code
                          var state = data[i].state;
                          var street = data[i].street;
                          var website = data[i].website_url;
                          setCardInfo(city, name, phone, postalCode, state, street, website);

                      }
                      console.log(data)
                  });

              } else {
                  alert('Error: ' + response.statusText);
              }
          }).catch(function (error) {
              alert('Error');
          });


  }

}


function setCardInfoNearby(city, name, phone, postalCode, state, street, website) {
  var cardContainer = document.getElementById('card-container');
  // console.log(cardContainer);

  /* Create <h2 class="header">Horizontal Card</h2> */
  var cardHeader = document.createElement('h2');
  // console.log(cardHeader);
  var headerClassAttr = document.createAttribute("class");
  // console.log(headerClassAttr);
  headerClassAttr.value = "header";
  cardHeader.setAttributeNode(headerClassAttr);
  // console.log(cardHeader);
  var headerIdAttr = document.createAttribute("id");
  headerIdAttr.value = "card-heading";
  cardHeader.setAttributeNode(headerIdAttr);
  // set h2 title/text
  cardHeader.innerHTML = name;
  // Append to containter
  cardContainer.appendChild(cardHeader);

  // Create <div class="card horizontal">
  var cardHDiv = document.createElement('div');
  var cardHDivAttr = document.createAttribute("class")
  cardHDivAttr.value = "card horizontal";
  cardHDiv.setAttributeNode(cardHDivAttr);
  // console.log(cardHDiv);
  var cardHDivIdAttr = document.createAttribute("id");
  cardHDivIdAttr.value = "card-id";
  cardHDiv.setAttributeNode(cardHDivIdAttr);
  // Append to container
  cardContainer.appendChild(cardHDiv);

  // create <div class="card-image">
  var cardImageDiv = document.createElement('div');
  var cardImageDivAttr = document.createAttribute("class")
  cardImageDivAttr.value = "card-image";
  cardImageDiv.setAttributeNode(cardImageDivAttr);
  // console.log(cardImageDiv);
  var cardImageDivIdAttr = document.createAttribute("id");
  cardImageDivIdAttr.value = "card-image-id";
  cardImageDiv.setAttributeNode(cardImageDivIdAttr);
  // Append to header div
  cardHDiv.appendChild(cardImageDiv);

  // <span style="font-size: 5em">
  var cardSpan = document.createElement('span');
  var cardImageSpanAttr = document.createAttribute("style")
  cardImageSpanAttr.value = "font-size: 5em";
  cardSpan.setAttributeNode(cardImageSpanAttr);
  // console.log(cardSpan);
  var cardSpanIdAttr = document.createAttribute("id");
  cardSpanIdAttr.value = "card-image-id";
  cardSpan.setAttributeNode(cardSpanIdAttr);
  // Append to card image
  cardImageDiv.appendChild(cardSpan);

  // <i class="fas fa-beer"></i>
  var cardIcon = document.createElement('i');
  var cardIconAttr = document.createAttribute("class");
  cardIconAttr.value = "fas fa-beer";
  cardIcon.setAttributeNode(cardIconAttr);
  // Append to card span 
  cardSpan.appendChild(cardIcon);

  // <div class="card-stacked">
  var cardStackedDiv = document.createElement("div");
  var cardStackedAttr = document.createAttribute("class");
  cardStackedAttr.value = "card-stacked";
  cardStackedDiv.setAttributeNode(cardStackedAttr);
  var cardStackedDivId = document.createAttribute("id");
  cardStackedDivId.value = "card-stacked-id";
  cardStackedDiv.setAttributeNode(cardStackedDivId);
  // Append to header div
  cardHDiv.appendChild(cardStackedDiv);

  // <div class="card-content">
  var cardContentDiv = document.createElement("div");
  var cardContentAttr = document.createAttribute("class");
  cardContentAttr.value = "card-content";
  cardContentDiv.setAttributeNode(cardContentAttr);
  var cardContentDivId = document.createAttribute("id");
  cardContentDivId.value = "card-content-id";
  // Append to card-stacked div
  cardStackedDiv.appendChild(cardContentDiv);

  // <p></p>
  var cardAddrIno1 = document.createElement("p");
  cardAddrIno1.textContent = street;
  var cardAddrIno2 = document.createElement("p");
  cardAddrIno2.textContent = city + ', ' + state + ' ' + postalCode;
  var cardAddrIno3 = document.createElement("p");
  cardAddrIno3.textContent = phone;
  // Append to card-content div
  cardContentDiv.appendChild(cardAddrIno1);
  cardContentDiv.appendChild(cardAddrIno2);
  cardContentDiv.appendChild(cardAddrIno3);

  // <div class="card-action">
  var cardActionDiv = document.createElement("div");
  var cardActionDivAttr = document.createAttribute("class");
  cardActionDivAttr.value = "card-action";
  cardActionDiv.setAttributeNode(cardActionDivAttr);
  var cardActionDivId = document.createAttribute("id");
  cardActionDivId.value = "card-action-id";
  // Append to card-stacked div
  cardStackedDiv.appendChild(cardActionDiv);

  //  <a href="#">This is a link</a>
  var cardAnchor = document.createElement("a");
  var cardAnchorHref = document.createAttribute("href");
  if (name != null) {
    cardAnchorHref.value = name;
    var cardAnchorUrl = document.createTextNode(website);
    // Append to anchor 
    cardAnchor.appendChild(cardAnchorUrl);
  }
  cardAnchor.setAttributeNode(cardAnchorHref);
  // var cardAnchorUrl = document.createTextNode(website);
  // Append to card-stacked div
  cardAnchor.appendChild(cardAnchorUrl);
  // cardActionDiv.appendChild(cardAnchor);
}

// function obtains search city and generates locations
function setLoc(event) {
  loc = userInputEl.value;
  console.log(`The location is set to: ${loc}`);
  // removeElements();
  if (loc.length > 0) {
    queryBrewStr = 'brewery+' + loc + '+Tx';
    // call function to handle query
    getBySearch(queryBrewStr);
  }
  var whichLi = $(event.target);
  var otherLookup = '';
  if (whichLi[0].id.match("liOne")) {
    otherLookup = JSON.parse(localStorage.getItem("cityName1"));
    queryBrewStr = 'brewery+' + liOneEl.innerHTML + "+" + otherLookup + "Tx";
    // call function to handle query
    getBySearch(queryBrewStr);
  }
  if (whichLi[0].id.match("liTwo")) {
    otherLookup = JSON.parse(localStorage.getItem("cityName2"));
    queryBrewStr = 'brewery+' + liTwoEl.innerHTML + "+" + otherLookup + "Tx";
    // call function to handle query
    getBySearch(queryBrewStr);
  }
  if (whichLi[0].id.match("liThree")) {
    otherLookup = JSON.parse(localStorage.getItem("cityName3"));
    queryBrewStr = 'brewery+' + liThreeEl.innerHTML + "+" + otherLookup + "Tx";
    // call function to handle query
    getBySearch(queryBrewStr);
  }

  /*************************************************************************************/
  /* Dynamically create cards based on city search; create a checkbox to use as an    */
  /* indicator to save that particular location; only three locations will be saved  */
  /* when the limit is reached currently saved ones will be overwritten; create     */
  /* button to trigger map creation; which will scroll the user down the page to   */
  /* area; cards will be automatically removed for each new city search           */
  /*******************************************************************************/
  // Initialize and assigend variables
  // TomTom API required key
  const myTTAPI_KEY = 'W91HeZ3oRnS0ya858vti7JMZh5BqJetv';
  const APPLICATION_NAME = 'Thristys App';
  const APPLICATION_VERSION = '1.0';
  var website = '';
  var latitude = [];
  var longitude = [];
  var nameQuery = [];
  var searchCity = '';
  var queryBrewStr = '';


  // refresh/reinitialize
  init();

  // Brewery Search for entered Texas cities only
  function getBySearch(querySearchStr) {
    tt.services.fuzzySearch({
      key: myTTAPI_KEY,
      query: querySearchStr
    })
      .then(function (data) {
        for (i = 0; i < data.results.length; i++) {
          var dataType = data.results[i].type;
          if (dataType === 'POI') {
            var city = data.results[i].address.localName; //city
            latitude[i] = data.results[i].position.lat;  // latitude
            longitude[i] = data.results[i].position.lng;  // longitude
            var name = data.results[i].poi.name;  // business name
            nameQuery[i] = name; // needed for saving/retrieving from localstorage
            var phone = data.results[i].poi.phone;  // phone
            var postalCode = data.results[i].address.postalCode;  // zip/postal code
            var state = data.results[i].address.countrySubdivisionName;  // state
            var streetNumber = data.results[i].address.streetNumber;  // street number
            var street = data.results[i].address.streetName;  // street name
            // check if provided
            if (data.results[i].poi["url"]) {
              website = data.results[i].poi.url; // website
            } else { website = ''; }
            var score = data.results[i].score; // rating/score; not sure usage
            // call function to set card information of searched city
            setCardInfo(i, city, name, phone, postalCode, state, streetNumber, street, website)
          };
        }
      });
  }

  // set card information from API data
  function setCardInfo(index, city, name, phone, postalCode, state, streetNo, street, website) {
    var cardContainer = document.getElementById('card-container');
    /* Create <h2 class="header">Horizontal Card</h2> */
    var cardHeader = document.createElement('h2');
    var headerClassAttr = document.createAttribute("class");
    headerClassAttr.value = "header";
    cardHeader.setAttributeNode(headerClassAttr);
    var headerIdAttr = document.createAttribute("id");
    headerIdAttr.value = "card-heading";
    cardHeader.setAttributeNode(headerIdAttr);
    // set h2 title/text
    cardHeader.innerHTML = name;
    // Append to containter
    cardContainer.appendChild(cardHeader);

    // Create <div class="card horizontal">
    var cardHDiv = document.createElement('div');
    var cardHDivAttr = document.createAttribute("class")
    cardHDivAttr.value = "card horizontal";
    cardHDiv.setAttributeNode(cardHDivAttr);
    var cardHDivIdAttr = document.createAttribute("id");
    cardHDivIdAttr.value = "card-id";
    cardHDiv.setAttributeNode(cardHDivIdAttr);
    // Append to container
    cardContainer.appendChild(cardHDiv);

    // create <div class="card-image">
    var cardImageDiv = document.createElement('div');
    var cardImageDivAttr = document.createAttribute("class")
    cardImageDivAttr.value = "card-image";
    cardImageDiv.setAttributeNode(cardImageDivAttr);
    var cardImageDivIdAttr = document.createAttribute("id");
    cardImageDivIdAttr.value = "card-image-id";
    cardImageDiv.setAttributeNode(cardImageDivIdAttr);
    // Append to header div
    cardHDiv.appendChild(cardImageDiv);

    // <span style="font-size: 5em">
    var cardSpan = document.createElement('span');
    var cardImageSpanAttr = document.createAttribute("style")
    cardImageSpanAttr.value = "font-size: 5em";
    cardSpan.setAttributeNode(cardImageSpanAttr);
    var cardSpanIdAttr = document.createAttribute("id");
    cardSpanIdAttr.value = "card-image-id";
    cardSpan.setAttributeNode(cardSpanIdAttr);
    // Append to card image
    cardImageDiv.appendChild(cardSpan);

    // <i class="fas fa-beer"></i>
    var cardIcon = document.createElement('i');
    var cardIconAttr = document.createAttribute("class");
    cardIconAttr.value = "fas fa-beer";
    cardIcon.setAttributeNode(cardIconAttr);
    // Append to card span 
    cardSpan.appendChild(cardIcon);

    // <div class="card-stacked">
    var cardStackedDiv = document.createElement("div");
    var cardStackedAttr = document.createAttribute("class");
    cardStackedAttr.value = "card-stacked";
    cardStackedDiv.setAttributeNode(cardStackedAttr);
    var cardStackedDivId = document.createAttribute("id");
    cardStackedDivId.value = "card-stacked-id";
    cardStackedDiv.setAttributeNode(cardStackedDivId);
    // Append to header div
    cardHDiv.appendChild(cardStackedDiv);

    // <div class="card-content">
    var cardContentDiv = document.createElement("div");
    var cardContentAttr = document.createAttribute("class");
    cardContentAttr.value = "card-content";
    cardContentDiv.setAttributeNode(cardContentAttr);
    var cardContentDivId = document.createAttribute("id");
    cardContentDivId.value = "card-content-id";
    // Append to card-stacked div
    cardStackedDiv.appendChild(cardContentDiv);

    // <p></p>
    var cardAddrIno1 = document.createElement("p");
    cardAddrIno1.textContent = streetNo + " " + street;
    var cardAddrIno2 = document.createElement("p");
    cardAddrIno2.textContent = city + ', ' + state + ' ' + postalCode;
    var cardAddrIno3 = document.createElement("p");
    cardAddrIno3.textContent = phone;
    // Append to card-content div
    cardContentDiv.appendChild(cardAddrIno1);
    cardContentDiv.appendChild(cardAddrIno2);
    cardContentDiv.appendChild(cardAddrIno3);
    // create p table for label
    var labelParaEl = document.createElement("p");
    // append paragraph to card-action div
    cardContentDiv.appendChild(labelParaEl);
    // create label element
    var saveSearchLabelElement = document.createElement("label");
    // append label element to paragraph tag
    labelParaEl.appendChild(saveSearchLabelElement);
    // create input element and attributes
    var saveSearchInputElement = document.createElement("input");
    var saveSearchInputElementAttr = document.createAttribute("type");
    saveSearchInputElementAttr.value = "checkbox";
    // append attribute to input element
    saveSearchInputElement.setAttributeNode(saveSearchInputElementAttr);
    var saveSearchInputAttrChecked = document.createAttribute("checked");
    var saveItAttrId = document.createAttribute("id");
    saveItAttrId.value = "saveit-" + index;
    saveSearchInputElement.setAttributeNode(saveItAttrId);
    // append input element to label element
    saveSearchLabelElement.appendChild(saveSearchInputElement);
    // create a span element
    var saveSearchInputSpanEl = document.createElement("span");
    saveSearchInputSpanEl.innerHTML = "Save It";
    saveSearchLabelElement.appendChild(saveSearchInputSpanEl);

    // <div class="card-action">
    var cardActionDiv = document.createElement("div");
    var cardActionDivAttr = document.createAttribute("class");
    cardActionDivAttr.value = "card-action";
    cardActionDiv.setAttributeNode(cardActionDivAttr);
    var cardActionDivId = document.createAttribute("id");
    cardActionDivId.value = "card-action-id";
    // Append to card-stacked div
    cardStackedDiv.appendChild(cardActionDiv);

    //  <a href="#">This is a link</a>
    var cardAnchor = document.createElement("a");
    var cardAnchorHref = document.createAttribute("href");
    cardAnchorHref.value = website;
    // check for format of url data and fix, if necessary
    if (website === null) {
      website = '';
    } else {
      if (!website.match("https://")) {
        if (website.match("www.")) {
          website = encodeURI("https://" + website);
        } else if (website.match(".")) {
          website = encodeURI("https://www." + website);
        }
      }
    }
    var cardAnchorUrl = document.createTextNode(website);
    cardAnchor.setAttributeNode(cardAnchorHref);
    // Append to anchor url to anchor element and all to card-action div
    cardAnchor.appendChild(cardAnchorUrl);
    cardActionDiv.appendChild(cardAnchor);

    // <button class="waves-effect waves-teal btn-flat">Button</button> : Add button for map it indicator
    var mapItBtn = document.createElement("button");
    var mapItBtnAttr = document.createAttribute("class");
    mapItBtnAttr.value = "waves-effect waves-light btn-small waves-teal";
    mapItBtn.setAttributeNode(mapItBtnAttr);
    var mapItBntAttrType = document.createAttribute("type");
    mapItBntAttrType.value = "button";
    mapItBtn.setAttributeNode(mapItBntAttrType);
    var mapItBntAttrId = document.createAttribute("id");
    mapItBntAttrId.value = "mapit-" + index;
    mapItBtn.setAttributeNode(mapItBntAttrId);
    mapItBtn.textContent = "Map It"
    // Append to card-action div
    cardActionDiv.appendChild(mapItBtn);
  }

  // obtain localstorage
  var localStorageLength = localStorage.length;

  // function will handle setting and retrieving localstorage
  function handleLocalStorage(checkOption, historyQuery) {

    var counter = 0;
    localStorageLength = localStorage.length;

    for (var i = 0; i <= localStorageLength; i++) {
      if (localStorage.getItem(localStorage.key(i)) !== null) {
        if (localStorage.key(i).match('city')) {
          counter++;
        }
      }
    }
    // override
    counter++;
    if (counter > 3) {
      counter = Math.ceil(Math.floor(Math.random() * 3));
    }

    if (counter === 1) {
      localStorage.setItem('city1', JSON.stringify(historyQuery));
      localStorage.setItem('cityName1', JSON.stringify(loc));
      liOneEl.innerHTML = historyQuery;
    } else if (counter === 2) {
      localStorage.setItem('city2', JSON.stringify(historyQuery));
      localStorage.setItem('cityName2', JSON.stringify(loc));
      liTwoEl.innerHTML = historyQuery;
    } else {
      localStorage.setItem('city3', JSON.stringify(historyQuery));
      localStorage.setItem('cityName3', JSON.stringify(loc));
      liThreeEl.innerHTML = historyQuery;
    }
  }

  function removeElements() {
    console.log("in remove elements");
  }

  // handle map and marker creation and saving of selected location
  function handleMapIt(event) {
    var whichElement = $(event.target);

    if (whichElement[0].id.match("saveit-")) {
      whichElement[0].toggleAttribute("checked");
      var checkboxIndex = whichElement[0].id.split("-")[1];
      // call function to save to localstore or remove if exist
      handleLocalStorage(checkboxIndex, nameQuery[checkboxIndex])
    } else if (whichElement[0].id.match("mapit-")) {
      var btnIndex = whichElement[0].id.split("-")[1];
      var someLocation = { lng: longitude[btnIndex], lat: latitude[btnIndex] }
      // create map
      var map = tt.map({
        key: myTTAPI_KEY,
        container: 'map-div',
        center: someLocation,
        zoom: 12
      });
      //  create marker on map and scroll closer to map component
      var marker = new tt.Marker().setLngLat(someLocation).addTo(map);
      window.scrollTo(500, 1950);
    }
  }
  // construct search query string and call function to perform search
  function getTxCitySearch(event) {
    if (texasCitySearch[0].value !== null) {
      searchCity = texasCitySearch[0].value;
      getBySearch(queryBrewStr);
      texasCitySearch[0].value = '';
    }
  }

  function init() {
    // remove all cards

    // check localstorage
    localStorageLength = localStorage.length;
    for (var i = 0; i <= localStorageLength; i++) {
      if (localStorage.getItem(localStorage.key(i)) !== null) {
        if (localStorage.key(i).match('city1')) {
          liOneEl.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(i)));
        } else if (localStorage.key(i).match('city2')) {
          liTwoEl.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(i)));
        } else if (localStorage.key(i).match('city3')) {
          liThreeEl.innerHTML = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }
      }
    }
  }


nearbyButtonEl.addEventListener("click", getNearbyInfo);



  // hanlde clicked elements; call function to handle displaying locations
  // info and map and save options
  var cardContainer = document.getElementById('card-container');
  cardContainer.addEventListener("click", handleMapIt);
  // saved cities
  liOneEl.addEventListener("click", setLoc);
  liTwoEl.addEventListener("click", setLoc);
  liThreeEl.addEventListener("click", setLoc);

  nearbyButtonEl.addEventListener("click", getNearbyInfo);


}
