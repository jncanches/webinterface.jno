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
	'models/JSONRPC/JSONRPC'
], function($, _, Backbone, Router, Utils, JSONRPCModel){
	
	var App = function(){
		//define namespace. Lokk at require.js doc tosee if a mechanism exists
	
		//redefine Backbone.sync fucntion
		Backbone.sync = function(method, model, options){
			WI.XbmcController.call(model.xbmcMethod, model, options.success, options.error, false);
		};
		
		this.buildXbmcObjectsStructure();
		$(document).on("xbmcConnectionEstablished", function() {
			var router = new Router();
		});
	};
	
	App.prototype = {
		/*
		 * This method is called at the very beginning
		 * Calls JSONRPC.introspect and build xbmc object structure dynamically
		 * XbmcTypes are created as static classes
		 * XbmcMethods are created as Backbone.Models
		 * Models are then available and synchronize themselves when calling fetch, save, destroy (which means read, update or delete for RPC2)
		 * 
		 * */
		buildXbmcObjectsStructure: function() {
			var that = this;
			
			WI.Xbmc = {};
			WI.Xbmc.Structure = {};
	
			//WI.XbmcController = new Xbmc.WebSocketsApi({
			/*
			 * This controller will be used by Backbone model. It calls the JSONRPC API over HTTP
			 * 
			 * */
			WI.XbmcController = new Xbmc.HttpApi({
				host: "localhost",
				port: "8081"
			});
			
			/*
			 * This controller will be used for Notifications. It calls the JSONRPC API over WebSockets
			 * 
			 * */
			WI.XbmcNotifications = new Xbmc.WebSocketsApi({
				//port: 9090,
				onConnected:function() {
					console.log("listening xbmc notifications");
				}
			});
			
			var jsonrpcintrospect = new JSONRPCModel();
			jsonrpcintrospect.fetch({
				success: function(xbmcStructure){
					WI.Xbmc.Structure.raw = xbmcStructure;
					that.buildXbmcTypesFromXbmcStructure(xbmcStructure.get("types"));
					that.buildXbmcMethodsFromXbmcStructure(xbmcStructure.get("methods"));
					$(document).trigger("xbmcConnectionEstablished");
				},
				error: function(a, b, c) {
					console.log(a, b, c);
				}
			}); // end get collection
		},
		
		buildXbmcTypesFromXbmcStructure:  function(xbmcStructureTypes) {
			WI.Xbmc.Structure.types = xbmcStructureTypes;
			WI.Xbmc.Structure.types["Video.LightFields.Movie"] = WI.Xbmc.Structure.types["Video.Fields.Movie"];
			this.epureVideoFieldsMovie();
		},
		
		epureVideoFieldsMovie: function() {
			var indexToRemove = [];
			for (var i=0; i< WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums.length; i++) {
				var item = WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums[i];
				if ($.inArray(item, Utils.toEpurateVideoFieldsMovie) > -1) {
					indexToRemove.push(i);
				}
			}
			Utils.removeIndexesInArray(indexToRemove, WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums);
		},
		
		buildXbmcMethodsFromXbmcStructure: function(xbmcStructureMethods) {
			for (var method in xbmcStructureMethods) {
				var methodName = method;
				if(methodName.indexOf("Get") > -1) {
					//it's a read method
					var className = methodName.replace("Get", "");
					WI.Models[className] = Backbone.Model.extend({
						xbmcMethod: methodName
					});
				} else {
					//it's an command method
					var commandFunc = function() {
						console.log("calling method", arguments[0], this);
					}
					WI.XbmcCommand[methodName] = function() {commandFunc(methodName)};
				}				
			}
		}
	};
	
	// Our module now returns our view
	return App;
});