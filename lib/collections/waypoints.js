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
            afFieldInput: {
                type: 'map',
                mapType: 'hybrid',
                geolocation: true,
                searchBox: true,
                autolocate: true,
                zoom: 13
            }
        }
    }
}, Schemas.baseSchema]);

Waypoints.attachSchema(Schemas.Waypoints);

Schemas.AddWaypoint = Schemas.Waypoints.pick("name", "description", "location");