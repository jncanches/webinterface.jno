define([
  'jquery',
  'underscore',
  'backbone',
  'views/webInterface/webInterface',
  'views/lists/moviePosterList',
  //'views/items/moviePoster'
], function($, _, Backbone, WebInterfaceView, MoviePosterListView) {//}, moviePosterListView, moviePosterView){
	var AppRouter = Backbone.Router.extend({
		WebInterfaceView: WebInterfaceView,
		MoviePosterListView: MoviePosterListView,
		routes: {
			"":                         "home",
			"home":                     "home",
			"movies":                   "movies",
			"tvshows":                  "tvshows"
		},
		
		initialize: function(){
			var that = this;
			this.webInterfaceView = new WebInterfaceView();
			
		    this.on('route:home', function(){
		      // Call render on the module we loaded in via the dependency array
		      // 'views/projects/list'
		      that.webInterfaceView.render();
		    });
			// As above, call render on our loaded module
			// 'views/users/list'
		    this.on('route:movies', function(){
		      var moviePosterListView = new that.MoviePosterListView();
		      that.webInterfaceView.displayContentView(moviePosterListView);
		    });
		    this.on('defaultAction', function(actions){
		    	// We have no matching route, lets just log what the URL was
		    	console.log('No route:', actions);
		    });
		    Backbone.history.start();
		}
	});
	return AppRouter;
});