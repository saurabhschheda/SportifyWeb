import json
import os

def getSingleName(string):
  string = string.split(',')
  string.reverse()
  string[0] = string[0].replace(" ", "")
  try:
    string = string[0] + " " + string[1]
  except IndexError:
    string = string[0]
  return string

def createCSVs():
  teamCSV = open("data/team.csv", 'w')
  teamCSV.close()
  playerCSV = open("data/player.csv", 'w')
  playerCSV.close()
  venueCSV = open("data/venue.csv", 'w')
  venueCSV.close()
  matchCSV = open("data/match.csv", 'w')
  matchCSV.close()

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

def extractData(filename):
  jsonFile = open(filename, 'r')
  data = json.loads(jsonFile.read())
  jsonFile.close()
  # extractTeamData(data)
  extractVenueData(data)
  # extractPlayerData(data)

def fillCSV():
  createCSVs()
  path = "data/json/teams/"
  for filename in os.listdir(path):
    extractData(path + filename)

fillCSV()
