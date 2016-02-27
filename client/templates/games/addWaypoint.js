AutoForm.hooks({
    addWaypoint: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            let gameId = Session.get('gameId');

            console.log(gameId);
            console.log(insertDoc);

            insertDoc.gameId = gameId;

            Meteor.call('addWaypoint', insertDoc, function(err, result){
                sAlert.success("Waypoint added successfully!");
                if(result){
                    Router.go('/game/' + result);
                }
            });

            this.done();

            // necessary to prevent the browser from actually submitting the form itself (e.g. event.stopPropagation())
            return false;
        }
    }
});

Template.addWaypoint.onCreated(function() {
    console.log("GameID: " + this.data.gameId);
    Session.set('gameId', this.data.gameId);
});