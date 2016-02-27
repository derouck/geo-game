AutoForm.hooks({
    addWaypoint: {
        onSuccess(operation, result, template) {
            sAlert.success("Waypoint added successfully!");
            if(result){
                Router.go('/game/' + result);
            }
        },
        onError(operation, error, template) {
            console.log(error);
            sAlert.error("Failed to create waypoint");
        }
    }
});