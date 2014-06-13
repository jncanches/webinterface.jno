Backbone.sync = function(method, model, options){
	var params = model;
	if (model.models) {
		//it's a collection so read the fetchParams attributes
		params = model.fetchParams
	}
	/*var params = "";
	if (model.params) {
		for (var attrname in model.params) {
			model.set(attrname, model.params[attrname]);
		}
	}*/
	Xbmc.XbmcController.call(model.xbmcMethod, params, options.success, options.error, false);
};