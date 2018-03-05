let countryAbbreviations = {}
let countryCapitals = {}
const country = $('#country')
const capital = $('#capital')

///////////// GET COUNTRY ABBREVIATIONS ///////////////
let $xhr = $.getJSON('http://country.io/names.json')
$xhr.done(function(data) {
    if ($xhr.status !== 200) {
        return;
    }
      for (var key in data) {
        countryAbbreviations[data[key]] = key
      }
});
$xhr.fail(function(err) {
    console.log(err);
});

///////////////GET COUNTRY CAPLITALS/////////
let $xhr2 = $.getJSON('http://country.io/capital.json')
$xhr2.done(function(data) {
    if ($xhr.status !== 200) {
        return;
    }
      for (var key in data) {
        countryCapitals[key] = data[key]
      }
});

$xhr2.fail(function(err) {
    console.log(err);
});


//////////////////CREATE MAP /////////////////////
// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 0, lng: 0},
//     zoom: 2,
//     styles: [
//     {
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#ebe3cd"
//         }
//       ]
//     },
//     {
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#523735"
//         }
//       ]
//     },
//     {
//       "elementType": "labels.text.stroke",
//       "stylers": [
//         {
//           "color": "#f5f1e6"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative",
//       "elementType": "geometry.stroke",
//       "stylers": [
//         {
//           "color": "#c9b2a6"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative.land_parcel",
//       "elementType": "geometry.stroke",
//       "stylers": [
//         {
//           "color": "#dcd2be"
//         }
//       ]
//     },
//     {
//       "featureType": "administrative.land_parcel",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#ae9e90"
//         }
//       ]
//     },
//     {
//       "featureType": "landscape.natural",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#dfd2ae"
//         }
//       ]
//     },
//     {
//       "featureType": "poi",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#dfd2ae"
//         }
//       ]
//     },
//     {
//       "featureType": "poi",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#93817c"
//         }
//       ]
//     },
//     {
//       "featureType": "poi.park",
//       "elementType": "geometry.fill",
//       "stylers": [
//         {
//           "color": "#a5b076"
//         }
//       ]
//     },
//     {
//       "featureType": "poi.park",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#447530"
//         }
//       ]
//     },
//     {
//       "featureType": "road",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#f5f1e6"
//         }
//       ]
//     },
//     {
//       "featureType": "road.arterial",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#fdfcf8"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#f8c967"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway",
//       "elementType": "geometry.fill",
//       "stylers": [
//         {
//           "color": "#ffeb3b"
//         },
//         {
//           "weight": 1.5
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway",
//       "elementType": "geometry.stroke",
//       "stylers": [
//         {
//           "color": "#e9bc62"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway.controlled_access",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#e98d58"
//         }
//       ]
//     },
//     {
//       "featureType": "road.highway.controlled_access",
//       "elementType": "geometry.stroke",
//       "stylers": [
//         {
//           "color": "#db8555"
//         }
//       ]
//     },
//     {
//       "featureType": "road.local",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#806b63"
//         }
//       ]
//     },
//     {
//       "featureType": "transit.line",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#dfd2ae"
//         }
//       ]
//     },
//     {
//       "featureType": "transit.line",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#8f7d77"
//         }
//       ]
//     },
//     {
//       "featureType": "transit.line",
//       "elementType": "labels.text.stroke",
//       "stylers": [
//         {
//           "color": "#ebe3cd"
//         }
//       ]
//     },
//     {
//       "featureType": "transit.station",
//       "elementType": "geometry",
//       "stylers": [
//         {
//           "color": "#dfd2ae"
//         }
//       ]
//     },
//     {
//       "featureType": "water",
//       "elementType": "geometry.fill",
//       "stylers": [
//         {
//           "color": "#b9d3c2"
//         }
//       ]
//     },
//     {
//       "featureType": "water",
//       "elementType": "labels.text.fill",
//       "stylers": [
//         {
//           "color": "#92998d"
//         }
//       ]
//     }
//   ]
//   });
//   var card = document.getElementById('pac-card');
//   var input = document.getElementById('pac-input');
//   var countries = document.getElementById('country-selector');
//
//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(card);
//
//   var autocomplete = new google.maps.places.Autocomplete(input);
//
//   var marker = new google.maps.Marker({
//     map: map,
//     anchorPoint: new google.maps.Point(0, -29)
//   });
//
//   autocomplete.addListener('place_changed', function() {
//     marker.setVisible(false);
//     var place = autocomplete.getPlace();
//
//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);  // Why 17? Because it looks good.
//     }
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//
//     var address = '';
//     if (place.address_components) {
//       address = [
//         (place.address_components[0] && place.address_components[0].short_name || ''),
//         (place.address_components[1] && place.address_components[1].short_name || ''),
//         (place.address_components[2] && place.address_components[2].short_name || '')
//       ].join(' ');
//     }
//
//     $('.button-collapse').sideNav('show');
//     country.text(`${place.name}`)
//     capital.text(`${countryCapitals[countryAbbreviations[place.name]]}`)
//   });
// }

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap',
          styles: [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#ebe3cd"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#523735"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#f5f1e6"
                  }
                ]
              },
              {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#c9b2a6"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#dcd2be"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#ae9e90"
                  }
                ]
              },
              {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#dfd2ae"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#dfd2ae"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#93817c"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#a5b076"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#447530"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#f5f1e6"
                  }
                ]
              },
              {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#fdfcf8"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#f8c967"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#ffeb3b"
                  },
                  {
                    "weight": 1.5
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#e9bc62"
                  }
                ]
              },
              {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#e98d58"
                  }
                ]
              },
              {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#db8555"
                  }
                ]
              },
              {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#806b63"
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#dfd2ae"
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#8f7d77"
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#ebe3cd"
                  }
                ]
              },
              {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#dfd2ae"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#b9d3c2"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#92998d"
                  }
                ]
              }
            ]
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();


          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);

          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();

          places.forEach(function(place) {

            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };


            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));


            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);

            } else {
              bounds.extend(place.geometry.location);

            }
            country.text(`${place.name}`)
            capital.text(`${countryCapitals[countryAbbreviations[place.name]]}`)
          });
          map.fitBounds(bounds);
          $('.button-collapse').sideNav('show');

        });
      }


$(document).ready(function(){
  $('.button-collapse').sideNav({
      menuWidth: 275, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    })
})
