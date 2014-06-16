var app = new Backbone.Marionette.Application();

app.addInitializer(function(options){
	//initilize global application layout
	
	this.appContainer = new Backbone.Marionette.Region({
		  el: "#main_wrapper"
	});
	this.appLayout = new AppLayout();
	this.appContainer.show(this.appLayout);
	
	$('body').html($(this.appContainer.el));
	
//	var homeMenuBarView = new HomeMenuBarView({collection: new Backbone.Collection(UserSettings.defaults.homeMenuItems)});
	
//	this.appLayout.content.show(homeMenuBarView);

});

app.addInitializer(function(options){
	var that = this;
	$(window).on("resize", function() {
		that.appLayout.resizeElements();
	})
});

app.addInitializer(function(options){
	var appController = new AppController({appLayout: this.appLayout});
	new AppRouter({controller: appController});
});

app.on('initialize:after', function() {
	$(document).on("xbmcConnectionEstablished", function() {
		if (Backbone.history){ Backbone.history.start(); }
	})
	Utils.buildXbmcObjectsStructure();
});

$(function() {
	app.start();
});