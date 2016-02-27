Router.configure({
    layoutTemplate: 'layout'
});

Router.plugin('ensureSignedIn', {
    except:['login', 'atEnrollAccount','atSignIn','atForgotPassword']
});


Router.route('rules', {
    path: '/rules'
});

Router.route('play', {
    path: '/play'
});

Router.route('rulesInAdvance', {
    path: '/rulesInAdvance'
});

Router.route('/login', {
    layoutTemplate: 'layout',
    action: function () {
        Router.go('/gamesList');
    }
});

Router.route('/gamesList', {
    name: "gamesList",
    waitOn: function () {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return Meteor.subscribe('games');
    },
    template: "gamesList"
});

Router.route('/game/:_id', {
    name: "gameView",
    waitOn: function () {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return Meteor.subscribe('currentGame', this.params._id);
    },
    data: function(){
        console.log(this.params._id);
        console.log(Games.findOne(this.params._id));
        return Games.findOne(this.params._id);
    },
    template: "gameView"
});

Router.route('leaderboard');

Router.route('createGame', {
    path: "/create-game"
});


Router.route('addWaypoint', {
    path: "/add-waypoint/:_id",
    waitOn: function () {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return Meteor.subscribe('currentGame', this.params._id);
    },
    data: function(){
        return Games.findOne(this.params._id);
    },

});
