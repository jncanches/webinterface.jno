var HomeLayout = Backbone.Marionette.Layout.extend({
	template: "#layout-home",

	onShow: function() {
		var homeMenuBarView = new HomeMenuBarView({collection: new Backbone.Collection(UserSettings.defaults.homeMenuItems)});
		this.homeMenu.show(homeMenuBarView);
		
		var that = this;
		homeMenuBarView.on("selectedChanged", function() {
			that.updateWidget();
		});
	},

	regions: {
		homeMenu: "#homeMenu",
		widget: "#widget"
	},
	
	updateWidget: function() {
		var selectedItemView = this.homeMenu.currentView.getSelectedItemView();
		if (selectedItemView) {
			var widgetView = selectedItemView.widgetView;
			if (!widgetView) {
				var widget = selectedItemView.model.get("widget");
				if (widget) {
					var widgetDataClass = selectedItemView.model.get("widgetData");
					var widgetData = new widgetDataClass();
					//store widget view in selectedItem
					selectedItemView.widgetView = new widget({collection: widgetData});
					widgetData.fetch();
				}
			}
			if (selectedItemView.widgetView) {
				this.widget.show(selectedItemView.widgetView);
			} else {
				this.widget.close();
			}
		}
	}
});