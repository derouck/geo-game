Template.overview.onCreated(function () {
    this.subscribe('users');
    this.subscribe('currentGame');
    this.subscribe('beacons');
});

Template.overview.helpers({
  beacons: () => {
    let game = Games.findOne();
//    let shuffledBeacons =_.shuffle(game.beacons());
    return game.beacons();
  }
});
