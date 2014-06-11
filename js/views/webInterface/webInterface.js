define([
	'jquery',
	'jquery.mousewheel',
	'underscore',
	'backbone',
	'text',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'models/webInterface/webInterface',
	'text!../../../../skins/default/templates/webInterface/webInterface.html',
	
	'views/widgets/homeMenuBar',
	], function($, $MouseWheel, _, Backbone, text, webInterfaceModel, webInterfaceTemplate, HomeMenuBarView){
		
		var webInterfaceView = Backbone.View.extend({
			defaultBackground: "movies.jpg",
			
			el: $('body'),
			initialize: function() {
				this.model = new webInterfaceModel({userName: 'aaaaaaa', locale: 'en_US'});
				var compiledTemplate = _.template( webInterfaceTemplate, this.model.attributes );
				this.$el.html(compiledTemplate);

				this.initializeEvents();
				
				this.homeMenuBar = new HomeMenuBarView();
				this.displayContentView(this.homeMenuBar);
				
			},
			
			displayContentView: function(view) {
				$("#globalContent", this.$el).html(view.render().el);
			},
			
			initializeEvents: function() {
				var that = this;
				this.$header = $("#header", this.$el);
				this.$footer = $("#header", this.$el);
				this.$containerToResize = $("#containerToResize", this.$el);
				this.$backgroundContainer = $("#background-container", this.$el);

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
				this.$backgroundContainer.width(winw);
				this.$backgroundContainer.height(winh);
			},
			
			updateBackground: function(background) {
				if (!background) {
					background = this.defaultBackground;
				}
				//don't update background if something is now playing
				//if (! somethingnowplaying) {
				var newSrc = "skins/default/backgrounds/" + background;
				var $old = $("img", this.backgroundContainer);
				if (newSrc != $old.attr("src")) {
					var $new = $("<img src='skins/default/backgrounds/" + background + "'/>");
					this.$backgroundContainer.prepend($new);
					$old.fadeOut(300, function() {
						$(this).remove();
					});
				}
				//}
			},
			
			resizeContainerEl: function() {
				var newHeight = $(window).height()+4;
				if (this.$header.is(':visible')) {
					newHeight = newHeight - this.$header.height();
				}
				this.$containerToResize.height(newHeight);
			}
		});
		
		// Our module now returns our view
		return webInterfaceView;
});