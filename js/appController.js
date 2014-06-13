var AppController = Marionette.Controller.extend({
	initialize: function(options) {
		this.appLayout = options.appLayout
	},

	displayHome: function() {
		this.homeLayout = new HomeLayout();
		this.appLayout.content.show(this.homeLayout);
	}
});