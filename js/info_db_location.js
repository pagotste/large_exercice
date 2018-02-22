/* documentation : https://developers.google.com/maps/documentation/javascript/info-windows-to-db */

var map = new google.maps.Map(document.getElementById('map'),{
  zoom: 8,
  center: {lat: 65.0120, lng: 25.465}
});

var marker;

function placeMarker(){
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('addressToSearch').value;
  if (address){
    geocoder.geocode({'address': address}, function(results, status){
      if (status === 'OK'){
        if(marker) marker.setMap(null);
        map.setCenter(results[0].geometry.location);
        marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
      }else{
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

google.maps.event.addListener(map, 'click', function(event) {
  addMarker(event.latLng, map);
});

function addMarker(location, map) {
  if(marker) marker.setMap(null);
  marker = new google.maps.Marker({
    position: location,
    map: map
  });
  document.getElementById('addressToSearch').value = "";
}

var ip = "192.168.8.102:8080";
var myurl = "http://"+ ip +"/mip_lgex/info_db.php";

function addData(){
  var info = document.getElementById("infoToAdd").value;
  if(info){
    var lat = marker.position.lat();
    var lng = marker.position.lng();
    var reqURL = myurl + "?lat="+lat+"&lng="+lng+"&info="+info+"&type=info";

    downloadUrl(reqURL, function(data, responseCode) {

      if (responseCode == 200 && data.length <= 1) {
        alert("Error");
      } else {
        alert("Data added : " + info + " "+ lat + " " + lng);
      }
    });

    document.getElementById('addressToSearch').value = "";
    document.getElementById('infoToAdd').value = "";
    marker.setMap(null);
  }
}

function downloadUrl(myurl,callback) {
 var request = window.ActiveXObject ?
     new ActiveXObject('Microsoft.XMLHTTP') :
     new XMLHttpRequest;

 request.onreadystatechange = function() {
   if (request.readyState == 4) {
     request.onreadystatechange = doNothing;
     callback(request, request.status);
   }
 };

 request.open('GET', myurl, true);
 request.send(null);
}

function doNothing(){}
