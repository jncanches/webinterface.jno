var RecentlyAddedMoviesItemDetailView = Backbone.View.extend({
	render: function(){
		var compiledTemplate = _.template( this.MoviePosterTemplate, {movie: this.model.attributes, Utils: Utils} );
	
		this.setElement(compiledTemplate);
		return this;
	}
});