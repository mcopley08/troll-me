var express = require('express');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var bodyParser = require('body-parser')
var app = express();

// parse application/json
app.use(bodyParser.json())

var client_id = '41c249feb1414615b629d220c25047ee'; // Your client id
var client_secret = '61a4d347629f45c7bdb3bfaa4503f665'; // Your secret
var redirect_uri = 'http://localhost:5000/callback'; // Your redirect uri

var scopes = 'user-read-private user-read-email playlist-read-private user-library-read'

var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// create redis client
// authenticate with redistogo
// in video creator, client.get('userid')

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

GLOBAL.songs_array = new Array();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('home', {title: 'home', songs_array: songs_array});
});


// ************* These are the variables for querying the Spotify API *****************
// grabbing the user's id, playlist href array, and other variables 
// needed for the api calls.
var user_id = 0;
var got_tracks = "";
var ready_populate = "";
var playlist_hrefs = [];
var playlists_done = 0;
var spotify_complete = 0;


// this is the array of songs to be used in the video.
var songs = [];

// setting up the date to be compared.
var current_date = new Date();

// these are the variables that we will be checkign every time.
var most_popular = 0;
var name_of_song = "";
var preview_url = "";
var artwork_url = "";
var all_tracks = [];

// ********************** Making the call to the playlists. ********************

/*** Spotify login route ***/

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};




/*** End of Spotify ***/

app.get('/about', function (req, res) {
    // Render __dirname/views/download.jade
    res.render('about', {title: 'about'});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


