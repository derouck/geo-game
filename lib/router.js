var OnBeforeActions = {
    loginRequired: function(){
        if(!Meteor.userId()) {
            Router.go('/login');
        } else {
            this.next();
        }
    }
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
	except: ['login','logout']
});

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
	subscriptions: function() {
		// returning a subscription handle or an array of subscription handles
		// adds them to the wait list.
		return [
			//Meteor.subscribe('readyGames'),
			//Meteor.subscribe('currentGame')
		];
	},
	action: function () {
    Router.go('/overview');
  // 	if (this.ready()) {
	// 		if (Games.find({status: "inProgress", players: {$in: [Meteor.userId()]}}).count() == 1) {
	// 			// there is a current game in progress
	//
	// 		} else if(Games.find({status: "ready", players: {$in: [Meteor.userId()]}}).count() == 1) {
	// 			// joined a game not started yet
	// 			this.render('waitingForUsers');
	// 		} else {
	// 			this.render();
	// 		}
	// 	} else {
	// 		console.log('Loading');
	// 	}
	// }
});


Router.route('/gamesList', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
    return Meteor.subscribe('games');
  },

  action: function () {
    if (this.ready()) {
      if(Games.find().count() == 0){
        Router.go('/login');
      } else {
          this.render();
      }
    } else {
      console.log('Loading');
    }
  }
});

Router.route('/team', {
  subscriptions: function() {
    // returning a subscription handle or an array of subscription handles
    // adds them to the wait list.
		return [
			Meteor.subscribe('readyGames'),
			Meteor.subscribe('currentGame')
		];
  },

  action: function () {
    if (this.ready()) {
      if(Games.find().count() == 0){
        Router.go('/login');
      } else {
				this.render();
      }
    } else {
      console.log('Loading');
    }
  }
});

Router.route('/bomb/:_id', {
    name: "currentBomb",
    template: "currentBomb",
    subscriptions: function() {
        // returning a subscription handle or an array of subscription handles
        // adds them to the wait list.
        console.log(this.params._id);
        return [
            Meteor.subscribe('currentBomb', this.params._id),
            Meteor.subscribe('currentGame'),
            Meteor.subscribe('users')
        ];
    },
    action: function () {
        if (this.ready()) {
            if(Games.find().count() == 0){
                Router.go('/login');
            } else {
                this.render();
            }
        } else {
            console.log('Loading');
        }
    }
});

Router.map(function() {
    this.route('winner');
});

Router.map(function() {
    this.route('leaderboard');
});
