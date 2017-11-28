import json

def getSingleName(string):
  string = string.split(',')
  string.reverse()
  string[0] = string[0].replace(" ", "")
  string = string[0] + " " + string[1]
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

createCSVs()
