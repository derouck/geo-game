LocationsHistory = new Ground.Collection("locationsHistory");

Schemas.LocationsHistory = new SimpleSchema([{
    userId: {
        type: String
    },
    resultId: {
        type: String
    },
    location: {
        type: String
    },
    time: {
      type: String
    }
}, Schemas.baseSchema]);

LocationsHistory.attachSchema(Schemas.LocationsHistory);
