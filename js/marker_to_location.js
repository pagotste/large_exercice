/* https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple*/

var map = new google.maps.Map(document.getElementById('map'),{
  zoom: 8,
  center: {lat: 65.0120, lng: 25.465}
});

function placeMarker(){
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('addressToSearch').value;
  geocoder.geocode({'address': address}, function(results, status){
    if (status === 'OK'){
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    }else{
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
