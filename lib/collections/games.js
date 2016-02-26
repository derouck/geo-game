Games = new Mongo.Collection("games");

Schemas.Games = new SimpleSchema([{
    name: {
        type: String
    },
    description: {
        type: String
    }
}, Schemas.baseSchema]);

Games.attachSchema(Schemas.Games);

Games.helpers({
    waypoints(){
        return Waypoints.find({gameId: this._id}).fetch();
    }
});
