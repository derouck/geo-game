AutoForm.hooks({
    createGame: {
        onSuccess(operation, result, template) {
            sAlert.success("Created game successfully!");
            Router.go('/gamesList');
        },
        onError(operation, error, template) {
            console.log(error);
            sAlert.error("Failed to create game");
        }
    }
});