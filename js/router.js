/**
 * navigation declaration
 */

WebInterface.Router = Backbone.Router.extend({
  routes: {
    "":                         "home",
    "homeMenu":    		        "homeMenu",
    "contact":                  "contact",
    "artist/:id":               "artist",
    "artist/:id/:task":         "artist",
    "artists":                  "artists",
    "album/:id":                "album",
    "music/radio":              "pvr",
    "albums":                   "music",
    "mymusic":                  "music",
    "music/:page":              "music",
    "music/:page/:id":          "music",
    "playlist/:id":             "playlist",
    "search/:q":                "search",
    "search":                   "searchLanding",
    "scan/:type":               "scan",
    "thumbsup":                 "thumbsup",
    "files":                    "files",
    "movies/page/:num/:sort":   "moviesPage",
    "movies/:tag/:id":          "moviesTag",
    "movie-genre/:tag":         "movieGenre", // wrapper for moivesTag
    "movies/:tag":              "moviesTag",
    "movies":                   "moviesLanding",
    "mymovies":                 "moviesLanding",
    "movie/:id":                "movie",
    "tv/page/:num/:sort":       "tvshows",
    "tv":                       "tvshowsLanding",
    "tv/live":                  "pvr",
    "mytv":                     "tvshowsLanding",
    "tv/:tag/:id":              "tvshowTag",
    "tv/:tag":                  "tvshowTag",
    "tvshow/:id":               "tvshow",
    "tvshow/:tvid/:seas":       "season",
    "tvshow/:tv/:s/:e":         "episode",
    "xbmc/:op":                 "xbmc",
    "remote":                   "remoteControl",
    "playlists":                "playlists"
  	}
});