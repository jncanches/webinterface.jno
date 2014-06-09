define([
	'jquery',
	'xbmcControllerHttp',
	'xbmcControllerWebSocket'
	], function($){
		var utils = {
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