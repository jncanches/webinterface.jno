define([
	'underscore',
	'backbone',
	'models/widgets/homeMenuBarItem'
], function(_, Backbone, HomeMenuBarItemModel){
	var HomeMenuBarItemCollection = Backbone.Collection.extend({
		model: HomeMenuBarItemModel,
		
		initialize: function() {
			this.set([{
				id: 1,
				label : 'Albums',
				link: '#movies',
				background: 'disc.jpg'
			},
			{
				id: 2,
				label : 'Artistes',
				link: '#movies',
				background: 'concerts.jpg'
			},
			{
				id: 3,
				label : 'Musique',
				link: '#movies',
				selected: true,
				background: 'music.jpg'
			},
			{
				id: 4,
				label : 'Films',
				link: '#movies',
				background: "movies.jpg"
			},
			{
				id: 5,
				label : 'Series TV',
				link: '#tvshows',
				background: "tvshows.jpg"
			},
			{
				id: 6,
				label : 'Animations',
				link: '#tvshows',
				background: 'Dragons.jpg'
			},
			{
				id: 7,
				label : 'Animes',
				link: '#tvshows',
				background: 'SanGohan.jpg'
			},
			{
				id: 9,
				label : 'TV en direct',
				link: '#tvshows',
				background: 'livetv.jpg'
			},
			{
				id: 10,
				label : 'Photos',
				link: '#tvshows',
				background: 'summer.jpg'
			},
			{
				id: 11,
				label : 'Meteo',
				link: '#tvshows',
				background: 'winter.jpg'
			},
			{
				id: 12,
				label : 'Jeux',
				link: '#tvshows',
				background: 'games.jpg'
			},
			{
				id: 13,
				label : 'Parametres',
				background: 'settings.jpg'
			}
			]);

		},
		
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
	// Return the model for the module
	return HomeMenuBarItemCollection;
});