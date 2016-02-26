Template.team.onCreated(function(){
	var instance = this;

	instance.autorun(function () {
		instance.subscribe('usersForTeam');
	});
});

Template.team.helpers({
	inGameUsers: function(){
		var gameId = Session.get('currentGameId');
		var game = Games.findOne({'_id': gameId});
		var users = Meteor.users.find();
		var inGameUsers = [];

		users.forEach((user) => {
			game.players.forEach((gameUser) => {
				if(user._id === gameUser) {
					inGameUsers.push(user);
				}
			});
		});

		return inGameUsers;
	}
});
