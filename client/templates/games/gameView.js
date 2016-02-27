Template.gameView.onCreated(function(){

});

Template.gameView.helpers({
    game: function () {
        return Games.findOne({_id: this.gameId});
    },

    // working in game context
    isAuthor: function(){
        return Meteor.userId() == this.userId;
    },
    waypoints: function(){
        return Waypoints.find().fetch();
    },
    isEditable: function(){
        console.log(this);
        console.log(this.status +  ">=? " + GAME_STATUS_PUBLISHED);
        return this.status < GAME_STATUS_PUBLISHED;
    }
});

Template.gameView.events({
    'click #publishGame': function(){
        console.log(this);
        console.log("try to publish game: "+ this._id);
        Meteor.call('publishGame',this._id, function(err, result){
            if(!err){
                sAlert.success('The game is published!');
            }
        });
    },
    "click #startGame": function(){
        console.log(this);
        console.log("try to start a game: "+ this._id);
        Meteor.call('startGame',this._id, function(err, result){
            if(!err){
                sAlert.success('The game is started!');
                Router.go('/play');
            }else{
                sAlert.error('Something went wrong starting the game :-(');
            }
        });
    }
});
