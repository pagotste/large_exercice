/* Documentation : https://developers.google.com/maps/documentation/javascript/directions*/

var map = new google.maps.Map(document.getElementById('map'),{
  zoom: 8,
  center: {lat: 65.0120, lng: 25.465}
});

var mk1,mk2;
var geocoder = new google.maps.Geocoder();

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById("directionsBlock"));


function placeMarker(address,nb){
  if(address != ""){
    geocoder.geocode({'address': address}, function(results, status){
      if (status === 'OK'){
        map.setCenter(results[0].geometry.location);
        if(nb == 1){
          if(mk1) mk1.setMap(null);
          mk1 = new google.maps.Marker({
            map: map,
            label:"A",
            position: results[0].geometry.location
          });
        } else {
          if(mk2) mk2.setMap(null);
          mk2 = new google.maps.Marker({
            map: map,
            label:"B",
            position: results[0].geometry.location
          });
        }
      }else{
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

function calculateItinerary(){
  var start = mk1.getPosition();
  var end = mk2.getPosition();
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
