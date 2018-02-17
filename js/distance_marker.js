/*Documentation : https://developers.google.com/maps/documentation/javascript/reference#spherical
*/

var map = new google.maps.Map(document.getElementById('map'),{
  zoom: 8,
  center: {lat: 65.0120, lng: 25.465}
});

var mk1,mk2;
var geocoder = new google.maps.Geocoder();

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

function computeDistance(){
  var distance = google.maps.geometry.spherical.computeDistanceBetween(mk1.getPosition(),mk2.getPosition())/1000;
  alert("Distance : " + distance.toFixed(3) + " km");
}
