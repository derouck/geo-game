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

		// Interrupt other running games
		let startedGame = Results.findOne({userId: this.userId, status: GAME_STARTED});
		if(startedGame) {
			Results.update({_id: startedGame._id}, {$set: {status: GAME_INTERRUPTED}});
		}

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
	},
	updateScores: function(doc){
		console.log(doc);

		// Interrupt other running games
		let startedGame = Results.findOne({userId: this.userId, status: GAME_STARTED});
		if(startedGame) {
			doc.forEach(function(entry){
				let document = {};
				document.waypointId = entry._id;
				document.distance = entry.dist;
				//TODO: add score

				document.points = 50;
				document.timestamp = entry.lastTimeStamp;
				console.log(document);

				let updated = false;
				startedGame.data.forEach(function(previousResult){
					if(previousResult.waypointId == entry._id){
						if(previousResult.distance < entry.dist){
							Results.update(
								{_id: startedGame._id},
								{$pull: { data: { waypointId: previousResult.waypointId}}});

							Results.update({_id: startedGame._id}, {$addToSet: {data: document}});

							updated = true;
							return true;
						}
					}
				});

				if(!updated){
					Results.update({_id: startedGame._id}, {$addToSet: {data: document}});
				}
			});
		}
	},
	stopGame: function(){
		console.log("Stop game");

		// Interrupt other running games
		let startedGame = Results.findOne({userId: this.userId, status: GAME_STARTED});
		if(startedGame) {
			Results.update({_id: startedGame._id}, {$set: {status: GAME_FINISHED}});
		}
	}
});

function calculateTimeDifference(startMoment, endMoment)
{
	let durationInSeconds = (endMoment-startMoment) / 1000;
	return durationInSeconds;
}
