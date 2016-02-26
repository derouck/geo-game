Template.login.onCreated(function () {
	var instance = this;
	instance.autorun(function () {
		instance.subscribe('games');
	});
});

Template.login.helpers({
	games: function () {
		return Games.find({status: 'ready'});
	}
});

Template.login.events({
	// 'click .join-game': function (event) {
	// 	Session.setPersistent('currentGameId', this._id);
	// 	Meteor.call('joinGame', this._id, function(error, response) {
	// 		if(error) {
	// 			console.log(error.message);
	// 		} else if(response === 1) {
	// 			console.log('You have joined the game!');
	// 		}
	// 	});
	// },
	// 'click .create-game': function (event) {
	// 	Meteor.call('createGame', function(error, response) {
	// 		if(error) {
	// 			console.log(error.message);
	// 		} else if(response) {
	// 			console.log('You have create an new game!');
	// 			Session.setPersistent('currentGameId', response);
	// 		}
	// 	});
	// }
});
