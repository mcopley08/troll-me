var express = require('express');
var request = require('request'); // "Request" library
var querystring = require('querystring');
var bodyParser = require('body-parser')
var app = express();

// parse application/json
app.use(bodyParser.json())

var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

GLOBAL.songs_array = new Array();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('home', {title: 'home', songs_array: songs_array});
});

app.post('/', function(req, res) {
  res.render('home', {title: 'home', songs_array: songs_array});
});


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


