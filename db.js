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

exports.getTeam = function (id, callback) {
  var sql = "SELECT T.ID AS ID, T.Name AS Name, "
  sql = sql + "L.Name AS League, T.Position AS Position, T.Manager AS Manager"
  sql = sql + " FROM Team T, League L WHERE T.ID = '" + id + "' ";
  sql = sql + " AND T.League = L.ID;"
  state.connection.query(sql, function (err, results) {
    if (err) callback(err, null);
    result = {};
    result["id"] = results[0].ID;
    result["name"] = results[0].Name;
    result["league"] = results[0].League;
    result["position"] = results[0].Position;
    result["manager"] = results[0].Manager;
    callback(null, result);
  });
}

function generateMatchQuery(id, isLeague, isSchedule) {
  var sql = "SELECT ";
  if (!isSchedule) {
    sql = sql + "G.HomeGoals AS HomeGoals,";
    sql = sql + "G.AwayGoals AS AwayGoals,";
  }  
  sql = sql + "T1.Name AS Home, T2.Name AS Away,";
  sql = sql + "G.Date AS Date, V.Name AS VenueName,";
  sql = sql + "V.City AS City, V.Country AS Country ";
  sql = sql + "FROM Game G, Team T1, Team T2, Venue V ";
  if (isLeague) sql = sql + "WHERE G.League = '" + id + "' ";
  else 
    sql = sql + "WHERE (G.Home = '" + id + "' OR G.Away = '" + id + "') "; 
  sql = sql + " AND G.HomeGoals IS "
  if (isSchedule) sql = sql + "NULL ";
  else sql = sql + "NOT NULL ";
  sql = sql + "AND T1.ID = G.Home AND T2.ID = G.Away AND V.ID = G.Venue ";
  sql = sql + "ORDER BY Date";
  if (!isSchedule) sql = sql + " DESC";
  return sql;
}

exports.getResults = function (id, isLeague, callback) {
  var sql = generateMatchQuery(id, isLeague, false);
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

exports.getSchedule = function (id, isLeague, callback) {
  var sql = generateMatchQuery(id, isLeague, true);
  state.connection.query(sql, function (err, results) {
    if (err) callback(err, null);
    result = [];
    for (var i = 0; i < results.length; ++i) {
      var data = {}
      data["home"] = results[i].Home;
      data["away"] = results[i].Away;
      data["date"] = results[i].Date;
      data["venue"] = results[i].VenueName + ", " + results[i].City + ", " + results[i].Country;
      result.push(data);
    }
    callback(null, result);
  });
}

exports.getStandings = function(id, callback) {
  var sql = "SELECT ID, Position, Name FROM Team WHERE League = '" + id + "' ORDER BY Position";
  state.connection.query(sql, function (err, results) {
    if (err) callback(err, null);
    result = [];
    for (var i = 0; i < results.length; ++i) {
      var data = {}
      data["id"] = results[i].ID;
      data["position"] = results[i].Position;
      data["name"] = results[i].Name;
      result.push(data);
    }
    callback(null, result);
  });
}

exports.getPlayers = function (id, callback) {
  var sql = "SELECT P.Name AS Name, P.Age AS Age, "
  sql = sql + "P.Position AS Position, P.JerseyNo AS Jersey"
  sql = sql + " FROM Team T, Player P WHERE P.Team = '" + id + "' ";
  sql = sql + " AND P.Team = T.ID;"
  state.connection.query(sql, function (err, results) {
    if (err) callback(err, null);
    result = [];
    for (var i = 0; i < results.length; ++i) {
      var data = {};
      var name = results[i].Name;
      var seperator = name.indexOf(' ');
      if (seperator != -1) {
        data["firstName"] = name.substr(0, name.indexOf(' '));
        data["lastName"] = name.substr(name.indexOf(' '));
      } else {
        data["lastName"] = name;
        data["firstName"] = "";
      }
      data["age"] = results[i].Age;
      data["position"] = results[i].Position;
      data["jersey"] = results[i].Jersey;
      result.push(data);
    }
    callback(null, result);
  });
}