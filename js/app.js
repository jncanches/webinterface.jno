window.WebInterface = {
	Models: {},
	Collections: {},
	Views: {},

	start: function(data) {
		
		WebInterface.router = new WebInterface.Router();
		WebInterface.context = new WebInterface.Models.Context(data.context);
		WebInterface.mainView = new WebInterface.Views.Main({model: WebInterface.context});
		$("body").append(WebInterface.mainView.render().el);
		
		WebInterface.router.on('route:home', function() {
			//render home menu
			var homeMenuItems = new WebInterface.Collections.HomeMenuItems(data.homeMenuItems);
			var homeMenuItemsView = new WebInterface.Views.HomeMenuItems({
				collection: homeMenuItems
			});
			$('#globalContent').html(homeMenuItemsView.render().$el);
		});

		WebInterface.router.on('route:movies', function() {
			$('#globalContent').html("Movies here !!!");
		});

		Backbone.history.start();
	}
};