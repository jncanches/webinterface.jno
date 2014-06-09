define([
	'underscore',
	'backbone'
], function(_, Backbone){
	var HomeMenuBarItemModel = Backbone.Model.extend({
		defaults: {
			id: null,
			label: null,
			link: null,
			icon: null,
			selected: false
		}
	});
	// Return the model for the module
	return HomeMenuBarItemModel;
});