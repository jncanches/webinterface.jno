var RecentlyAddedLayout = Backbone.Marionette.Layout.extend({
	template: "#layout-recently-added-widget",

	onShow: function() {
	},

	regions: {
		details: "#widgetDetails",
		main: "#widgetMain"
	}
});