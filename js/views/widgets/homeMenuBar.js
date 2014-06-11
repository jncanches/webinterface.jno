define([
	'jquery',
	'underscore',
	'backbone',
	'text',
	'router',
	'collections/widgets/homeMenuBarItems',
	'text!../../../../skins/default/templates/widgets/homeMenuBar.html',
	'jquery-ui',
	], function($, _, Backbone, text, Router, HomeMenuBarItemCollection, HomeMenuBarTemplate){
		
		var HomeMenuBarView = Backbone.View.extend({
			render: function(){
				this.homeMenuBarItemCollection = new HomeMenuBarItemCollection();
				var compiledTemplate = _.template( HomeMenuBarTemplate, { homeMenuBarItems: this.homeMenuBarItemCollection.models } );
				
				this.setElement(compiledTemplate);
				
				this.$itemsContainerEl = $(".items-container", this.$el);
				
				this.initializeEvents();
				return this;
			},
			
			initializeEvents: function() {
				var that = this;
				
				this.homeMenuBarItemCollection.each(function(model) {
					model.on("change:selected", function(model) {
						if (this.get("selected")) {
							that.selectHomeItemView(this);
						}
					});
				});
				
				var currentModel = this.homeMenuBarItemCollection.getSelectedModel();
				if (currentModel) {
					this.selectHomeItemView(currentModel);
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
				}
			},
			
			selectHomeItemView: function(itemModel) {
				var newLeft = 0;
				$("[id^='homeMenuItem-']", this.$el).removeClass("selected");
				var viewel = $("#homeMenuItem-" + itemModel.get("id"), this.$el);
				viewel.addClass("selected");
				newLeft = (this.$el.width() / 2) - viewel.position().left - (viewel.width() / 2);
				
				this.$itemsContainerEl.css({left: newLeft});
				
				$(document).trigger("backgroundUpdateAsked", [itemModel.get("background")]);
			},
			
			moveLeft: function() {
		    	var currentModel = this.homeMenuBarItemCollection.getSelectedModel();
		    	if (!currentModel) {
		    		return;
		    	}
				var previousModel = this.homeMenuBarItemCollection.getPreviousModel(currentModel);
				if (previousModel === currentModel) {
					return;
				}
				currentModel.set("selected", false);
				previousModel.set("selected", true);
			},
			
			moveRight: function() {
		    	var currentModel = this.homeMenuBarItemCollection.getSelectedModel();
		    	if (!currentModel) {
		    		return;
		    	}
				var nextModel = this.homeMenuBarItemCollection.getNextModel(currentModel);
				if (nextModel === currentModel) {
					return;
				}
				currentModel.set("selected", false);
				nextModel.set("selected", true);
			}
		});
		
	// Our module now returns our view
	return HomeMenuBarView;
});


/*WebInterface.Views.HomeMenuItems = Backbone.View.extend({
	template: _.template($('#tpl-homeMenuItems').html()),
	
	renderOne: function(homeMenuItem) {
		var that = this;
		var itemView = new WebInterface.Views.HomeMenuItem({model: homeMenuItem});
		this.itemsContainerEl.append(itemView.render().$el);
		itemView.model.on("change:selected", function(model) {
			if (this.get("selected")) {
				this.view.$el.addClass("selected");
				that.selectHomeItemView(this.view);
			} else {
				this.view.$el.removeClass("selected");
			}
		});
	},
	
	render: function() {
		var that = this;
		
		this.setElement(this.template(this.model));
	    
		this.itemsContainerEl = $(".items-container", this.$el);
		
	    this.collection.each(this.renderOne, this);

	    return this;
	},
	
	
	
	
});*/