WebInterface.Views.HomeMenuItem = Backbone.View.extend({
	tagName: 'li',
	className: '',
	template: _.template($('#tpl-homeMenuItem').html()),
	
	render: function() {
		var html = this.template(this.model.attributes);
	    this.$el.html(html);
		return this; 
	}
});