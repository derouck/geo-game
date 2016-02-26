Template.leaderboard.onCreated(function(){
	var instance = this;

	instance.autorun(function () {
		instance.subscribe('teamScores');
	});
});

Template.leaderboard.helpers({
	teams: function(){
		return Games.find({}).fetch();
	}
});
