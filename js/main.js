requirejs.config({
    paths: {
    	'underscore': 'libs/underscore/underscore',
    	'backbone': 'libs/Backbone/backbone-min',
        'jquery': 'libs/jquery/jquery',
        'jquery-ui': 'libs/jquery-ui/jquery-ui-1.11.0-beta.2.custom/jquery-ui.min',
        'jquery.mousewheel': 'libs/jquery/jquery.mousewheel',
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