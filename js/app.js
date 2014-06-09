window.WI = window.WebInterface = { //remenber to remove window.WebInterface references
		Models: {},
		Collections: {},
		Views: {},
		XbmcCommand: {}
}

define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // libs/jquery/jquery
	'underscore', // libs/underscore/underscore
	'backbone',    // libs/backbone/backbone
	'router',
	'tools/utils',
], function($, _, Backbone, Router, utils){
	var initialize = function() {
		
		//define namespace. Lokk at require.js doc tosee if a mechanism exists
		
		utils.buildXbmcObjectsStructure();
		$(document).on("xbmcConnectionEstablished", function() {
			Routeur.initialize();
		});
	}
	
	return {
		initialize: initialize
	}
});