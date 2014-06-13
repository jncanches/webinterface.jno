Backbone.sync = function(method, model, options){
	WI.XbmcController.call(model.xbmcMethod, model, options.success, options.error, false);
	
/*	var ws = new Xbmc.WebSocketsApi({
		onConnected:function() {
			ws.call(model.xbmcMethod, 
					model, 
					function(result) {
						options.success(result); 
					}, 
					options.error, 
					false);
		}
	});
*/
};