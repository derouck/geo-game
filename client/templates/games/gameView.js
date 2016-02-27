Template.gameView.onCreated(function(){

});

Template.gameView.helpers({
    game: function () {
        return Games.findOne({_id: this.gameId});
    },
    isAuthor: function(){
        return Meteor.userId() == this.userId;
    }
});

Template.gameView.events({

});
