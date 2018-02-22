var map = new google.maps.Map(document.getElementById('map'),{
  zoom: 8,
  center: {lat: 65.0120, lng: 25.465}
});

var marker;
document.getElementById("uploadimg").addEventListener("click", cameraGetPicture);

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

var img;
var ip = "192.168.8.102:8080";
var myurl = "http://"+ ip +"/mip_lgex/info_db.php";

function addData(srcphone){
  if(!srcphone) img = document.getElementById("imgToAdd").value;

  if(img){
    var lat = marker.position.lat();
    var lng = marker.position.lng();

    var reqURL = myurl + "?lat="+lat+"&lng="+lng+"&info="+img+"&type=img";

    downloadUrl(reqURL, function(data, responseCode) {

      if (responseCode == 200 && data.length <= 1) {
        alert("Error");
      } else {
        alert("Data added");
      }
    });

    document.getElementById('addressToSearch').value = "";
    document.getElementById('imgToAdd').value = "";
    marker.setMap(null);
  }
}

function cameraGetPicture(){
  alert("doesnt work");
  navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY
   });

   function onSuccess(imageData) {
      img = imageData.FILE_URI;
      addData(1);
   }

   function onFail(message) {
      alert('Error: ' + message);
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
