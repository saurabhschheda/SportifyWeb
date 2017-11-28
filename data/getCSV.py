import json

def getSingleName(string):
  string = string.split(',')
  string.reverse()
  string[0] = string[0].replace(" ", "")
  string = string[0] + " " + string[1]
  return string
