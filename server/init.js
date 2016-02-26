Meteor.startup(function () {
    if(Meteor.users.find().count() == 0) {
        var users = [
            {name: "chris", email: "chris@geogames.com", roles: ['admin']},
            {name: "alexis", email: "alexis@geogames.com", roles: ['admin']},
            {name: "joni", email: "joni@geogames.com", roles: ['admin']}
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
    }
});
