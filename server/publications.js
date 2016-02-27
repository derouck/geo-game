// Meteor.publish('usersForTeam', function() {
// 	return Meteor.users.find({"status.online": true});
// });

// Share all usernames
// Meteor.publish('users', function() {
//    return Meteor.users.find({}); //, {"fields": { "username": 1,"nearestBeacon":1}});
// });

Meteor.publish('waypoints', function() {
   return Waypoints.find();
});

Meteor.publish('games', function() {
   return Games.find();
});

Meteor.publishComposite('currentGame', function(gameId){
    return {
        find: function () {
            console.log("GameID" + gameId);
            return Games.find({_id: gameId});
        },
        children: [
            {
                find: function (game) {
                    return Waypoints.find({gameId: game._id});
                }
            },
            {
                find: function (game) {
                    return Results.find({gameId: game._id});
                },
                children: [
                    {
                        find: function (result) {
                            return Meteor.users.find({_id: result.userId}, {fields: {"username":1}});
                        }
                    }
                ]
            }
        ]
    }
});

Meteor.publishComposite('currentResult', function(){
    return {
        find: function () {
            return Results.find({userId: this.userId, status:1});
        },
        children: [
            {
                find: function (result) {
                    return Games.find({_id: result.gameId});
                },
                children: [
                    {
                        find: function (game) {
                            return Waypoints.find({gameId: game._id});
                        }
                    }
                ]
            },
            {
                find: function (result) {
                    return LocationsHistory.find({resultId: result._id, userId:this.userId});
                }
            }
        ]
    }
});

Meteor.publish('readyGames', function(){
	return Games.find({status: "ready"});
});

Meteor.publish('teamScores', function(){
    return Games.find({status: "Finished"});
});
