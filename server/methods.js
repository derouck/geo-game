var teamNames = [
	"Red Papas",
	"Yellow Flowers",
	"Orange Panthers",
	"Blue Ocean",
	"Soppa de papa",
	"Surf Turf",
	"Boring monkey"
];

Meteor.methods({
	updateNearestBeacon: function(id) {
		return Meteor.users.update({_id: this.userId},{$set:{nearestBeacon:id}});
	},
	saveLocationToHistory: function(resultId,location) {
		LocationsHistory.insert({
	    userId: this.userId,
	    resultId:resultId,
	    location:location,
	    time: new Date()
	  });
	},
	joinGame: function(id) {
		return Games.update(id, {$push: {players: this.userId}});
	},
	createGame: function(doc) {
		console.log(doc);
		doc.userId = this.userId;
		let gameId = Games.insert(doc);

		return gameId;
	},
	startGame: function(id) {
		let beacons = Beacons.find().fetch();

		let shuffledBeacons =_.shuffle(beacons);

		let beacon_ordering = [];
		shuffledBeacons.forEach(function(beacon){
			beacon_ordering.push(beacon._id);
		});

		console.log(beacon_ordering);


		return Games.update(id, {$set: {status: 'inProgress', ordering: beacon_ordering, wiresCut: 0, dateStarted: new Date()}});
	},
	//cutWire: function(currentBeaconId) {
    //
	//	let game = Games.findOne({status: "inProgress", players: {$in:[this.userId]}});
    //
	//	console.log(game);
    //
	//	if(! game){
	//		throw new Meteor.Error(403, "You don't have a game.");
	//	}
    //
	//	let amountOfBombs = game.ordering.length;
    //
	//	let result;
	//	game.ordering.forEach(function(beaconId, index){
	//		if(beaconId == currentBeaconId){
	//			console.log("Index of the bomb: " + index);
	//			console.log("Wires cut: " + game.wiresCut);
	//			console.log("AMount of bombs: " + amountOfBombs);
    //
	//			// index of bomb will start at 0, so first bomb will be zero and at that moment wirestCut=0 as well
	//			//if(index == game.wiresCut){
	//				Games.update(game._id, {$inc: {wiresCut: 1}});
	//				Games.update(game._id, {$addToSet: {defusedBombs: beaconId}});
    //
	//				if(amountOfBombs == game.wiresCut + 1){
	//					// all the bombs are cut, hurray!
    //
	//					let endDate = new Date();
	//					let score = calculateTimeDifference(game.dateStarted, endDate);
    //
	//					if(game.mistakes && game.mistakes > 0) {
	//						score = score + (game.mistakes * 100);
	//						console.log(score);
	//					}
	//					Games.update(game._id, {$set: {status: 'Finished', dateEnd: endDate, score: score}});
    //
	//					result = BOMB_DEFUSED;
	//					return true;
	//				}
    //
	//				result = BOMB_PARTIALLY_DEFUSED;
	//				return true;
	//			//}else{
	//			//	Games.update(game._id, {$inc: {mistakesMade: 1}});
     //           //
	//			//	result = BOMB_EXPLODED;
	//			//	return true;
	//			//}
	//		}
	//	});
    //
	//	return result;
	//}
	"addWaypoint": function(doc){
		const game = Games.findOne(doc.gameId);
		if(! game){
			throw new Meteor.Error(402, "You've given a wrong game!");
		}

		console.log(doc);

		doc.userId = this.userId;
		Waypoints.insert(doc);

		return doc.gameId;
	}
});

function calculateTimeDifference(startMoment, endMoment)
{
	let durationInSeconds = (endMoment-startMoment) / 1000;
	return durationInSeconds;
}
