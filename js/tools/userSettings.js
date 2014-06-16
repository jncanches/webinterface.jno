UserSettings = {
	defaults: {
		homeMenuItems: [{
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
			background: "movies.jpg",
			widget: RecentlyAddedMoviesView,
			widgetData: RecentlyAddedMoviesCollection
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
			link: '#params',
			background: 'settings.jpg'
		}
		]
	}
};