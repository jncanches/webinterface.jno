WebInterface.Collections.HomeMenuItems = Backbone.Collection.extend({
	model: WebInterface.Models.HomeMenuItem,
	
	getSelectedModel: function() {
		var toReturn;
		this.each(function(item) {
			if (!toReturn) {
				if (item.get("selected")) {
					toReturn = item;
				}
			}
		});
		return toReturn;
	},
	
	getPreviousModel: function(fromModel) {
		var foundindex = 0;
		this.each(function(item, index) {
			if (!foundindex) {
				if (item.get("id") == fromModel.get("id")) {
					foundindex = index-1;
				}
			}
		});
		if (foundindex < 0) {
			foundindex = 0;
		}
		return this.at(foundindex);
	},
	
	getNextModel: function(fromModel) {
		var foundindex = 0;
		this.each(function(item, index) {
			if (!foundindex) {
				if (item.get("id") == fromModel.get("id")) {
					foundindex = index+1;
				}
			}
		});
		if (foundindex > this.length-1) {
			foundindex = this.length-1;
		}
		return this.at(foundindex);
	}
});