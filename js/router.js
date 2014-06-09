define([
  'jquery',
  'underscore',
  'backbone',
  'views/webInterface/webInterface',
  'views/widgets/homeMenuBar'
  //'views/lists/moviePosterList',
  //'views/items/moviePoster'
], function($, _, Backbone, WebInterfaceView, HomeMenuBarView) {//}, moviePosterListView, moviePosterView){
	var AppRouter = Backbone.Router.extend({
		WebInterfaceView: WebInterfaceView,
		HomeMenuBarView: HomeMenuBarView,
		routes: {
			"":                         "home",
			"home":                     "home",
			"movies":                   "movies",
			"tvshows":                  "tvshows"
		},
		
		initialize: function(){
			var that = this;
		    this.on('route:home', function(){
		      // Call render on the module we loaded in via the dependency array
		      // 'views/projects/list'
		      var WebInterfaceView = new that.WebInterfaceView();
		      WebInterfaceView.render();
		    });
			// As above, call render on our loaded module
			// 'views/users/list'
		    this.on('route:movies', function(){
		      var moviePosterListView = new that.moviePosterListView();
		      moviePosterListView.render();
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