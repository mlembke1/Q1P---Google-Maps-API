let countryAbbreviations = {}
let countryCapitals = {}
const country = $('#country')
const capital = $('#capital')
let currentCountry = null
let currentCapital = null
let favorites = {}
let favoritesArray = []
let savedFavorites = JSON.parse(localStorage.getItem('favorites')) || []



// FUNCTIONS TO CONVERT TEMPERATURES
const math = {
  fromKtoF: num => Math.ceil((num * 9 / 5) - 459.67),
  fromKtoC: num => Math.ceil((num - 273.15))
}


///////////// GET COUNTRY ABBREVIATIONS ///////////////
let $xhr = $.getJSON('https://g-country.herokuapp.com/names.json')
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
let $xhr2 = $.getJSON('https://g-country.herokuapp.com/capital.json')
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

// GOOGLE MAPS VOODOO
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 2,
    mapTypeId: 'roadmap',
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#523735"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#c9b2a6"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#dcd2be"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#ae9e90"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#93817c"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#a5b076"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#447530"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f5f1e6"
        }]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#fdfcf8"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#f8c967"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
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
        "stylers": [{
          "color": "#e9bc62"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
          "color": "#e98d58"
        }]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#db8555"
        }]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#806b63"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8f7d77"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#ebe3cd"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#dfd2ae"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#b9d3c2"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#92998d"
        }]
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
      currentCountry = `${place.name}`
      currentCapital = `${countryCapitals[countryAbbreviations[place.name]]}`

      country.text(currentCountry)
      capital.text(currentCapital)




      if (!savedFavorites.includes(currentCountry)) {
        $('#country').removeClass('fav')
      } else {
        $('#country').addClass('fav')
      }



      ///////////// GET WEATHER ///////////////
      let $xhr3 = $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${countryCapitals[countryAbbreviations[place.name]]}&APPID=96e1482cd1c7ae7db7ff83f1054f01ff`)
      $xhr3.done(function(data) {
        if ($xhr.status !== 200) {
          return
        }

        // DEFAULT SETTINGS FOR RADIO BUTTONS
        const f = $('#f')[0]
        $('#k').prop('checked', true);
        const unitContainer = $('#unitContainer')[0]

        // DEFAULT TEMPERATURE UNIT SELECTED IS K
        let currentTemp = `${Math.ceil(data.main.temp)}˚K`
        let low = `${Math.ceil(data.main.temp_min)}˚K`
        let high = `${Math.ceil(data.main.temp_max)}˚K`
        let currentWeather = data.weather[0].main

        // ADD DEFAULT TEMPERATURES TO HTML
        $('#current-temp').text(`${currentTemp}`)
        $('#todays-high').text(`${high}`)
        $('#todays-low').text(`${low}`)
        $('#currently').text(` ${currentWeather}`)

        // WHEN A DIFFERENCE RADIO BUTTON IS SELECTED
        // CHANGE THE UNITS.
        $(unitContainer).change(() => {
          let selectedUnit = $('input:checked').val()
          if (selectedUnit === 'f') {
            currentTemp = `${math.fromKtoF(data.main.temp)}˚F`
            low = `${math.fromKtoF(data.main.temp_min)}˚F`
            high = `${math.fromKtoF(data.main.temp_max)}˚F`
          }
          if (selectedUnit === 'c') {
            currentTemp = `${math.fromKtoC(data.main.temp)}˚C`
            low = `${math.fromKtoC(data.main.temp_min)}˚C`
            high = `${math.fromKtoC(data.main.temp_max)}˚C`
          }
          if (selectedUnit === 'k') {
            currentTemp = `${Math.ceil(data.main.temp)}˚K`
            low = `${Math.ceil(data.main.temp_min)}˚K`
            high = `${Math.ceil(data.main.temp_max)}˚K`
          }

          $('#current-temp').text(`${currentTemp}`)
          $('#todays-high').text(`${high}`)
          $('#todays-low').text(`${low}`)
          $('#currently').text(` ${currentWeather}`)

        })

      })
      $xhr3.fail(function(err) {
        console.log(err);
      });
    })
    map.fitBounds(bounds);
    $('.button-collapse').sideNav('show');
  })
}

$(document).ready(function() {
  $('.button-collapse').sideNav({
    menuWidth: 275, // Default is 300
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true // Choose whether you can drag to open on touch screens
  })

  // SETTING LOCAL STORAGE

  $('#country').click(() => {

    if (favorites[currentCountry] !== true && !savedFavorites.includes(currentCountry)) {
      favorites[currentCountry] = true
      $('#country').addClass('fav')

      savedFavorites.push(currentCountry)
    } else {
      favorites[currentCountry] = false
      $('#country').removeClass('fav')

      let indexOfCurrent = savedFavorites.indexOf(currentCountry)
      savedFavorites.splice(indexOfCurrent, 1)
    }

      // for (var key in favorites) {
      //   let indexOfFalsey
      //   if (favorites[key] === true && !favoritesArray.includes(key)) {
      //     savedFavorites.push(key)
      //     favoritesArray.push(key)
      //   } else if (favorites[key] === false && favoritesArray.includes(key)) {
      //     indexOfFalsey = favoritesArray.indexOf(key)
      //     favoritesArray.splice(indexOfFalsey, 1)
      //   }
      // }

      localStorage.setItem('favorites', JSON.stringify(savedFavorites))
  })
})
