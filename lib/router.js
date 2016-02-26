Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('rules', {
    path: '/rules'
  });

	this.route('rulesInAdvance', {
		path: '/rulesInAdvance'
	});
});

Router.route('/login', {
	layoutTemplate: 'layout',
	action: function () {
    Router.go('/gamesList');
	}
});


Router.route('/gamesList', {
  name:"gamesList",
  waitOn: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe('games');
  },
  template: "gamesList"
});

Router.route('/game/:_id', {
  name:"gameView",
  waitOn: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe('currentGame', this.params._id);
  },
  template: "gameView"
});

Router.map(function() {
    this.route('leaderboard');
});
