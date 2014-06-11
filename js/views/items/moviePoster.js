define([
	'jquery',
	'underscore',
	'backbone',
	'text',
	'router',
	'tools/utils',
	'text!../../../../skins/default/templates/items/moviePoster.html'
	], function($, _, Backbone, text, Router, Utils, MoviePosterTemplate){
		
		var MoviePosterView = Backbone.View.extend({
			MoviePosterTemplate: MoviePosterTemplate,
			
			render: function(){
				var compiledTemplate = _.template( this.MoviePosterTemplate, {movie: this.model.get("moviedetails"), Utils: Utils} );
			
				this.setElement(compiledTemplate);
				return this;
			}
		});
		// Our module now returns our view
		return MoviePosterView;
});