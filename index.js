var express = require('express');
var app = express();
var request = require('request');

app.set('port', (process.env.PORT || 5000));

//setup cross-origin

var cors =  {
    origin: ["<<your allowed domains>>"],
    default: "<<your default allowed domain>>" 
};

app.use(function(req, res, next) {

  var origins = cors.origin.indexOf(req.header('origin')) > -1 ? req.headers.origin : cors.default;

  res.header("Access-Control-Allow-Origin", origins);

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  next();

});


app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//Router for rest api

var key = '<<your api key obtained from criapi.com>>';

app.get('/matches', function(req, res, next) {
  request({
    uri: 'https://cricapi.com/api/cricket?apikey='+key    
  }).pipe(res);
});

app.get('/match/:id', function(req, res, next) {
var unique_id = req.params.id;
  request({
    uri: 'http://cricapi.com/api/cricketScore?unique_id='+unique_id+'&apikey='+key    
  }).pipe(res);
});

app.get('/match/summary/:id', function(req, res, next) {
var unique_id = req.params.id;
  request({
    uri: 'http://cricapi.com/api/fantasySummary?unique_id='+unique_id+'&apikey='+key 
  }).pipe(res);
});

app.get('/match/squad/:id', function(req, res, next) {
var unique_id = req.params.id;
  request({
    uri: 'http://cricapi.com/api/fantasySquad?unique_id='+unique_id+'&apikey='+key    
  }).pipe(res);
});

app.get('/player/:id', function(req, res, next) {
var pid = req.params.id;
  request({
    uri: 'http://cricapi.com/api/playerStats?pid='+pid+'&apikey='+key    
  }).pipe(res);
});

app.get('/matchcalender', function(req, res, next) {
var pid = req.params.id;
  request({
    uri: 'http://cricapi.com/api/matchCalendar&apikey='+key    
  }).pipe(res);
});









