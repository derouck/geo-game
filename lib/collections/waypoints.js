Waypoints = new Mongo.Collection("waypoints");

Schemas.Waypoints = new SimpleSchema([{
    name: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    }
}, Schemas.baseSchema]);

Waypoints.attachSchema(Schemas.Waypoints);

