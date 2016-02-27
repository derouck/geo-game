Template.layout.onCreated(function() {

  const self = this;
  const handle  = this.subscribe('currentResult');
  self.autorun(() => {
    const isReady = handle.ready();
  });

});
Template.layout.helpers({
  hasCurrentGame(){
    return Results.find({userId: Meteor.userId()}).count() > 0;
  }
});
