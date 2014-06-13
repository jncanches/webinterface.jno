var HomeMenuBarView = Backbone.Marionette.CollectionView.extend({
	tagName: "div",
	className: "home-menu-items",
	template: '#homeMenuBar',
	
	itemView: HomeMenuBarItemView,
	
	appendBuffer: function(collectionView, buffer) {
		$('<div class="items-container"/>').appendTo(collectionView.$el).append(buffer);
	},
	
	onShow: function() {
		this.mapEvents();
		var selectedItemView = this.getSelectedItemView();
		if (!selectedItemView) {
			selectedItemView = this.children.first();
		}
		this.updateSelectedItemView(selectedItemView);
	},

	mapEvents: function() {
		var that = this;
		this.on("itemview:model:selectedChanged", function() {
			this.updateSelectedItemView();
		});
		
		this.mapKeyBoardEvents();
		this.mapMouseWheelEvents();
	},
	
	updateSelectedItemView: function(itemViewToSelect) {
		this.unselectAllViewItem();
		itemViewToSelect.model.set({selected: true});
		
		var newLeft = (this.$el.width() / 2) - itemViewToSelect.$el.position().left - (itemViewToSelect.$el.width() / 2);
		
		$(".items-container", this.$el).css({left: newLeft});

		this.trigger("selectedChanged");
	},
	
	unselectAllViewItem: function() {
		this.children.forEach(function(item) {
			item.model.set({selected: false});
		});
	},
	
	getSelectedItemView: function() {
		var selectedItemView;
		this.children.forEach(function(item, index) {
			if (item.model.get("selected")) {
				selectedItemView = item;
			}
		});
		return selectedItemView;
	},

	getSelectedItemViewIndex: function() {
		var selectedItemViewIndex;
		this.children.forEach(function(item, index) {
			if (item.model.get("selected")) {
				selectedItemViewIndex = index;
			}
		});
		return selectedItemViewIndex;
	},

	mapMouseWheelEvents: function() {
		var that = this;
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
	},
	
	mapKeyBoardEvents: function() {
		var that = this;
		$(document).on("keydown", function(event) {
	    	if (!that.$el.is(':visible')) {
	    		return;
	    	}
	    	if (event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 13) {
	    		return;
	    	};
	    	
	    	if (event.keyCode == 13) { //ENTER
	        	var selectedItemView = that.getSelectedItemView();
	        	if (!selectedItemView) {
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
	},
	
	moveLeft: function() {
		var selectedItemViewIndex = this.getSelectedItemViewIndex();
    	if (selectedItemViewIndex <= 0) {
    		return;
    	}
		var previousItemView =  this.children.findByIndex(selectedItemViewIndex-1);

		this.updateSelectedItemView(previousItemView);
	},
	
	moveRight: function() {
		var selectedItemViewIndex = this.getSelectedItemViewIndex();
    	if (selectedItemViewIndex >= this.children.length - 1) {
    		return;
    	}
		var nextItemView =  this.children.findByIndex(selectedItemViewIndex+1);

		this.updateSelectedItemView(nextItemView);
	}
//	onRender: function(){
//		this.initializeEvents();
//	},
//
//	show: function(callback) {
//		var that = this;
//		this.$el.fadeIn(200, function() {
//			var currentModel = that.homeMenuBarItemCollection.getSelectedModel();
//			if (currentModel) {
//				that.selectHomeItemView(currentModel);
//			}
//			that.initializeMouseWheelEvents(); //need to be re-initialized due probably to a bug of jquery.mousewheel plugin
//			if (callback) {
//				callback();
//			}
//		});
//		return this;
//	},
//	
//	hide: function(callback) {
//		this.$el.fadeOut(200, function() {
//			if (callback) {
//				callback();
//			}
//		});
//		return this;
//	},
//	
//	initializeEvents: function() {
//		var that = this;
//		
//		this.homeMenuBarItemCollection.each(function(model) {
//			model.on("change:selected", function(model) {
//				if (this.get("selected")) {
//					that.selectHomeItemView(this);
//				}
//			});
//		});
//		
//		if (!this.eventsInitialized) {
//		    $(document).on("keydown", function(event) {
//		    	if (!that.$el.is(':visible')) {
//		    		return;
//		    	}
//		    	if (event.keyCode != 37 && event.keyCode != 39 && event.keyCode != 13) {
//		    		return;
//		    	};
//		    	
//		    	if (event.keyCode == 13) { //ENTER
//		        	var currentModel = that.homeMenuBarItemCollection.getSelectedModel();
//		        	if (!currentModel) {
//		        		return;
//		        	}
//		        	var hash = $("a", currentModel.view.$el).attr("href");
//		        	if (hash) {
//		        		WebInterface.router.navigate(hash, {trigger: true});
//		        	}
//		    	}
//		    	
//		    	if (event.keyCode == 39) {
//		    		//right
//		    		that.moveRight();
//		    	}
//		    	if (event.keyCode == 37) {
//		    		//left
//		    		that.moveLeft();
//		    	}
//		    });
//		    this.eventsInitialized = true;
//		}
//	},
//	
//	initializeMouseWheelEvents: function() {
//		var that = this;
//		this.$el.mousewheel(function(event) {
//	    	if (!that.$el.is(':visible')) {
//	    		return;
//	    	}
//	    	if (event.deltaY == 1) { //UP so left
//	    		that.moveRight();
//	    	}
//	    	if (event.deltaY == -1) { //DOWN so right
//	    		that.moveLeft();
//	    	}
//	    });
//	},
//	
//	selectHomeItemView: function(itemModel) {
//		var newLeft = 0;
//		$("[id^='homeMenuItem-']", this.$el).removeClass("selected");
//		var viewel = $("#homeMenuItem-" + itemModel.get("id"), this.$el);
//		viewel.addClass("selected");
//		newLeft = (this.$el.width() / 2) - viewel.position().left - (viewel.width() / 2);
//		
//		this.$itemsContainerEl.css({left: newLeft});
//		
//		$(document).trigger("backgroundUpdateAsked", [itemModel.get("background")]);
//		$(document).trigger("widgetUpdateAsked", [itemModel.get("widget")]);
//	},
//	
//	moveLeft: function() {
//    	var currentModel = this.homeMenuBarItemCollection.getSelectedModel();
//    	if (!currentModel) {
//    		return;
//    	}
//		var previousModel = this.homeMenuBarItemCollection.getPreviousModel(currentModel);
//		if (previousModel === currentModel) {
//			return;
//		}
//		currentModel.set("selected", false);
//		previousModel.set("selected", true);
//	},
//	
//	moveRight: function() {
//    	var currentModel = this.homeMenuBarItemCollection.getSelectedModel();
//    	if (!currentModel) {
//    		return;
//    	}
//		var nextModel = this.homeMenuBarItemCollection.getNextModel(currentModel);
//		if (nextModel === currentModel) {
//			return;
//		}
//		currentModel.set("selected", false);
//		nextModel.set("selected", true);
//	}
});