var RecentlyAddedMoviesView = Backbone.Marionette.CollectionView.extend({
	tagName: "ul",
	className: "recently-added-movies-items",
	template: '#recentlyAddedMoviesWidget',
	
	itemView: RecentlyAddedMoviesItemView,
	
	onShow: function() {
		this.mapEvents();
		/*var selectedItemView = this.getSelectedItemView();
		if (!selectedItemView) {
			selectedItemView = this.children.first();
		}
		this.updateSelectedItemView(selectedItemView);*/
	},
	
	mapEvents: function() {
		/*var that = this;
		this.on("itemview:model:selectedChanged", function() {
			this.updateSelectedItemView();
		});
		
		this.mapKeyBoardEvents();
		this.mapMouseWheelEvents();*/
	}
});