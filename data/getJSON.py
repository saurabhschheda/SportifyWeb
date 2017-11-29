import key
import http.client
import json

KEY = key.getAPIKey()

def getFromServer(url):
  conn = http.client.HTTPSConnection("api.sportradar.us")
  conn.request("GET", "/soccer-t3/global/en/" + url)
  res = conn.getresponse()
  data = res.read().decode("utf-8")
  return data

def getData(url, isRaw):
  data = getFromServer(url)
  try:
    jsonData = json.loads(data)
    if isRaw: return data
    else: return jsonData
  except ValueError:
    return getData(url, isRaw)

def getTeamIDs(league):
  path = "tournaments/sr:tournament:" + str(league) + "/info.json?api_key=" + KEY
  data = getData(path, False)
  teamIDs = []
  teamList = data["groups"][0]["teams"]
  for team in teamList:
    teamIDs.append(team["id"])
  return teamIDs

def getAllTeamIDs():
  leagues = [17, 23, 34, 35, 8]
  teamIDs = []
  for league in leagues:
    print("Getting teams of league " + str(league) + " ...")
    teamIDs = teamIDs + getTeamIDs(league)
  return teamIDs

def writeJson(url, path):
  data = getData(url, True)
  jsonFile = open(path, 'w')
  jsonFile.write(data)
  jsonFile.close()

def updateTeams():
  print("Getting all team IDs ...")
  teams = getAllTeamIDs()
  print(str(len(teams)) + " teams found")
  for team in teams:
    url = "teams/" + team + "/profile.json?api_key=" + KEY
    path = "data/json/teams/" + team.replace(':', '_') + ".json"
    print("Writing " + team + "into file ...")
    writeJson(url, path)

def updateMatches():
  leagues = [17, 23, 34, 35, 8]
  for league in leagues:
    print("For league " + str(league))
    print("Writing Results ...")
    url = "tournaments/sr:tournament:" + \
        str(league) + "/results.json?api_key=" + KEY
    writeJson(url, "data/json/matches/results_" + str(league) + ".json")
    print("Writing Schedule ...")
    url = "tournaments/sr:tournament:" + \
        str(league) + "/schedule.json?api_key=" + KEY
    writeJson(url, "data/json/matches/schedule_" + str(league) + ".json")
