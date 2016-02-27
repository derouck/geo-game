Template.gameView.onCreated(function(){

});

Template.gameView.helpers({
    game(){
      console.log(this.data);
      console.log(this.data.game);
      return this.game;
    },
    isAuthor(){
        return Meteor.userId() == this.game.userId;
    }
});

Template.gameView.events({

});
