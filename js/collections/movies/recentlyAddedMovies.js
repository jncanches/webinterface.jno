var RecentlyAddedMoviesCollection = Backbone.Collection.extend({
	xbmcMethod: 'VideoLibrary.GetRecentlyAddedMovies',
	
	initialize: function() {
		RecentlyAddedMoviesCollection.prototype.model = WI.Models["VideoLibrary.MovieDetails"];
		RecentlyAddedMoviesCollection.prototype.fetchParams = {properties: WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums};
	},
	
	parse: function(response) {
		return response.movies;
	}
});