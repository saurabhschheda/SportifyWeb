var mysql = require('mysql');

var state = {
  connection: null
}

exports.dbConnect = function() {
  state.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'QutabMinar5',
    database: 'Sportify'
  });
  state.connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected...')
  });
}

exports.getAllLeagueIDs = function(callback) {
  state.connection.query("SELECT ID FROM League ORDER BY Name", function (err, results) {
    if (err) callback(err, null);
    leagues = []
    for (var i = 0; i < results.length; ++i) {
      leagues.push(results[i].ID);
    }
    callback(null, leagues);
  });
}
