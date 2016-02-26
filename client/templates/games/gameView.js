Template.gameView.onCreated(function(){

});

Template.gameView.helpers({
  game(){
    
    return Games.findOne(this.params._id);
  }
});

Template.gameView.events({

});
