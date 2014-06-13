var BackgroundView = Backbone.Marionette.ItemView.extend({
	template: "#background",
	
	initialize: function() {
		this.listenTo(this.model, "change:image", this.rollBackground)
	},
	
	rollBackground: function() {
		//don't update background if something is now playing
		//if (! somethingnowplaying) {
		var newSrc = "skins/default/backgrounds/" + this.model.get("image");
		var $old = $("img", this.$el);
		if (newSrc != $old.attr("src")) {
			var $new = $("<img src='skins/default/backgrounds/" + this.model.get("image") + "'/>");
			this.$el.prepend($new);
			$old.fadeOut(300, function() {
				$(this).remove();
			});
		}
	}
});