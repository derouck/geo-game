Meteor.subscribe('currentGame');

Meteor.startup(function() {
  GoogleMaps.load();

  sAlert.config({
      effect: "genie",
      position: "bottom-right",
      timeout: 3000,
      html: false,
      onRouteClose: false
  });
});
