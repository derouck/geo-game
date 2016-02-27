Template.gameView.onCreated(function(){

});

Template.gameView.helpers({
    game: function () {
        return Games.findOne({_id: this.gameId});
    },
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
    "click #startGame": function(){
        console.log(this._id);

        Meteor.call('startGame', this._id, function(err,result){
            if(!err){
                sAlert.success('Game started!');
                Router.go('/play');
            }
        });
    },
    "click #publishGame": function(){
        console.log(this._id);

        Meteor.call('publishGame', this._id, function(err,result){
            if(!err){
                sAlert.success('Game published');
            }
        });
    }
});
