nearbyButtonEl = document.getElementById("nearbyBtn");
byCityButtonEl = document.getElementById("byZipBtn");
cardContainerEl = document.getElementById("card-container");

var searchButtonEl = document.getElementById("search-button");
var userInputEl = document.getElementById("autocomplete-input");
var liOneEl = document.getElementById("liOne");
var liTwoEl = document.getElementById("liTwo");
var liThreeEl = document.getElementById("liThree");
var loc;

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


nearbyButtonEl.addEventListener("click", getNearbyInfo);


function setCardInfo(city, name, phone, postalCode, state, street, website) {
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

