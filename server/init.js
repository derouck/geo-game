Meteor.startup(function () {
    if(Meteor.users.find().count() == 0) {
        var users = [
            {name: "chris", username: "chris", email: "chris@geogames.com", roles: ['admin']},
            {name: "alexis", username: "alexis", email: "alexis@geogames.com", roles: ['admin']},
            {name: "joni", username: "joni", email: "joni@geogames.com", roles: ['admin']}
        ];

        var userId;
        _.each(users, function (user) {

            userId = Accounts.createUser({
                username: user.name,
                email: user.email,
                password: "geogames"
            });

            //    if (user.roles.length > 0) {
            //        // Need _id of existing user record so this call must come
            //        // after `Accounts.createUser` or `Accounts.onCreate`
            //        Roles.addUsersToRoles(id, user.roles); //, 'default-group');
            //    }
        });

        let user = Meteor.users.findOne();

        Games.remove({});
        Games.insert({name:"Test game", description:"Blabla", userId: user._id});

        let game = Games.findOne();

        Waypoints.insert({ "name" : "start point", "description" : ".....", "location" : "28.149744799999997,-15.43010240000001", "userId" :user._id, "gameId" : game._id});
        Waypoints.insert({ "name" : "start point", "description" : ".....", "location" : "28.149745799999997,-15.43010340000001", "userId" :user._id, "gameId" : game._id});
        Waypoints.insert({ "name" : "start point", "description" : ".....", "location" : "28.149746799999997,-15.43010440000001", "userId" :user._id, "gameId" : game._id});
        Waypoints.insert({ "name" : "start point", "description" : ".....", "location" : "28.149747799999997,-15.43010540000001", "userId" :user._id, "gameId" : game._id});
        Waypoints.insert({ "name" : "start point", "description" : ".....", "location" : "28.149749799999997,-15.43010640000001", "userId" :user._id, "gameId" : game._id});
        Waypoints.insert({ "name" : "start point", "description" : ".....", "location" : "28.149741799999997,-15.43010740000001", "userId" :user._id, "gameId" : game._id});
        Waypoints.insert({ "name" : "start point", "description" : ".....", "location" : "28.149742799999997,-15.43010840000001", "userId" :user._id, "gameId" : game._id});

        if(Results.find().count() === 0) {

           game = Games.findOne();


          Results.insert({
            userId: user._id,
            gameId: game._id,
            score: 123,
            data:[
              {
                waypointId: "dAD6J3gGmos7Rnmck",
                points: 10
              },
              {
                waypointId: "dAD6J3gGmos7Rnmck",
                points: 20
              },
              {
                waypointId: "dAD6J3gGmos7Rnmck",
                points: 30
              }
            ]
          }, function(err, data){
            if(err) {
              throw err;
            }
          });
        }





    }


});
