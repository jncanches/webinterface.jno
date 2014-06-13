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