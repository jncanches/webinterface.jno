WebInterface.Views.HomeMenuItems = Backbone.View.extend({
	template: _.template($('#tpl-homeMenuItems').html()),
	
	renderOne: function(homeMenuItem) {
		var itemView = new WebInterface.Views.HomeMenuItem({model: homeMenuItem});
		this.$el.append(itemView.render().$el);
	},
	
	render: function() {
		this.setElement(this.template(this.model));
	    
	    this.collection.each(this.renderOne, this);
	    
	    return this;
	}
});