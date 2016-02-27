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
                            return Meteor.users.find({_id: result.userId}, {fields: "username"});
                        }
                    }
                ]
            }
        ]
    }
});