requirejs.config({
    paths: {
    	'underscore': 'libs/underscore/underscore',
    	'backbone': 'libs/Backbone/backbone-min',
        'jquery': 'libs/jquery/jquery',
        'text': 'libs/require/text',
    }
});

//Load our app module and pass it to our definition function
require(['app'], function(App){
	// The "app" dependency is passed in as "App"
	App.initialize();
});