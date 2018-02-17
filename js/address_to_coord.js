/* https://developers.google.com/maps/documentation/javascript/geocoding*/

function getAddress(){
	var geocoder = new google.maps.Geocoder();
	var address = document.getElementById("addressToSearch").value;

	geocoder.geocode({'address': address}, function(results,status){
		if(status === 'OK'){
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();

			var resultBlock = document.getElementById("result");
			resultBlock.innerHTML = "Latitude: "+lat+"<br>Longitude: "+lng;
		} else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
}
