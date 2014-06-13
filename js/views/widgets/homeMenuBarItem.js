var HomeMenuBarItemView = Backbone.Marionette.ItemView.extend({
	tagName: "div",
	className: "home-menu-item",
	template: '#homeMenuBarItem',
	
	modelEvents: {
		"change:selected": "selectedChanged"
	},
	
	behaviors: {
		UpdateBackground: {
			test: "test"
	    },
	    UpdateWidget: {
	    	test: "test"
	    }
	},
	
	selectedChanged: function() {
		if (this.model.get("selected")) {
			$("a", this.$el).addClass("selected");
		} else {
			$("a", this.$el).removeClass("selected");
		}
	}
});