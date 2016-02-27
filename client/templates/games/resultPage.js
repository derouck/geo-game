Template.resultpage.onCreated(function(){
	var instance = this;

	instance.autorun(function () {

	});
});

Results.helpers({
	username: function() {
		return Meteor.users.findOne(this.userId);
	}
});

Template.resultpage.helpers({
	results: function(){
		return Results.find({gameId: this.gameId}).fetch();
	},
	gameId: function() {
		return this.gameId;
	}
});
