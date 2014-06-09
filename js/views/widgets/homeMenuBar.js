define([
	'jquery',
	'underscore',
	'backbone',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'text!../../../../skins/default/templates/webInterface/webInterface.html'
	], function($, _, Backbone, webInterfaceTemplate){
		
		var WebInterfaceView = Backbone.View.extend({
			el: $('#container'),
			render: function(){
				var data = {};
				var compiledTemplate = _.template( webInterfaceTemplate, data );
				this.$el.append( compiledTemplate );
			}
		});
		
	// Our module now returns our view
	return WebInterfaceView;
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
	
	selectHomeItemView: function(view) {
		var newLeft = 0;
		newLeft = (this.$el.width() / 2) - view.$el.position().left - (view.$el.width() / 2);
		
		this.itemsContainerEl.css({left: newLeft});
		
		$(document).trigger("backgroundUpdateAsked", [view.model.get("background")]);
	},
	
	initializeEvents: function() {
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
});*/