/* documentation : https://developers.google.com/maps/documentation/javascript/infowindows
https://developers.google.com/maps/documentation/javascript/mysql-to-maps#echoxml */

var map = new google.maps.Map(document.getElementById('map'),{
  zoom: 2,
  center: {lat: 0, lng: 0}
});
var infoWindow = new google.maps.InfoWindow;

var ip = "192.168.8.102:8080";
var myurl = "http://"+ ip +"/mip_lgex/load_data.php";

loadData(String(myurl), function(data){
  var xml = data.responseXML;
  var infos = xml.documentElement.getElementsByTagName('mapdatacontent');
  Array.prototype.forEach.call(infos, function(infosElem) {
    var info = infosElem.getAttribute('info');
    var type = infosElem.getAttribute('type');
    var lat = infosElem.getAttribute('lat');
    var lng = infosElem.getAttribute('lng');

    placeMarker(info,lat,lng,type);
  });
});

function placeMarker(data,data_lat,data_lng,type){
  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(data_lat,data_lng);
  geocoder.geocode({'location': latlng}, function(results,status){
    if (status === 'OK'){
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });

      if(type === 'info'){
        var infowincontent= "<p>" + results[0].formatted_address + "<br><b>Info:</b> " + data + "</p>";
      } else {
        var infowincontent = "<p>" + results[0].formatted_address + "<br><img src='" + data + "' width=300em></p>";
      }

      marker.addListener('click', function() {
        infoWindow.setContent(infowincontent);
        infoWindow.open(map, marker);
        map.setCenter(marker.position);
        map.setZoom(8);
      });
    }else{
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function loadData(myurl,callback) {
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
