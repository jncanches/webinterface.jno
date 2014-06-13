var AppLayout = Backbone.Marionette.Layout.extend({
	template: "#layout-app",

	regions: {
		main: "#main_wrapper",
		background: "#background-container",
		header: "#header",
		nav: "#nav",
		content: "#content",
		footer: "#globalFooter",
		resizable: "#containerToResize"
	}
});