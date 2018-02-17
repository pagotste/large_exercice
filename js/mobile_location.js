/* https://www.tutorialspoint.com/cordova/cordova_geolocation.htm
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html#navigatorgeolocationgetcurrentposition*/

function getPosition() {

  var searchResult = navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});

  function onSuccess(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n');
  };

  function onError(error) {
    alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }
}
