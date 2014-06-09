WebInterface.Views.MoviePoster = Backbone.View.extend({
	tagName: 'li',
	className: '',
	template: _.template($('#tpl-moviePoster').html()),
	
	render: function() {
		this.setElement(this.template(this.model.attributes));
		this.$el.data("view", this);
		this.model.view = this;
		return this; 
	}
});