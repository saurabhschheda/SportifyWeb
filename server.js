var express = require('express');
var path = require('path');
var hbs = require('express-hbs');
var db = require('./db');

var app = express();
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/public/views/layouts/main.hbs',
  partialsDir: __dirname + '/public/views',
  layoutsDir: __dirname + '/public/views/layouts'
}));
app.set('views', path.join(__dirname, '/public/views'));
app.use(express.static(path.join(__dirname, '/public')));
db.dbConnect();

app.get('/', function (req, res) {
  db.getAllLeagueIDs(function(err, result) {
    if (err) throw err;
    var options = {
      bundesliga: result[0],
      ligue1: result[1],
      bpl: result[2],
      laliga: result[3],
      serieA: result[4]
    };
    res.render('home', options);
  });  
});

app.get('/league/:id', function (req, res) {
  var id = req.params.id;
  db.getLeague(id, function(err, result) {
    if (err) throw err;
    res.render('league', result);
  })
});

app.get('/league/:id/results', function (req, res) {
  var id = req.params.id;
  db.getLeagueResults(id, function (err, result) {
    if (err) throw err;
    res.render('results', result);
  })
});

app.get('/league/:id/schedule', function (req, res) {
  var id = req.params.id;
  res.render('schedule');
});

app.get('/league/:id/standings', function (req, res) {
  // league_Standings.html
  var id = req.params.id;
  res.render('test', { token: id });
});

app.get('/team/:id', function (req, res) {
  // team.html
  var id = req.params.id;
  res.render('test', { token: id });
});

app.get('/team/:id/results', function (req, res) {
  // match_result.html
  var id = req.params.id;
  res.render('test', { token: id });
});

app.get('/team/:id/schedule', function (req, res) {
  // match_schedule.html
  var id = req.params.id;
  res.render('test', { token: id });
});

app.get('/team/:id/players', function (req, res) {
  // Team_players.html
  var id = req.params.id;
  res.render('test', { token: id });
});

app.listen(3333, function () {
  console.log('Server started on port 3333!');
});