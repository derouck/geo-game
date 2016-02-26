Schemas = {};

Schemas.baseSchema = new SimpleSchema({
    // Set user ID for a post
    userId: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
            //    this.unset();
            //    return this.userId;
            } else {
                this.unset();
            }
        }
    },
    // Force value to be current date (on server) upon insert
    // and prevent updates thereafter.
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date;
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date};
            } else {
                this.unset();
            }
        }
    },
    // Force value to be current date (on server) upon update
    // and don't allow it to be set upon insert.
    updatedAt: {
        type: Date,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    }
});