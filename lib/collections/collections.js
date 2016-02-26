Beacons = new Mongo.Collection("beacons");
Games = new Mongo.Collection("games");

Games.helpers({
    beacons(){
        return Beacons.find({_id: {$in: this.ordering}}).fetch();
    }
});

Schemas.Games = new SimpleSchema([{
    name: {
        type: String
    },
    description: {
        type: String
    }
}, Schemas.baseSchema]);

Games.attachSchema(Schemas.Games);