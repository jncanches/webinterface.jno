var AppRouter = Backbone.Marionette.AppRouter.extend({
//	controller: AppController,
	appRoutes: {
		"": "displayHome",
		"home": "displayHome"//,
		//"movies": "displayMovies"
	}
});

//var AppRouter = Backbone.Router.extend({
//	routes: {
//		"":                         "home",
//		"home":                     "home",
//		"movies":                   "movies",
//		"tvshows":                  "tvshows"
//	},
//	
//	initialize: function(){
//		var that = this;
//		this.webInterfaceView = new WebInterfaceView();
//		
//	    this.on('route:home', function(){
//	    	// Call render on the module we loaded in via the dependency array
//	    	// 'views/projects/list'
//
//	    	that.webInterfaceView.render();
//	    	
//	    	if (!that.homeMenuBar) {
//	    		that.homeMenuBar = new HomeMenuBarView();
//	    	}
//	    	that.webInterfaceView.displayContentView(that.homeMenuBar);
//	    });
//		// As above, call render on our loaded module
//		// 'views/users/list'
//	    this.on('route:movies', function(){
//	    	if (!that.moviePosterListView) {
//	    		that.moviePosterListView = new that.MoviePosterListView();
//	    	}
//	    	that.webInterfaceView.displayContentView(that.moviePosterListView);
//	    });
//	    this.on('defaultAction', function(actions){
//	    	// We have no matching route, lets just log what the URL was
//	    	console.log('No route:', actions);
//	    });
//	    Backbone.history.start();
//	}
//});