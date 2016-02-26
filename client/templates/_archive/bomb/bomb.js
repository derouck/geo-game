function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}

Template.currentBomb.onCreated(function(){

    bomb = Beacons.findOne();
    instance = Template.instance();
    instance.beaconsFound = new ReactiveVar( false );
    instance.Bomb = bomb;
    if (Meteor.isCordova) {

      region = new ReactiveBeaconRegion({identifier: bomb.name, uuid: bomb.uuid});

      self = this;
      instance.autorun(function () {

        if (region.getBeaconRegion().beacons.length) {
            let beacons = region.getBeaconRegion().beacons;
            //console.log(beacons);
            //Template.instance().beaconsFound.set();
            _.each(beacons, function(element){
                //console.log(element.uuid, element.minor, element.major);
                if(element.minor == bomb.minor && element.major == bomb.major){
                  instance.beaconsFound.set(element.proximity);
                  //console.log("beacon in region "+bomb.minor+" "+bomb.major);


                  if(element.proximity == 'ProximityFar' || element.proximity == 'ProximityImmediate' || element.proximity == 'ProximityNear'){
                    Meteor.call('updateNearestBeacon', bomb._id);
                  }
                  else {
                    Meteor.call('updateNearestBeacon', null);
                  }
                }
            });

        }
      });
    }

});

Template.currentBomb.helpers({
   currentBomb() {
      console.log();
      return Beacons.findOne();
   },
   proximity: function(){
    return Template.instance().beaconsFound.get();
    //return Session.get('subBeaconList');
  },
  proximity3: function(){
      if(! Meteor.isCordova){
          return true;
      }else{
          return (Template.instance().beaconsFound.get() =='ProximityImmediate');
          //return Session.get('subBeaconList');
      }
  },
  proximity2: function(){
   return (Template.instance().beaconsFound.get() =='ProximityNear');
   //return Session.get('subBeaconList');
  },
  proximity1: function(){
   return (Template.instance().beaconsFound.get() =='ProximityFar');
   //return Session.get('subBeaconList');
  },
  proximity0: function(){
   return (Template.instance().beaconsFound.get() =='ProximityUnknown');
   //return Session.get('subBeaconList');
 },
 nearByUsers: function(){
   //console.log(this.Bomb._id);
   let game = Games.findOne();
   let bomb = Beacons.findOne();
   let currentUsers = Meteor.users.find({nearestBeacon:bomb._id}).fetch();
   let currentUsersIds = _.map(currentUsers, function(value, key){ return value._id});
   let currentUsersOfGame = _.intersection(currentUsersIds, game.players)
   console.log(currentUsersIds, game.players, currentUsersOfGame);
   return currentUsersOfGame;
 },
 canCut: function(){
     if(! Meteor.isCordova){
         return true;
     }else {
         let game = Games.findOne();
         let bomb = Beacons.findOne();
         let currentUsers = Meteor.users.find({nearestBeacon: bomb._id}).fetch();
         let currentUsersIds = _.map(currentUsers, function (value, key) {
             return value._id
         });
         let currentUsersOfGame = _.intersection(currentUsersIds, game.players)

         return (currentUsersOfGame.length >= 2);
     }
 },
 userById:function (id){
   return Meteor.users.findOne(id);
 },
    isDisarmed: function(){
        let game = Games.findOne();
        let bomb = Beacons.findOne();

        console.log("isdisarmed?")
        if(! game.defusedBombs){
            console.log("defused bombs not set");
            game.defusedBombs = [];
        }

        let isDisarmed = false;
        game.defusedBombs.forEach(function(disarmedBomb){
            console.log("DisarmedBomb" + disarmedBomb);
            console.log("Currentbomb" + bomb._id);
            if (disarmedBomb == bomb._id){
                console.log("disarmed !!!!!");
                isDisarmed = true;
                return true;
            }
        });
        return isDisarmed;
    }

});

Template.currentBomb.events({
  'click #cutWire': function() {
    let bomb = Beacons.findOne();
    Meteor.call('cutWire', bomb._id, function(err, result){
        console.log("RESULT: " + result);

        if(err) {
            console.log(err);
            alert(err.message);
        }

        if(result == BOMB_PARTIALLY_DEFUSED){
            alert("Bomb defused, up to the next!");
            Router.go('/overview');
        }

        if(result == BOMB_EXPLODED){
            alert("Kaboom, try another first!");
            Router.go('/overview');
        }

        if(result == BOMB_DEFUSED){
            alert("Congratulations! You've defused the bomb");
            Router.go("/winner");
        }
    });
  }
});

Template.currentBomb.onDestroyed(function () {
  Meteor.call('updateNearestBeacon', null);
});
