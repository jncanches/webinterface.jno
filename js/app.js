window.WebInterface = {
	Models: {},
	Collections: {},
	Views: {},

	start: function(data) {
		var homeMenuItems = new WebInterface.Collections.HomeMenuItems(data.homeMenuItems);
		var router = new WebInterface.Router();
		
		router.on('route:home', function() {
			router.navigate('homeMenu', {
				trigger: true,
				replace: true
			});
		});

		router.on('route:homeMenu', function() {
			var homeMenuItemsView = new WebInterface.Views.HomeMenuItems({
				collection: homeMenuItems
			});
			$('#globalContent').html(homeMenuItemsView.render().$el);
		});

		Backbone.history.start();
	}
};