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
			
			initialize: function() {
				this.movieCollection = new MovieCollection();
			},
			
			render: function(){
				var that = this;
				if (!this.rendered) {
					var compiledTemplate = _.template( this.MoviePosterListTemplate, {} );
					this.$el.html(compiledTemplate);
	
					$('#globalContent').scroll(function() {
				    	if ($('#globalContent').scrollTop() > that.$el.height() - $(window).height() - 100) {
				    		that.renderNextItemViews();
				    	}
				    });
					
					this.movieCollection.fetch({
						success: function(result) {
							//that.renderLightItemViews();
							that.renderNextItemViews();
						}
					});
					this.rendered = true;
				}
				return this;
			},
			
			renderLightItemViews: function() {
				for (var i=0; i<this.movieCollection.length; i++) {
				//for (var i=0; i<100; i++) {
					this.$el.append(new MoviePosterView({model: this.movieCollection.at(i)}).render().$el);
					//var model = this.movieCollection.at(i);
					//this.$el.append('<li class="movie-poster-item" id="movie-poster-' + model.get("movieid") + '><a href="#movieDetails/' + model.get("movieid") + '"><span>' + model.get("label") + '</span></a></li>');
				}
			},
			
			renderNextItemViews: function() {
				var that = this;
				
				if (typeof this.renderedIndex == "undefined") {
					this.renderedIndex = -1;
				}
				
				this.renderedIndex ++;
				if (this.renderedIndex >= this.movieCollection.length) {
					return;
				}
				var currentModel = this.movieCollection.at(this.renderedIndex);
				if (!currentModel.get("art")) {
					var movie = new WI.Models["VideoLibrary.MovieDetails"]({
						movieid: currentModel.get("movieid"),
						properties: WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums
					});
					
					movie.fetch({
						success: function(model){
							//update the collection with the complete movie
							currentModel.attributes = model.get("moviedetails");
							
							var itemView = new MoviePosterView({model: currentModel});
							var existingEl = $("#movie-poster-" + currentModel.get("movieid"));
							if (existingEl.length > 0) {
								existingEl.replaceWith(itemView.render().$el)
							} else {
								that.$el.append(itemView.render().$el);
							}
							that.renderNextItemViews();
				    	}
					}); // end get collection
				}
			}

			
			/*renderNextItemViews: function() {
				var that = this;
				var howManyViewsRendered = 0;
				var maxAtOnce = 20;
				
				for (var i=0; i<this.movieCollection.length; i++) {
				//for (var i=0; i<100; i++) {
					if (howManyViewsRendered > maxAtOnce) {
						break;
					}

					if (!this.movieCollection.at(i).get("art") && !this.movieCollection.at(i).get("loading")) {
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
									currentModel.attributes = model.get("moviedetails");
								}
								
								var itemView = new MoviePosterView({model: currentModel});
								var existingEl = $("#movie-poster-" + currentModel.get("movieid"));
								if (existingEl.length > 0) {
									existingEl.replaceWith(itemView.render().$el)
								} else {
									that.$el.append(itemView.render().$el);
								}
					    	}
						}); // end get collection
						howManyViewsRendered++;
					}
				}
			}*/
		});
		
	// Our module now returns our view
	return MoviePosterListView;
});