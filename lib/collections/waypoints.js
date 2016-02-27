Waypoints = new Ground.Collection("waypoints");

Schemas.Waypoints = new SimpleSchema([{
    name: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String,
        autoform: {
            type: 'map',
            afFieldInput: {
                geolocation: true,
                searchBox: true,
                autolocate: true,
                zoom: 13
            }
        }
    },
    gameId: {
        type: String
    }
}, Schemas.baseSchema]);

Waypoints.attachSchema(Schemas.Waypoints);

Schemas.AddWaypoint = Schemas.Waypoints.pick("name", "description", "location");