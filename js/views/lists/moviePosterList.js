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
			MoviePosterListTemplate: MoviePosterListTemplate,
			MoviePosterView: MoviePosterView,
			render: function(){
				var that = this;
				this.movieCollection = new MovieCollection();

				var compiledTemplate = _.template( that.MoviePosterListTemplate, {} );
				that.setElement(compiledTemplate);

				$('#globalContent').scroll(function() {
			    	if ($('#globalContent').scrollTop() > that.$el.height() - $(window).height() - 100) {
			    		that.renderNextItemViews();
			    	}
			    })
				
				this.movieCollection.fetch({
					success: function(result) {
						that.renderNextItemViews();
					}
				});
				return this;
			},
			
			renderNextItemViews: function() {
				var that = this;
				var howManyViewsRendered = 0;
				var maxAtOnce = 20;
				
				for (var i=0; i<this.movieCollection.length; i++) {
					if (howManyViewsRendered > maxAtOnce) {
						break;
					}
					if(this.movieCollection.at(i).get("loading")) {
						console.log(this.movieCollection.at(i).get("movieid") + " already loading");
					}
					if (!this.movieCollection.at(i).get("moviedetails") && !this.movieCollection.at(i).get("loading")) {
						this.movieCollection.at(i).set("loading", true);
						var movie = new WI.Models["VideoLibrary.MovieDetails"]({
							movieid: this.movieCollection.at(i).get("movieid"),
							properties: WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums
						})
						
						movie.fetch({
							success: function(model){
								//update the collection with the complete movie
								var currentModel = that.movieCollection.findWhere({movieid: model.get("movieid")});
								if (currentModel) {
									currentModel.attributes = model.attributes;
								}
								
								var itemView = new MoviePosterView({model: currentModel});
								that.$el.append(itemView.render().$el);
					    	}
						}); // end get collection
						howManyViewsRendered++;
					}
				}
			}
		});
		
	// Our module now returns our view
	return MoviePosterListView;
});