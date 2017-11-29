var express = require('express');
var mysql = require('mysql');
var path = require('path');
var hbs = require('express-hbs');

var app = express();
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/public/views/layouts/main.hbs',
  partialsDir: __dirname + '/public/views',
  layoutsDir: __dirname + '/public/views/layouts'
}));
app.set('views', path.join(__dirname, '/public/views'));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'QutabMinar5',
  database: 'Sportify'
});

connection.connect(function (err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.get('/', function (req, res) {
  // home.html
  // var id = req.params.id
  res.render('hello', { token: 'Sportify' });
});

app.get('/league/:id', function (req, res) {
  // league.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.get('/league/:id/results', function (req, res) {
  // matches_result.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.get('/league/:id/schedule', function (req, res) {
  // matches_schedule.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.get('/league/:id/standings', function (req, res) {
  // league_Standings.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.get('/team/:id', function (req, res) {
  // team.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.get('/team/:id/results', function (req, res) {
  // match_result.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.get('/team/:id/schedule', function (req, res) {
  // match_schedule.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.get('/team/:id/players', function (req, res) {
  // Team_players.html
  var id = req.params.id;
  res.render('hello', { token: id });
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});