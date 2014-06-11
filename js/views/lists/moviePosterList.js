define([
	'jquery',
	'underscore',
	'backbone',
	'text',
	'router',
	'collections/movies/movies',
	'text!../../../../skins/default/templates/lists/moviePosterList.html',
	'views/items/moviePoster'
	], function($, _, Backbone, text, Router, MovieCollection, MoviePosterListTemplate, MoviePosterView){
		
		var MoviePosterListView = Backbone.View.extend({
			defaultBackground: 'movies.jpg',
			
			MoviePosterListTemplate: MoviePosterListTemplate,
			MoviePosterView: MoviePosterView,
			render: function(){
				var that = this;
				this.movieCollection = new MovieCollection();

				var compiledTemplate = _.template( that.MoviePosterListTemplate, {} );
				that.setElement(compiledTemplate);

/*				$('#globalContent').scroll(function() {
			    	if ($('#globalContent').scrollTop() > that.$el.height() - $(window).height() - 100) {
			    		that.renderNextItemViews();
			    	}
			    })
*/				
				this.movieCollection.fetch({
					success: function(result) {
						that.renderItemViews();
					}
				});
				return this;
			},
			
			renderItemViews: function() {
				for (var i=0; i<this.movieCollection.length; i++) {
					var itemView = new MoviePosterView({model: this.movieCollection.at(i)});
					this.$el.append(itemView.render().$el);
				}
			}
		});
		
	// Our module now returns our view
	return MoviePosterListView;
});