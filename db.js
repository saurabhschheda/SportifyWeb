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
    console.log('Database connection established')
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

exports.getLeague = function(id, callback) {
  var sql = "SELECT * FROM League WHERE ID = '" + id + "';";
  state.connection.query(sql, function (err, results) {
    if (err) callback(err, null);
    result = {};
    result["id"] = id;
    result["name"] = results[0].Name;
    result["country"] = results[0].Country;
    result["coefficient"] = results[0].UEFACoefficient;
    callback(null, result);
  });
}
