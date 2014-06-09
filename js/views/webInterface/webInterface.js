define([
	'jquery',
	'underscore',
	'backbone',
	'text',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'models/webInterface/webInterface',
	'text!../../../../skins/default/templates/webInterface/webInterface.html'
	], function($, _, Backbone, webInterfaceModel, webInterfaceTemplate){
		
		var webInterfaceView = Backbone.View.extend({
			el: $('#container'),
			initialize: function() {
				this.model = new webInterfaceModel({userName: 'aaaaaaa', locale: 'en_US'});
				var compiledTemplate = _.template( webInterfaceTemplate, this.model.attributes );
				this.$el.html(compiledTemplate);
			}
		});
		
	// Our module now returns our view
	return webInterfaceView;
});
/*

WebInterface.Views.Main = Backbone.View.extend({
	background: "movies.jpg",
	
	template: _.template($('#tpl-main').html()),
	
	initialize: function() {

	},
	
	render: function() {
		this.setElement(this.template(this.model.attributes));
	    
		this.backgroundContainer = $("#background-container");
		
	    return this;
	},

	initializeEvents: function() {
		var that = this;
		this.$header = $("#header", this.$el);
		this.$footer = $("#header", this.$el);
		this.$containerToResize = $("#containerToResize", this.$el);
		this.resizeContainerEl();
		
		$(window).on("resize", function() {
			that.resizeContainerEl();
			that.resizeBackGroundContainer();
		});
		
		$(document).on("backgroundUpdateAsked", function(event, background) {
			that.updateBackground(background);
		});
		
		$(document).on("pageChanged", function() {
			//that.updateBackground();
		});
	},
	
	resizeBackGroundContainer: function() {
		var winw = $(window).width();
		var winh = $(window).height();
		if (winw <= 1024 || winh <= 768) {
			return;
		} 
		WebInterface.backgroundContainer.width(winw);
		WebInterface.backgroundContainer.height(winh);
	},
	
	updateBackground: function(forcebackground) {
		//don't update background if something is now playing
		//if (! somethingnowplaying) {
		if (!forcebackground) {
			if (!this.backgroundView) {
				this.backgroundView = this;
			}
			if (this.backgroundView.background) {
				forcebackground = this.backgroundView.background;
			}
		}
		if (forcebackground) {
			var newSrc = "skins/default/backgrounds/" + forcebackground;
			var $old = $("img", this.backgroundContainer);
			if (newSrc != $old.attr("src")) {
				var $new = $("<img src='skins/default/backgrounds/" + forcebackground + "'/>");
				this.backgroundContainer.prepend($new);
				$old.fadeOut(300, function() {
					$(this).remove();
				});
			}
		}
		//}
	},
	
	resizeContainerEl: function() {
		var newHeight = $(window).height()+4;
		if (this.$header.is(':visible')) {
			newHeight = newHeight - this.$header.height();
		}
		this.$containerToResize.height(newHeight);
	},
	
	home: function() {
		
		//render home menu
		if (!this.homeMenuItemsView) {
			var homeMenuItems = new WebInterface.Collections.HomeMenuItems(WebInterface.UserSettings.getHomeMenuItems());
			this.homeMenuItemsView = new WebInterface.Views.HomeMenuItems({
				collection: homeMenuItems
			});
		}
		$('#globalContent').html(this.homeMenuItemsView.render().$el);
		this.homeMenuItemsView.initializeEvents();
		
		this.backgroundView = this;

		$(document).trigger("pageChanged");
	},
	
	movies: function() {
		var that = this;
		//render home menu
		if (!this.movieCollection) {
			this.movieCollection = new WI.Models["VideoLibrary.Movies"]();
		    // fetch results
			this.movieCollection.fetch({
				fullRange: "fullRange", 
				success: function(collection){
					if (!that.allMoviesView) {    
						that.allMoviesView = new WebInterface.Views.AllMovies({
							collection: that.movieCollection.get('movies')
						});
						$('#globalContent').html(that.allMoviesView.render().$el);
						that.allMoviesView.initializeEvents();
						
						that.backgroundView = that.allMoviesView;

						$(document).trigger("pageChanged");

					}
		    	}
			}); // end get collection
		}
	},
	
	tvshows: function() {
		this.backgroundView = {background: "tvshows.jpg"};
		
		$(document).trigger("pageChanged");
		
		$('#globalContent').html("Tv Shows here !!!");
		$('#globalContent').append('<a href="#home">Back</a>');
	}

});*/