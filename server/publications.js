Meteor.publish('usersForTeam', function() {
	return Meteor.users.find({"status.online": true});
});

// Share all usernames
Meteor.publish('users', function() {
   return Meteor.users.find({}); //, {"fields": { "username": 1,"nearestBeacon":1}});
});

Meteor.publish('beacons', function() {
   return Beacons.find();
});

Meteor.publish('currentBomb', function(id) {
   return Beacons.find({_id: id});
});

Meteor.publish('games', function() {
   return Games.find();
});

Meteor.publish('currentGame', function() {
  return Games.find({status: "inProgress", players: {$in: [this.userId]}});
});

Meteor.publish('readyGames', function(){
	return Games.find({status: "ready"});
});

Meteor.publish('teamScores', function(){
    return Games.find({status: "Finished"});
});
