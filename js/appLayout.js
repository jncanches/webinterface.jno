var AppLayout = Backbone.Marionette.Layout.extend({
	template: "#layout-app",

	onShow: function() {
		this.resizeElements();
		this.backgroundModel = new BackgroundModel();
		this.backgroundView = new BackgroundView({
			model: this.backgroundModel
		});
		this.regionBackground.show(this.backgroundView);
	},
	
	regions: {
		main: "#main_wrapper",
		regionBackground: "#region-background",
		regionHeader: "#region-header",
		regionNav: "#region-nav",
		regionContent: "#region-content",
		regionFooter: "#region-footer",
		resizable: "#region-to-resize"
	},

	resizeElements: function() {
		this.resizeContainerEl();
		this.resizeBackGroundContainer();
	},
	
	resizeContainerEl: function() {
		var newHeight = $(window).height()+4;
		if ($(this.regionHeader.el).is(':visible')) {
			newHeight = newHeight - $(this.regionHeader.el).height();
		}
		$(this.resizable.el).height(newHeight);
	},
	
	resizeBackGroundContainer: function() {
		var winw = $(window).width();
		var winh = $(window).height();
		if (winw <= 1024 || winh <= 768) {
			return;
		} 
		$(this.regionBackground.el).width(winw);
		$(this.regionBackground.el).height(winh);
	}

});