import json
import os
from datetime import date

def getSingleName(string):
  string = string.split(',')
  string.reverse()
  string[0] = string[0].replace(" ", "")
  try: string = string[0] + " " + string[1]
  except IndexError: string = string[0]
  return string

def getAge(dob):
  dob = dob.split('-')
  for i in range(len(dob)): dob[i] = int(dob[i])
  today = date.today()
  return today.year - dob[0] - ((today.month, today.day) < (dob[1], dob[2]))

def createCSVs():
  teamCSV = open("data/team.csv", 'w')
  teamCSV.close()
  playerCSV = open("data/player.csv", 'w')
  playerCSV.close()
  venueCSV = open("data/venue.csv", 'w')
  venueCSV.close()
  matchCSV = open("data/match.csv", 'w')
  matchCSV.close()

def getJSONData(filename):
  jsonFile = open(filename, 'r')
  data = json.loads(jsonFile.read())
  jsonFile.close()
  return data

def writeCSV(filename, line):
  csv = open(filename, 'a')
  csv.write(line)
  csv.close()

def extractTeamData(data):
  id = data["team"]["id"]
  name = data["team"]["name"]
  league = data["statistics"]["seasons"][-1]["tournament"]["id"]
  position = data["statistics"]["seasons"][-1]["statistics"]["group_position"]
  try: manager = getSingleName(data["manager"]["name"])
  except KeyError: manager = "None"
  color1 = data["jerseys"][0]["base"]
  try: color2 = data["jerseys"][0]["sleeve"]
  except KeyError: color2 = color1
  line = id + "," + name + "," + league + "," + str(position) + "," + manager
  line = line + "," + color1 + "," + color2 + "\n"
  writeCSV("data/team.csv", line)

def extractVenueData(data):
  data = data["venue"]
  id = data["id"]
  name = data["name"]
  try: [latitude, longitude] = data["map_coordinates"].split(',')
  except KeyError: [latitude, longitude] = [0, 0]
  city = data["city_name"]
  country = data["country_name"]
  capacity = data["name"]
  line = id + "," + name + "," + str(latitude) + "," + str(longitude) + ","
  line = line + city + "," + country + "," + str(capacity) + "\n"
  writeCSV("data/venue.csv", line)

def extractPlayerData(data):
  players = data["players"]
  team = data["team"]["id"]
  for player in players:
    id = player["id"]
    name = getSingleName(player["name"])
    age = getAge(player["date_of_birth"])
    position = player["type"]
    try: jerseyNo = player["jersey_number"]
    except KeyError: jerseyNo = 0
    line = id + "," + name + "," + str(age) + "," + team + "," + position + ","
    line = line + str(jerseyNo) + "\n"
    writeCSV("data/player.csv", line)

def extractData(filename):
  data = getJSONData(filename)
  extractTeamData(data)
  extractVenueData(data)
  extractPlayerData(data)

def getMatchDataLine(match):
  id = match["id"]
  competitors = match["competitors"]
  home = competitors[0]["id"]
  away = competitors[1]["id"]
  league = match["tournament"]["id"]
  date = match["scheduled"][0:19].replace('T', ' ')
  venue = match["venue"]["id"]
  line = id + "," + home + "," + away + "," + league + "," + date + "," + venue
  return line

def extractResults(league):
  results = getJSONData("data/json/matches/results_" + str(league) + ".json")
  matches = results["results"]
  for match in matches:
    matchData = match["sport_event"]
    line = getMatchDataLine(matchData)    
    resultData = match["sport_event_status"]
    try: homeGoals = resultData["home_score"]
    except KeyError: homeGoals = 0
    try: awayGoals = resultData["away_score"]
    except KeyError: awayGoals = 0
    line = line + "," + str(homeGoals) + "," + str(awayGoals) + "\n"
    writeCSV("data/match.csv", line)

def extractSchedule(league):
  schedule = getJSONData("data/json/matches/schedule_" + str(league) + ".json")
  matches = schedule["sport_events"]
  for match in matches:
    line = getMatchDataLine(match)
    line = line + ",,\n"
    writeCSV("data/match.csv", line)

def extractMatchData():
  leagues = [17, 23, 34, 35, 8]
  for league in leagues:
    extractResults(league)
    extractSchedule(league)

def fillCSV():
  createCSVs()
  path = "data/json/teams/"
  for filename in os.listdir(path):
    extractData(path + filename)
  extractMatchData()
