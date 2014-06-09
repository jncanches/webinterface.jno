define([
	'underscore',
	'backbone'
], function(_, Backbone){
	var JSONRPCModel = Backbone.Model.extend({
		xbmcMethod: 'JSONRPC.Introspect'
	});	// Return the model for the module
	return JSONRPCModel;
});

