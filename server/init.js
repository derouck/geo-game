Meteor.startup(function () {

    Games.remove({});

    Games.insert({name:"Test game", description:"Blabla"});
});
