var AppLayout = Backbone.Marionette.Layout.extend({
	template: "#layout-app",

	onShow: function() {
		this.resizeElements();
		this.backgroundModel = new BackgroundModel();
		this.backgroundView = new BackgroundView({
			model: this.backgroundModel
		});
		this.background.show(this.backgroundView);
	},
	
	regions: {
		main: "#main_wrapper",
		background: "#background-container",
		header: "#header",
		nav: "#nav",
		content: "#content",
		footer: "#globalFooter",
		resizable: "#containerToResize"
	},

	resizeElements: function() {
		this.resizeContainerEl();
		this.resizeBackGroundContainer();
	},
	
	resizeContainerEl: function() {
		var newHeight = $(window).height()+4;
		if ($(this.header.el).is(':visible')) {
			newHeight = newHeight - $(this.header.el).height();
		}
		$(this.resizable.el).height(newHeight);
	},
	
	resizeBackGroundContainer: function() {
		var winw = $(window).width();
		var winh = $(window).height();
		if (winw <= 1024 || winh <= 768) {
			return;
		} 
		$(this.background.el).width(winw);
		$(this.background.el).height(winh);
	}

});