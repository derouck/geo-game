Meteor.methods({
	// methods to create something new
	createGame: function(doc) {
		console.log("Create game");
		doc.userId = this.userId;
		doc.status = GAME_STATUS_CREATED;

		console.log(doc);
		return Games.insert(doc);
	},
	publishGame: function(id){
		console.log("Publish game: " + id);
		Games.update({_id: id}, {$set: {status: GAME_STATUS_PUBLISHED}});
	},
	addWaypoint: function(doc){
		const game = Games.findOne(doc.gameId);
		if(! game){
			throw new Meteor.Error(402, "You've given a wrong game!");
		}

		doc.userId = this.userId;
		Waypoints.insert(doc);

		return doc.gameId;
	},

	// start a game
	startGame: function(id) {
		console.log("Start game: " + id);

		// validate user logged in
		// validate game

		let document = {
			userId: this.userId,
			gameId: id,
			score: 0,
			status: GAME_STARTED,
			data: []
		};

		return Results.insert(document);
	},
	saveLocationToHistory: function(resultId,location) {
		LocationsHistory.insert({
			userId: this.userId,
			resultId:resultId,
			location:location,
			time: new Date()
		});
	}
});

function calculateTimeDifference(startMoment, endMoment)
{
	let durationInSeconds = (endMoment-startMoment) / 1000;
	return durationInSeconds;
}
