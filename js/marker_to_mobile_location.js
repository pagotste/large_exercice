/*document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  document.getElementById("getPosition").addEventListener("click", getPosition);
}*/

var map = new google.maps.Map(document.getElementById('map'),{
  zoom: 3,
  center: {lat: 0, lng: 0}
});

function getPosition() {
  var options = {
    enableHighAccuracy: true,
    maximumAge: 3600000
  }

  var searchResult = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
    var latlng = {lat:position.coords.latitude,lng:position.coords.longitude};
    putMarker(latlng);
  };

  function onError(error) {
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }
}

function putMarker(coords){
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'location': coords}, function(results, status){
    if (status === 'OK'){
      map.setZoom(9);
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
