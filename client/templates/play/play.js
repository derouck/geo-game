const getCurrentResult = () => {

  return Results.findOne({userId:Meteor.userId()});
}
const getCurrentResultId = () => {
  let result = getCurrentResult();
  if(result){
    return result._id;
  }
  else {
    return null;
  }
}

const getCurrentGame = () => {
  result = getCurrentResult();
  if(result){
    return Games.findOne({_id:result.gameId});
  }
  else {
    return null;
  }
}

const getCurrentGameWaypoints = () => {
  game = getCurrentGame();
  if(game){
    let gameId = getCurrentGame()._id;
    return Waypoints.find({gameId:gameId}).fetch();
  }
  else {
    return [];
  }
}

Template.map.onCreated(function() {

  const self = this;
  const handle  = this.subscribe('currentResult');
  self.autorun(() => {
    const isReady = handle.ready();
  });

});


Template.play.helpers({
  waypoints(){
    let wps = getCurrentGameWaypoints();
    return wps;
  },
  locationsHistory(){
    return LocationsHistory.find({resultId:getCurrentResultId(), userId: Meteor.userId()});
  },
  resultId(){
    let wps = getCurrentResultId();
    return wps;
  }
});

Template.play.events({
<<<<<<< HEAD
  "click button.button-stop": function (event, template) {
    console.log("stop");
    confirm("Are your sure you want to stop this game?", function(val){
      if(val){
        Meter.call('stopGame');
=======
  "click .button-stop": function (event, template) {
    console.log("stop");
    confirm("Are your sure you want to stop this game?", function(val){
      if(val){
        Meteor.call('stopGame');
>>>>>>> b27436ddf06fe9bc4f1e2ca0b568e2f0861f48e7
        Router.go('gamesList');
      }
    })

  }
});
