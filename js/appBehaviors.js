Marionette.Behaviors.behaviorsLookup = function() {
    return window.Behaviors;
}

window.Behaviors = {};
window.Behaviors.UpdateBackground = Marionette.Behavior.extend({
	modelEvents: {
		"change:selected": "updateBackground"
	},
	
	updateBackground: function() {
		if (this.view.model.get("selected") && this.view.model.get("background")) {
			app.appLayout.backgroundModel.set({image: this.view.model.get("background")});
		};
	}
});

window.Behaviors.UpdateWidget = Marionette.Behavior.extend({
	modelEvents: {
		"change:selected": "updateWidget"
	},
	
	updateWidget: function() {
		if (this.view.model.get("selected") && this.view.model.get("background")) {
			app.appLayout.backgroundModel.set({image: this.view.model.get("background")});
		};
	}
});