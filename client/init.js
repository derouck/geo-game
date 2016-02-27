Meteor.subscribe('currentGame');



Meteor.startup(function() {
  GoogleMaps.load();
});
