WebInterface.Views.HomeMenuItem = Backbone.View.extend({
	tagName: 'li',
	className: '',
	template: _.template($('#tpl-homeMenuItem').html()),
	
	render: function() {
		var html = '<h1>' + this.model.get('label') + '</h1>';
		this.$el.html(html);
		return this; 
	}
});