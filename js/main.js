requirejs.config({
    paths: {
    	'underscore': 'libs/underscore/underscore',
    	'backbone': 'libs/Backbone/backbone-min',
        'jquery': 'libs/jquery/jquery',
        'router': 'router',
        'text': 'libs/require/text',
        'xbmcControllerHttp': 'libs/XbmcController/XbmcHttpApi',
        'xbmcControllerWebSocket': 'libs/XbmcController/XbmcWebSocketsApi',
    }
});

//Load our app module and pass it to our definition function
require(['app'], function(App){
	// The "app" dependency is passed in as "App"
	var app = new App();
});