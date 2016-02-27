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

});
