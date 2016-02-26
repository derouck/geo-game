AutoForm.hooks({
    createGame: {
        onSuccess(operation, result, template) {
            sAlert.success("Created game successfully!");
            if(result){
                Router.go('/add-waypoint/' + result);
            }
        },
        onError(operation, error, template) {
            console.log(error);
            sAlert.error("Failed to create game");
        }
    }
});