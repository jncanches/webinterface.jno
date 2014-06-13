var RecentlyAddedMoviesView = Backbone.View.extend({
	/*defaultBackground: 'music.jpg',*/
	initialize: function() {
		this.collection = new RecentlyAddedMoviesCollection();
	},
	
	render: function(){
		var that = this;
		if (!this.rendered) {
			this.collection.fetch({
				success: function() {
					var compiledTemplate = _.template( RecentlyAddedMoviesTemplate, { recentlyAddedMovies: that.collection.models, Utils: Utils} );
					
					that.setElement(compiledTemplate);
					
					that.$itemsContainerEl = $(".items-container", that.$el);
					
					that.initializeEvents();
					
					that.trigger("widgetUpdated");
				}
			});
			this.rendered = true;
		}
		return this;
	},
	
	show: function(callback) {
		var that = this;
		this.$el.fadeIn(200, function() {
			//var currentModel = that.recentlyAddedMoviesCollection.getSelectedModel();
			//if (currentModel) {
			//	that.selectHomeItemView(currentModel);
			//}
			//that.initializeMouseWheelEvents(); //need to be re-initialized due probably to a bug of jquery.mousewheel plugin
			if (callback) {
				callback();
			}
		});
		return this;
	},
	
	hide: function(callback) {
		this.$el.fadeOut(200, function() {
			if (callback) {
				callback();
			}
		});
		return this;
	},
	
	initializeEvents: function() {
		/*var that = this;
		
		this.homeMenuBarItemCollection.each(function(model) {
			model.on("change:selected", function(model) {
				if (this.get("selected")) {
					that.selectHomeItemView(this);
				}
			});
		});
		
		if (!this.eventsInitialized) {
		    $(document).on("keydown", function(event) {
		    	if (!that.$el.is(':visible')) {
		    		return;
		    	}
		    	if (event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 13) {
		    		return;
		    	};
		    	
		    	if (event.keyCode == 13) { //ENTER
		        	var currentModel = that.homeMenuBarItemCollection.getSelectedModel();
		        	if (!currentModel) {
		        		return;
		        	}
		        	var hash = $("a", currentModel.view.$el).attr("href");
		        	if (hash) {
		        		WebInterface.router.navigate(hash, {trigger: true});
		        	}
		    	}
		    	
		    	if (event.keyCode == 39) {
		    		//right
		    		that.moveRight();
		    	}
		    	if (event.keyCode == 37) {
		    		//left
		    		that.moveLeft();
		    	}
		    });
		    this.eventsInitialized = true;
		}*/
	}
});