MAP_ZOOM = 15;


let saveLocationToResult = (resultId, location) => {
  Result.update({_id:resultId}, {$inc:{locations:location}});
}

Template.map.onCreated(function() {
  var self = this;

  self.data.waypoints = self.data.waypoints | [];
  self.data.resultId = self.data.resultId | null;
  self.data.saveLocation = self.data.saveLocation | false;
  self.data.showCurrentLocation = self.data.showCurrentLocation | false;

  GoogleMaps.ready('map', function(map) {
    var marker;
    var lastSaved = Date.now();
    var waypoints = [];


    // plotting waypoints
    _.each(self.data.waypoints, (element) => {
          let wpLatLng = element.location.split(",");
          [lat, lng] = wpLatLng;
          let waypoint = waypoints[element._id];
          if (! waypoint) {
            waypoint = new google.maps.Marker({
              position: new google.maps.LatLng(lat, lng),
              map: map.instance
            });
          }
          // The marker already exists, so we'll just change its position.
          else {
            waypoint.setPosition(latLng);
          }
    });

    // Create and move the marker when latLng changes.
    self.autorun(function() {


      if(self.data.showCurrentLocation){
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        // If the marker doesn't yet exist, create it.
        if (! marker) {
          var image = 'http://i.stack.imgur.com/orZ4x.png';
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance,
            icon: image
          });
        }
        // The marker already exists, so we'll just change its position.
        else {
          marker.setPosition(latLng);
        }
        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker.getPosition());
        map.instance.setZoom(MAP_ZOOM);
      }


      if(self.data.saveLocation && lastSaved < (Date.now - 5000)){
        if(!self.data.resultId)
          Meteor.error('resultId not set');
        saveLocationToResult();
        lastSaved = Date.now;
      }
    });
  });
});


Template.map.helpers({
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
  }
});
