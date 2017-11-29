var express = require('express');
var mysql = require('mysql')

var app = express();
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'QutabMinar5',
  database: 'Sportify'
})

connection.connect(function (err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.get('/', function (req, res) {
  res.send('Backend working');
});

app.listen(3333, function () {
  console.log('Example app listening on port 3333!');
});