WebInterface.Views.AllMovies = Backbone.View.extend({
	template: _.template($('#tpl-allMovies').html()),
	
	renderOne: function(movie) {
		var that = this;

		var movie = new WebInterface.Models["VideoLibrary.MovieDetails"]({
			movieid: movie.movieid, 
			properties: WI.Xbmc.Structure.types["Video.LightFields.Movie"].items.enums
		});
		movie.fetch({
			success: function(model){
				var itemView = new WebInterface.Views.MoviePoster({model: model});
				that.itemsContainerEl.append(itemView.render().$el);
				itemView.model.on("change:selected", function(model) {
					if (that.get("selected")) {
						that.view.$el.addClass("selected");
						that.selectMovieView(this.view);
					} else {
						that.view.$el.removeClass("selected");
					}
				});
	    	},
	    	error: function(a, b,c) {
	    		console.log(a, b,c);
	    	}
		}); // end get collection
	},
	
	render: function() {
		var that = this;
		
		this.setElement(this.template(this.model));
	    
		this.itemsContainerEl = this.$el;

		this.nbloaded = this.renderNextItemViews(0);
	    
	    $('#globalContent').scroll(function() {
	    	if ($('#globalContent').scrollTop() > that.itemsContainerEl.height() - $(window).height() - 100) {
	    		that.nbloaded = that.renderNextItemViews(that.nbloaded);
	    	}
	    })

	    return this;
	},
	
	renderNextItemViews: function(fromIndex) {
		for (var i=fromIndex; i<=fromIndex+20; i++) {
			if (i >= this.collection.length) {
				break;
			}
	    	this.renderOne(this.collection[i]);
	    }
		return i;
	},
	
	selectMovieView: function(view) {
		var newLeft = 0;
		newLeft = (this.$el.width() / 2) - view.$el.position().left - (view.$el.width() / 2);
		
		this.itemsContainerEl.css({left: newLeft});
		
		$(document).trigger("backgroundUpdateAsked", [view.model.get("background")]);
	},
	
	initializeEvents: function() {
		return;
		
		var that = this;
		
		var currentEl = this.collection.getSelectedModel();
		if (currentEl) {
			this.selectHomeItemView(currentEl.view);
		}
		
		this.$el.mousewheel(function(event) {
	    	if (!that.$el.is(':visible')) {
	    		return;
	    	}
	    	if (event.deltaY == 1) { //UP so left
	    		that.moveRight();
	    	}
	    	if (event.deltaY == -1) { //DOWN so right
	    		that.moveLeft();
	    	}
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
		        	var currentModel = that.collection.getSelectedModel();
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
		}
	},
	
	moveLeft: function() {
    	var currentModel = this.collection.getSelectedModel();
    	if (!currentModel) {
    		return;
    	}
		var previousModel = this.collection.getPreviousModel(currentModel);
		if (previousModel === currentModel) {
			return;
		}
		currentModel.set("selected", false);
		previousModel.set("selected", true);
	},
	
	moveRight: function() {
    	var currentModel = this.collection.getSelectedModel();
    	if (!currentModel) {
    		return;
    	}
		var nextModel = this.collection.getNextModel(currentModel);
		if (nextModel === currentModel) {
			return;
		}
		currentModel.set("selected", false);
		nextModel.set("selected", true);
	}
});