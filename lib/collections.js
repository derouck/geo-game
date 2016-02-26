Beacons = new Mongo.Collection("beacons");
Games = new Mongo.Collection("games");

Games.helpers({
    beacons(){
        return Beacons.find({_id: {$in: this.ordering}}).fetch();
    }
});
