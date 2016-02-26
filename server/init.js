Meteor.startup(function () {
    Beacons.remove({});
    if (Beacons.find().count() === 0) {
        Beacons.insert({
            'uuid': "b9407f30-f5f8-466e-aff9-25556b57fe6d",
            'name': "blue",
            'minor': 59685,
            'major': 38452,
            'description': "I’m sitting quite comfortable over here. When I look to the right, I can see the beach and the ocean.",
            'image': "bomb1.jpg"
        });
        Beacons.insert({
            'uuid': "d0d3fa86-ca76-45ec-9bd9-6af490c204d4",
            'name': "shoe",
            'minor': 24729,
            'major': 8745,
            'description': "Don’t look for me inside the hostel, go outside, don’t look too far, then you will find me!",
            'image': "bomb2.jpg"
        });
        Beacons.insert({
            'uuid': "d0d3fa86-ca76-45ec-9bd9-6af4bbe4d46d",
            'name': "car",
            'minor': 59907,
            'major': 1155,
            'description': "Damn, it smells good in here! They even have a stash of beer in this area.",
            'image': "bomb3.jpg"
        });
        Beacons.insert({
            'uuid': "d0d3fa86-ca76-45ec-9bd9-6af482ad00bd",
            'name': "bicycle",
            'minor': 55579,
            'major': 8158,
            'description': "Don’t look for me inside the hostel, go outside, take a seat, enjoy the view, take a deep breath, but especially, don’t forget me...",
            'image': "bomb4.jpg"
        });
    }

  Games.remove({});
  if (Games.find({status:"ready"}).count() === 0) {

      // fetch all beacons and shuffle them for a new game
      let beacons = Beacons.find().fetch();

      let shuffledBeacons =_.shuffle(beacons);

      let beacon_ordering = [];
      shuffledBeacons.forEach(function(beacon){
          beacon_ordering.push(beacon._id);
      });

      Games.insert({
          teamName:"React Lovers",
          status:"ready",
          players:[],
          ordering: beacon_ordering,
          dateStarted: new Date(),
          defusedBombs: []
        });

      Games.insert({
          teamName:"Crazy Kangaroos",
          status:"Finished",
          players:[],
          ordering: beacon_ordering,
          dateStarted: new Date(),
          dateEnd: new Date(),
          mistakes: 1,
          wiresCut: 4,
          score: 9999999
      });
  }


    const users = [
        "chris@ff.com",
        "alexis@ff.com",
        "jesper@ff.com"
    ];

    if(Meteor.users.find().count() == 0){
        users.forEach(function(user){
            let details = {
                email: user,
                password: "meteorff"
            };
            Accounts.createUser(details);
        });
    }
});
