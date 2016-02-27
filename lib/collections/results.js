Results = new Ground.Collection("results");

Schemas.Results = new SimpleSchema([{
    gameId: {
        type: String
    },
    score: {
      type: Number
    },
    status: {
      type: Number,
      defaultValue:0
    },
    data: {
      type: [Object]
    },
    "data.$.waypointId": {
      type: String
    },
    "data.$.timestamp": {
      type: Date
        /*,
      autoValue: function () {
          if (this.isInsert) {
              return new Date;
          } else if (this.isUpsert) {
              return {$setOnInsert: new Date};
          } else {
              this.unset();
          }
      }*/
    },
    "data.$.points": {
        type: Number
    },
    "data.$.distance": {
        type: Number,
        decimal: true
    },
    status: {
        type: Number
    }

}, Schemas.baseSchema]);

Results.attachSchema(Schemas.Results);
