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

var stateKey = 'spotify_auth_state';

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-library-read playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null)  {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    // get all playlists api call.
    request.post(authOptions, function(error, response, body) {

      // resetting all of the variables.
      playlists_done = 0;
      playlist_hrefs = [];
      songs = [];

      // console.log(response);
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        function getUserID(callback, callback_2) {

          var options = {
            url: 'https://api.spotify.com/v1/me', // only gets 1st for testing
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // making the user api call.
          request.get(options, function(error, response, body) {
            user_id = body.id;
            // console.log(user_id);
          });
                  
          callback(callback_2); // calling getAllPlaylists(getAllTracks)
        }

        function getAllPlaylists(callback) {

          var my_var;
          // console.log(user_id);
          if (user_id == 0) {
            my_var = setTimeout(function() { getAllPlaylists(getAllTracks); }, 500);
            return;
          }

          var options = [];
            options = {
              url: 'https://api.spotify.com/v1/users/' + user_id + '/playlists?limit=25', // only gets 1st for testing
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            };

          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {

            // console.log(body);

            // carson's code
            for (var i = 0; i < body.items.length; i++) {
              // playlist_ids.push(body.items[i].id);
              playlist_hrefs.push(body.items[i].tracks.href);
              // console.log(body.items[i].tracks.href);
            }

            got_tracks = "true";

          });

          callback(); // calling getAllTracks();

        } // getAllPlaylists()
              
        function getAllTracks() {

          if (got_tracks != "true") {
            my_var = setTimeout(function() { getAllTracks(); }, 2000);
            return;
          }


          // filling up the tracks array.
          for (var j = 0; j < playlist_hrefs.length; j++) {

            // setting up the second API call.
            var new_options = {
              url: playlist_hrefs[j],
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            }

            // get a playlists tracks
            request.get(new_options, function(new_error, new_response, new_body) {
              // console.log(j);
              // all_tracks.push(new_body);
              // console.log(all_tracks);
              for (var k = 0; k < new_body.items.length; k++) {
                all_tracks.push(new_body.items[k]);

                // console.log(new_body.items[k].added_at);
              }
              playlists_done++;

              console.log(playlists_done + " and " + playlist_hrefs.length);
              // console.log(j);

            });

          }

          populateSongs();

        } // getAllTracks()

        function populateSongs() {

          if (playlists_done != playlist_hrefs.length) {
            my_var = setTimeout(function() { populateSongs(); }, 500);
            return;
          }

          // Getting the current day, month, and year.
          var current_date = new Date();
          var current_day = current_date.getDate();
          var current_month = current_date.getMonth() + 1; // b/c its 0 indexed.
          var current_year = current_date.getFullYear();

          // using a test value of 1:30 minutes, in other words, two years of FB data.
          var how_long_ago = 1.5; // years.

          // since
          var start_year = current_year;
          var start_month = current_month;
          var start_day = current_day;

          // if its a whole number, just adjust the year.
          if (how_long_ago % 1 == 0) {
            start_year -= how_long_ago;
          }
          // otherwise, subtract the year, then adjust the months.
          else {
            start_year -= (how_long_ago - 0.5);

            // if subtracting 6 months takes you into the previous year.
            if (start_month - 6 < 1) {
              --start_year;
            }
            start_month = (start_month + 6) % 12;
          }

          // until
          var end_year = start_year;
          var end_month = start_month + 6;
          var end_day = start_day;

          if (end_month > 12) {
            end_month = end_month % 12;
            ++end_year;
          }

          // incrementing every 6 months.
          while (!(start_year == current_year && start_month == current_month)) {

            var start_date = new Date(start_year, start_month, start_day);
            var end_date = new Date(end_year, end_month, end_day);

            // iterating through every track.
            for (var i = 0; i < all_tracks.length; i++) {

              if (all_tracks[i].added_at){

                var track_year = all_tracks[i].added_at.substring(0,4);
                var track_month = all_tracks[i].added_at.substring(5,7);
                var track_day = all_tracks[i].added_at.substring(8,10);

                var track_date = new Date(track_year, track_month, track_day);

                // if its within our time frame.
                if (track_date >= start_date && track_date <= end_date) {

                  // checking to see if it beats the popularity.
                  if (all_tracks[i].track.popularity > most_popular) {
                    most_popular = all_tracks[i].track.popularity;
                    name_of_song = all_tracks[i].track.name;
                    preview_url = all_tracks[i].track.preview_url;
                    artwork_url = all_tracks[i].track.popularity;
                  }
                } 

              }
              
            } // iterates all tracks.

            // adding the most popular song and incrementing the time.
            songs.push(preview_url);
            most_popular = 0;

            // moving to the next 6 month interval.
            start_year = end_year;
            start_month = end_month;
            // start_day = end_day;

            end_month += 6;

            if (end_month > 12) {
              end_month = end_month % 12;
              ++end_year;
            }

          }

          console.log(songs);

          // ajax call for the songs.
          app.post('/endpoint', function(req, res){
            var obj = {};
            console.log('body: ' + JSON.stringify(req.body));
            // while (spotify_complete != 1) {
              // console.log("not ready!!!!!!!");
            // }
            console.log("were ready, lol");
            res.send(songs);

          });
          // spotify_complete = 1;

        }

        


        
          // calling the functions.

        // if the user linked with spotify
        // if (spotify_linked) {
        //   songs = [];
        getUserID(getAllPlaylists, getAllTracks);
        // }
        // // if they supplied track/artist info
        // else if (user_requests) {

        //   songs = [];

        //   // cycling through each artist/track the user provided
        //   for (var i = 0; i < user_tracks.length; i++) {

        //     // replace blankspace with + signs.
        //     var track_name = user_tracks[i].split(' ').join('+');
        //     var artist_name = user_artists[i].split(' ').join('+');
        
        //     var new_url = 'https://api.spotify.com/v1/search?q=track:' + track_name + '+artist:' + artist_name + '&limit=1&type=track';

        //     var options = {
        //       url: new_url, // only gets 1st for testing
        //       headers: { 'Authorization': 'Bearer ' + access_token },
        //       json: true
        //     };

        //     // making the user api call.
        //     request.get(options, function(error, response, body) {
        //       // user_id = body.tracks.items.preview_url;
        //       songs.push(body.tracks.items.preview_url);
        //       console.log(body.tracks.items.preview_url);
        //     });


        //   }

        //   console.log(songs);
          
        // }

        // ************************* end of carson's code *****************************

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});




app.post('/video', function(req, res) {

	var obj = {};
	var XML_data = req.body.title;
	// console.log(req.body.title);


  var headers = {"Authorization": "Secret KDVWCGA46JHJRBZILA7GUEOFYA"};
  var task = {
    "tasks": {
      "task_name": "video.create",
      "task_store": { type: "volatile" },
      "profile": "240p",
      "definition": req.body.title
    }
  };

  request.post({
      url: "https://dragon.stupeflix.com/v2/create",
      body: task,
      headers: headers,
      json: true
    }, function (error, httpObj, taskCreation) {
      if (!error && httpObj.statusCode == 200) {
        function get_status() {
        	request.get({
            url: "https://dragon.stupeflix.com/v2/status",
            qs: { tasks: taskCreation[0]["key"] },
            headers: headers,
            json: true
          }, function(error, httpObj, taskStatusAndResult) {
            if (!error && httpObj.statusCode == 200) {
              // taskStatusAndResult[0]["status"] contains either "queued", "executing", "success", or "error"
              var my_var;
              if (taskStatusAndResult[0]["status"] == "success") {
              	res.send(taskStatusAndResult[0]["result"].export);
              } else {
                get_status();
                console.log(taskStatusAndResult[0]["status"]);
              }
              // res.send(taskStatusAndResult[0]["result"].export);
            }
          })
        }

        get_status();
          
      }
        
    }
  );
});


/*** End of Spotify ***/

app.get('/about', function (req, res) {
    // Render __dirname/views/download.jade
    res.render('about', {title: 'about'});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


