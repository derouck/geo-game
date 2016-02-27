const getCurrentResult = () => {

  return Result.find({userId:Meteor.userId()});
}

const getCurrentGame = () => {

  return Games.find({_id:getCurrentResult().fetch().id});
}

const getCurrentGameWaypoints = () => {

  //let gameId = getCurrentGame().fetch().id;
  let gameId = "3aP2G43Dfge9E7Wib";
  return Waypoints.find({gameId:gameId}).fetch();
}

Template.map.onCreated(function() {

  const self = this;
  const handle  = this.subscribe('waypoints');
  self.autorun(() => {
    const isReady = handle.ready();
    console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);
  });

});


Template.play.helpers({
  waypoints(){
    let wps = getCurrentGameWaypoints();
    return wps;
  },
  resultId(){
    let wps = getCurrentResult().fetch().id;
    return wps;
  }
});
