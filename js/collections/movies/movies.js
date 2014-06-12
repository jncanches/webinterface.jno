define([
   	'underscore',
   	'backbone',
], function(_, Backbone){
   	var MoviesCollection = Backbone.Collection.extend({
   		xbmcMethod: 'VideoLibrary.GetMovies',
   		
   		initialize: function() {
   			MoviesCollection.prototype.model = WI.Models["VideoLibrary.MovieDetails"];
   			//MoviesCollection.prototype.fetchParams = {properties: WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums};
   		},
   		
   		parse: function(response) {
   			return response.movies;
   		}
   	});
   	// Return the model for the module
   	return MoviesCollection;
});