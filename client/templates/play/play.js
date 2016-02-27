const getCurrentResult = () => {

  return Results.findOne({userId:Meteor.userId()});
}

const getCurrentGame = () => {
  gameId = getCurrentResult().gameId;
  return Games.findOne({_id:gameId});
}

const getCurrentGameWaypoints = () => {
  game = getCurrentGame();
  let gameId = getCurrentGame()._id;
  return Waypoints.find({gameId:gameId}).fetch();
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
    return LocationsHistory.find({resultId:getCurrentResult()._id, userId: Meteor.userId()});
  },
  resultId(){
    let wps = getCurrentResult()._id;
    return wps;
  }
});
