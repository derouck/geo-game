Games = new Ground.Collection("games");

Schemas.Games = new SimpleSchema([{
    name: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Number
    }
}, Schemas.baseSchema]);

Games.attachSchema(Schemas.Games);

Games.helpers({
    waypoints(){
        return Waypoints.find({gameId: this._id}).fetch();
    }
});

Schemas.CreateGameForm = Schemas.Games.pick("name", "description");