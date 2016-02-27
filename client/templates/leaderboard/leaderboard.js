Template.leaderboard.onCreated(function(){
	var instance = this;

	instance.autorun(function () {

	});
});

Results.helpers({
	username: function() {
		return Meteor.users.findOne(this.userId);
	}
});

Template.leaderboard.helpers({
	results: function(){
		return Results.find({gameId: this.gameId}).fetch();
	}
});
