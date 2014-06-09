define([
	'jquery',
	], function($){
		var utils = {
			/*
			 * This method is called at the very beginning
			 * Calls JSONRPC.introspect and build xbmc object structure dynamically
			 * XbmcTypes are created as static classes
			 * XbmcMethods are created as Backbone.Models
			 * Models are then available and synchronize themselves when calling fetch, save, destroy (which means read, update or delete for RPC2)
			 * 
			 * */
			buildXbmcObjectsStructure: function() {
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
				
				var jsonrpcintrospect = new WebInterface.Models.JSONRPC();
				jsonrpcintrospect.fetch({
					success: function(xbmcStructure){
						WI.Xbmc.Structure.raw = xbmcStructure;
						WI.Utils.buildXbmcTypesFromXbmcStructure(xbmcStructure.get("types"));
						WI.Utils.buildXbmcMethodsFromXbmcStructure(xbmcStructure.get("methods"));
						$(document).trigger("xbmcConnectionEstablished");
					},
					error: function(a, b, c) {
						console.log(a, b, c);
					}
				}); // end get collection
			},
				
			buildXbmcTypesFromXbmcStructure: function(xbmcStructureTypes) {
				WI.Xbmc.Structure.types = xbmcStructureTypes;
				WI.Xbmc.Structure.types["Video.LightFields.Movie"] = WI.Xbmc.Structure.types["Video.Fields.Movie"];
				WI.Utils.epureVideoFieldsMovie();
			},
			
			toEpurateVideoFieldsMovie: ["cast", "showlink", "tag"],
	
			epureVideoFieldsMovie: function() {
				var indexToRemove = [];
				for (var i=0; i< WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums.length; i++) {
					var item = WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums[i];
					if ($.inArray(item, WI.Utils.toEpurateVideoFieldsMovie) > -1) {
						indexToRemove.push(i);
					}
				}
				WI.Utils.removeIndexesInArray(indexToRemove, WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums);
			},
			
			removeIndexesInArray: function(indexArray, arr) {
				for (var i=indexArray.length - 1; i>-1; i--) {
					arr.splice(indexArray[i], 1);
				}
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
			},
	
			getXbmcMethod: function(methodName) {
				//if ()
			},
			
			/**
			  * Builds a url to an image from a given path, if empty returns default image
			  *
			  * @param rawPath
			  * @param type
			  * @returns {*}
			  */
			  getImageUrl: function(rawPath, type){
			    type = (typeof type == 'undefined' ? 'default' : type);
			    if(type == 'space'){
			      return 'theme/images/space.png';
			    }
			    //no image, return placeholder
			    if(rawPath === undefined || rawPath === ''){
			      return WebInterface.Utils.defaultImage(type);
			    }
			    // return image with correct path
			    //<img src="image/image://smb%253a%252f%252fHOME%252fFilms%252fSuper%25208%252fSuper%25208-poster.jpg/" alt="">
			    
			    return '/image/' + encodeURIComponent(rawPath);
			  }
		};
		
	// Our module now returns our view
	return utils;
});