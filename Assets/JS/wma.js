
var breweryAllUrl = 'https://api.openbrewerydb.org/breweries?by_type=';
var searchByCity = 'by_city';
var searchByState = 'by_state=';
var searchByPostalCode = 'by_postal';
var searcyByName = 'by_name';
var searchMultiple = '';
var searchInclude = 'micro&nano&regional&brewpub&large&bar&proprietor';
var searchUrl = breweryAllUrl + searchInclude;
// console.log(searchUrl);
// call Brewery API and populate cards
fetch (searchUrl)
.then(function(response) {
    return response.json();
})
.then(function (data) {
    console.log(data)

    for(i = 0; i < data.length; i++){
        var city = data[i].city;
        var latitude = data[i].latitude;
        var longitude = data[i].longitude;
        var name = data[i].name;
        var phone = data[i].phone;
        var postalCode = data[i].postal_code
        var state = data[i].state;
        var street = data[i].street;
        var website = data[i].website_url;

        setCardInfo(city, latitude, longitude, name, phone, postalCode, state, street, website)
    }
});

// set card information from API data
function setCardInfo(city, latitude, longitude, name, phone, postalCode, state, street, website){
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
if(name != null){
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


  // TomTom API requires a key
  const myTTAPI_KEY = 'W91HeZ3oRnS0ya858vti7JMZh5BqJetv';
  // var tomtomAPIKey = 'W91HeZ3oRnS0ya858vti7JMZh5BqJetv';
  const APPLICATION_NAME = 'My Application';
  const APPLICATION_VERSION = '1.0';
   
  tt.setProductInfo(APPLICATION_NAME, APPLICATION_VERSION);
  

//   var latitude = 41.289715;
//   var longitude = -86.627954;

//   const SOME_LOCATION = {lng: longitude, lat: latitude};

//   const GOLDEN_GATE_BRIDGE = {lng: -122.47483, lat: 37.80776};
   
//   var map = tt.map({
//     key: myTTAPI_KEY,
//     container: 'map-div',
//     center: GOLDEN_GATE_BRIDGE,
//     zoom: 12
//   });
  
//   tt.services.fuzzySearch({
//       key: myTTAPI_KEY ,
//       query: 'Golden Gate Bridg'
//     })
//   //   .go()
//     .then(function(response) {
//       console.log(response);
//       map = tt.map({
//         key: myTTAPI_KEY,
//         container: 'map-div',
//         center: response.results[0].position,
//         zoom: 12
//       });
//     });

var latitude = 41.289715;
var longitude = -86.627954;

const SOME_LOCATION = {lng: longitude, lat: latitude};

var map = tt.map({
    key: myTTAPI_KEY,
    container: 'map-div',
    center: SOME_LOCATION,
    zoom: 12
  });
  
  tt.services.fuzzySearch({
      key: myTTAPI_KEY ,
      query: 'Brewery'
    })
  //   .go()
    .then(function(response) {
      console.log(response);
      map = tt.map({
        key: myTTAPI_KEY,
        container: 'map-div',
        center: response.results[0].position,
        zoom: 12
      });
    });