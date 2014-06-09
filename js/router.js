define([
  'jquery',
  'underscore',
  'backbone',
  'views/webInterface/webInterface',
  'views/widgets/homeMenuBar',
  'views/lists/moviePosterList',
  'views/items/moviePoster'
], function($, _, Backbone, WebInterfaceView, homeMenuBarView, moviePosterListView, moviePosterView){
  var AppRouter = Backbone.Router.extend({
    routes: {
    	"":                         "home",
        "home":                     "home",
        "movies":                   "movies",
        "tvshows":                  "tvshows",
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    app_router.on('home', function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      var WebInterfaceView = new WebInterfaceView();
      WebInterfaceView.render();
    });
      // As above, call render on our loaded module
      // 'views/users/list'
    app_router.on('movies', function(){
      var moviePosterListView = new moviePosterListView();
      moviePosterListView.render();
    });
    app_router.on('defaultAction', function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
    });
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});