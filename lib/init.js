Meteor.startup(() => {

});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
	{
		_id: "username",
		type: "text",
		displayName: "username",
		required: true,
		minLength: 5
	},
	pwd
]);
