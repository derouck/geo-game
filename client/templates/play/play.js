Template.map.onCreated(function() {

  this.subscribe('waypoints');

  if(this.subscriptionsReady()){
    console.log("Subs ready");
  }
  else {
    console.log("Subs not ready");
  }
});


Template.map.helpers({

});
