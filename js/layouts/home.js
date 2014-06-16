var HomeLayout = Backbone.Marionette.Layout.extend({
	template: "#layout-home",

	onShow: function() {
		var homeMenuBarView = new HomeMenuBarView({collection: new Backbone.Collection(UserSettings.defaults.homeMenuItems)});
		this.regionHomeMenu.show(homeMenuBarView);
		
		var that = this;
		homeMenuBarView.on("selectedChanged", function() {
			that.updateWidget();
		});
	},

	regions: {
		regionWidgetDetail: "#region-widget-detail",
		regionWidget: "#region-widget",
		regionHomeMenu: "#region-home-menu",
		regionWidgetHomeSubMenu: "#region-home-sub-menu"
	},
	
	updateWidget: function() {
		var selectedItemView = this.regionHomeMenu.currentView.getSelectedItemView();
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
				this.regionWidget.show(selectedItemView.widgetView);
			} else {
				this.regionWidget.close();
			}
		}
	}
});