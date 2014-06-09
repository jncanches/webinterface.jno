window.WebInterface = window.WI = {
	Models: {},
	Collections: {},
	Views: {},
	XbmcCommand: {},

	jsonRpcUrl : '/jsonrpc',
	cached: {},
	stores: {},
	
	start: function(data) {
		var that = this;
		WI.Utils.buildXbmcObjectsStructure();
		$(document).on("xbmcConnectionEstablished", function() {
			that.loadApp(data);
		});
	},
	
	loadApp: function(data) {
		WebInterface.router = new WebInterface.Router();
		WebInterface.context = new WebInterface.Models.Context(data.context);
		WebInterface.mainView = new WebInterface.Views.Main({model: WebInterface.context});
		
		$("body").append(WebInterface.mainView.render().el);
		WebInterface.mainView.initializeEvents();

		WebInterface.mapEvents();
		
		WebInterface.router.on('route:home', function() {
			WebInterface.mainView.home();
		});

		WebInterface.router.on('route:movies', function() {
			WebInterface.mainView.movies();
		});
		
		WebInterface.router.on('route:tvshows', function() {
			WebInterface.mainView.tvshows();
		});
		
		Backbone.history.start();		
	},
	
	mapEvents: function() {
		WebInterface.router.on("route", function(route, params) {
		});
	}
	

};