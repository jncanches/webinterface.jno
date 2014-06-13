Utils = {
	toEpurateVideoFieldsMovie: ["cast", "showlink", "tag"],
	
	removeIndexesInArray: function(indexArray, arr) {
		for (var i=indexArray.length - 1; i>-1; i--) {
			arr.splice(indexArray[i], 1);
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
	      return Utils.defaultImage(type);
	    }
	    // return image with correct path
	    //<img src="image/image://smb%253a%252f%252fHOME%252fFilms%252fSuper%25208%252fSuper%25208-poster.jpg/" alt="">
	    
	    return '/image/' + encodeURIComponent(rawPath);
	  },
	  
	  buildXbmcObjectsStructure: function() {
		window.Xbmc = window.Xbmc || {};
		Xbmc.Structure = {};
		Xbmc.Models = {};
		Xbmc.Command = {};

		//WI.XbmcController = new Xbmc.WebSocketsApi({
		/*
		 * This controller will be used by Backbone model. It calls the JSONRPC API over HTTP
		 * 
		 * */
		Xbmc.XbmcController = new Xbmc.HttpApi({
			host: "localhost",
			port: "8081"
		});
		
		/*
		 * This controller will be used for Notifications. It calls the JSONRPC API over WebSockets
		 * 
		 * */
		Xbmc.Notifications = new Xbmc.WebSocketsApi({
			//port: 9090,
			onConnected:function() {
				console.log("listening xbmc notifications");
			}
		});
		
		var jsonrpcintrospect = new JSONRPCModel();
		jsonrpcintrospect.fetch({
			success: function(xbmcStructure){
				Xbmc.Structure.raw = xbmcStructure;
				Utils.buildXbmcTypesFromXbmcStructure(xbmcStructure.get("types"));
				Utils.buildXbmcMethodsFromXbmcStructure(xbmcStructure.get("methods"));
				$(document).trigger("xbmcConnectionEstablished");
			},
			error: function(a, b, c) {
				console.log(a, b, c);
			}
		}); // end get collection
	},
	
	buildXbmcTypesFromXbmcStructure:  function(xbmcStructureTypes) {
		Xbmc.Structure.types = xbmcStructureTypes;
		Xbmc.Structure.types["Video.LightFields.Movie"] = Xbmc.Structure.types["Video.Fields.Movie"];
		Utils.epureVideoFieldsMovie();
	},
	
	epureVideoFieldsMovie: function() {
		var indexToRemove = [];
		for (var i=0; i< Xbmc.Structure.types["Video.LightFields.Movie"].items.enums.length; i++) {
			var item = Xbmc.Structure.types["Video.LightFields.Movie"].items.enums[i];
			if ($.inArray(item, Utils.toEpurateVideoFieldsMovie) > -1) {
				indexToRemove.push(i);
			}
		}
		Utils.removeIndexesInArray(indexToRemove, Xbmc.Structure.types["Video.LightFields.Movie"].items.enums);
	},
	
	buildXbmcMethodsFromXbmcStructure: function(xbmcStructureMethods) {
		for (var method in xbmcStructureMethods) {
			var methodName = method;
			if(methodName.indexOf("Get") > -1) {
				//it's a read method
				var className = methodName.replace("Get", "");
				Xbmc.Models[className] = Backbone.Model.extend({
					xbmcMethod: methodName
				});
			} else {
				//it's an command method
				var commandFunc = function() {
					console.log("calling method", arguments[0], this);
				}
				Xbmc.Command[methodName] = function() {commandFunc(methodName)};
			}				
		}
	}
};