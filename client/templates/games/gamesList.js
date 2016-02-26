Template.gamesList.onCreated(function(){

});

Template.gamesList.helpers({
  games(){
    return Games.find();
  }
});

Template.gamesList.events({
  "click .gameCard": function (event) {
    event.preventDefault();
    Router.go('/game/'+this._id);
  }
});
