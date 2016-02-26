Waypoints = new Mongo.Collection("waypoints");
Games = new Mongo.Collection("games");

Games.helpers({
    waypoints(){
        return Waypoints.find({gameId: this._id}).fetch();
    }
});
