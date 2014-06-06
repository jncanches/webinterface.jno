WebInterface.Views.Main = Backbone.View.extend({
	template: _.template($('#tpl-main').html()),
	
	render: function() {
		this.setElement(this.template(this.model.attributes));
	    
	    return this;
	}
});