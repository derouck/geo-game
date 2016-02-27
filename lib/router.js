Router.configure({
    layoutTemplate: 'layout'
});

Router.plugin('ensureSignedIn', {
    except:['login', 'atEnrollAccount','atSignIn','atForgotPassword']
});

Router.route('play', {
    path: '/play'
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

Router.route('gameView', {
    path: "/game/:_id",
    waitOn: function () {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        return Meteor.subscribe('currentGame', this.params._id);
    },
    data: function(){
        return {
            gameId: this.params._id
        }
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
        return {
            gameId: this.params._id
        }
    }
});
