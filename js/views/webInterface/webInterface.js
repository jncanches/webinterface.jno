define([
	'jquery',
	'jquery.mousewheel',
	'underscore',
	'backbone',
	'text',
	// Using the Require.js text! plugin, we are loaded raw text
	// which will be used as our views primary template
	'models/webInterface/webInterface',
	'text!../../../../skins/default/templates/webInterface/webInterface.html'
	], function($, $MouseWheel, _, Backbone, text, webInterfaceModel, webInterfaceTemplate){
		
		var webInterfaceView = Backbone.View.extend({
			defaultBackground: "music.jpg",
			
			el: $('body'),
			initialize: function() {
				this.model = new webInterfaceModel({userName: 'aaaaaaa', locale: 'en_US'});
				var compiledTemplate = _.template( webInterfaceTemplate, this.model.attributes );
				this.$el.html(compiledTemplate);

				this.initializeEvents();
				
				//this.setWidgetContainerPosition();
				
				this.initializeWidgets();
			},
			
			initializeWidgets: function() {
				//initialize here nowPlaying widget, RSS widget
			},
			
			displayContentView: function(view) {
				var that = this;
				if (this.currentView) {
					if (this.currentView.hide) {
						this.currentView.hide(function() {
							that.currentView = view;
							that._animateCurrentView();
						});
					} else {
						this.currentView.$el.fadeOut(200, function() {
							that.currentView = view;
							that._animateCurrentView();
						});
					}
				} else {
					this.currentView = view;
					this._animateCurrentView();
				}
			},

			_animateCurrentView: function() {
				if (this.currentView.defaultBackground) {
					this.updateBackground(this.currentView.defaultBackground);
				}
				var $elToShow = this.currentView.render().$el;
				$elToShow.css("display", "none");
				$("#globalContent", this.$el).html($elToShow);
				if (this.currentView.show) {
					this.currentView.show();
				} else {
					$elToShow.fadeIn(200);
				}
			},
			
			initializeEvents: function() {
				var that = this;
				this.$header = $("#header", this.$el);
				this.$footer = $("#header", this.$el);
				this.$containerToResize = $("#containerToResize", this.$el);
				this.$backgroundContainer = $("#background-container", this.$el);
				this.$widgetContainer = $("#mainWidget", this.$el);

				this.resizeContainerEl();
				
				$(window).on("resize", function() {
					that.resizeContainerEl();
					that.resizeBackGroundContainer();
					that.setWidgetContainerPosition();
				});
				
				$(document).on("backgroundUpdateAsked", function(event, background) {
					that.updateBackground(background);
				});
				
				$(document).on("widgetUpdateAsked", function(event, widgetClass) {
					that.updateWidget(widgetClass);
				});
				
				$(document).on("pageChanged", function() {
					//that.updateBackground();
				});
			},
			
			setWidgetContainerPosition: function() {
				this.$widgetContainer.position({
					my :"top left",
					at :"top-180 left",
					of :$("#globalContent", this.$el)
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
				if (!background && this.defaultBackground) {
					background = this.defaultBackground;
				}
				if (!background) {
					return;
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
			
			updateWidget: function(widgetClass) {
				if (!widgetClass) {
					this.$widgetContainer.html("");
					return;
				}
				var that = this;
				var widget = new widgetClass();
				widget.on("widgetUpdated", function() {
					that.$widgetContainer.append(widget.$el);
					that.setWidgetContainerPosition();
				});
				widget.render();
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