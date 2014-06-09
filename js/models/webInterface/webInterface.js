define([
	'underscore',
	'backbone'
], function(_, Backbone){
	var WebInterfaceModel = Backbone.Model.extend({
		defaults: {
			userName: 'jno',
			locale: 'fr'
		}
	});
	// Return the model for the module
	return WebInterfaceModel;
});