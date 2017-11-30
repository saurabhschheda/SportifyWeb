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

exports.getLeagueResults = function (id, callback) {
  var sql = "SELECT G.HomeGoals AS HomeGoals,";
  sql = sql + "G.AwayGoals AS AwayGoals,";
  sql = sql + "T1.Name AS Home, T2.Name AS Away,";
  sql = sql + "G.Date AS Date, V.Name AS VenueName,";
  sql = sql + "V.City AS City, V.Country AS Country ";
  sql = sql + "FROM Game G, Team T1, Team T2, Venue V ";
  sql = sql + "WHERE G.League = '" + id + "' AND G.HomeGoals IS NOT NULL ";
  sql = sql + "AND T1.ID = G.Home AND T2.ID = G.Away AND V.ID = G.Venue ";
  sql = sql + "ORDER BY Date DESC";
  state.connection.query(sql, function (err, results) {
    if (err) callback(err, null);
    result = [];
    for (var i = 0; i < results.length; ++i) {
      var data = {}
      data["homeGoals"] = results[i].HomeGoals;
      data["awayGoals"] = results[i].AwayGoals;
      data["home"] = results[i].Home;
      data["away"] = results[i].Away;
      data["date"] = results[i].Date;
      data["venue"] = results[i].VenueName + ", " + results[i].City + ", " + results[i].country;
      result.push(data);
    }
    callback(null, result);
  });
}