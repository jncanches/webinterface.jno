var RecentlyAddedMoviesItemView = Backbone.Marionette.ItemView.extend({
	tagName: "li",
	className: "recently-added-movie-poster-item",
	template: '#recentlyAddedMovieWidget',
	
	modelEvents: {
		"change:selected": "selectedChanged"
	},
	
	behaviors: {
		UpdateBackground: {
			test: "test"
	    }
	},
	
	selectedChanged: function() {
		if (this.model.get("selected")) {
			$("a", this.$el).addClass("selected");
		} else {
			$("a", this.$el).removeClass("selected");
		}
	}
});