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
