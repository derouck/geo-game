Template.beacon.onCreated(function () {
    const instance = Template.instance();

    this.subscribe('currentGame');
    this.subscribe('users');
});

Template.beacon.helpers({
  users(){

    const instance = Template.instance();
    let currentGameId = Session.get("currentGameId");

    if(instance.subscriptionsReady()){
      let currentGame = Games.findOne(currentGameId);

      if(currentGame){

        let users = Meteor.users.find({nearestBeacon:this._id}).fetch();
        //console.log(users);
        return users;
      }

    }
  }
});
