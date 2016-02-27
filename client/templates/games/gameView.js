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
    waypointsList: function(){
        return _.map(Waypoints.find().fetch(), function(element){ return element.location});
    }
});

Template.gameView.events({

});
