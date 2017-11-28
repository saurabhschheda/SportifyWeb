# import json

# def getSingleName(string):
#   string = string.split(',')
#   string.reverse()
#   string[0] = string[0].replace(" ", "")
#   string = string[0] + " " + string[1]
#   return string

# def getTeamDetails(id):
#   path = "/soccer-t3/global/en/teams/" + str(id) + "/profile.json?api_key=" + KEY
#   teamJSON = getJSON(path)
#   name = teamJSON["team"]["name"]
#   league = teamJSON["statistics"]["seasons"][-1]["tournament"]["id"]
#   position = teamJSON["statistics"]["seasons"][-1]["statistics"]["group_position"]
#   try:
#     manager = teamJSON["manager"]["name"]
#     manager = getSingleName(manager)
#   except KeyError:
#     manager = 'None'
#   color1 = teamJSON["jerseys"][0]["base"]
#   color2 = teamJSON["jerseys"][0]["sleeve"]
#   with open("team.csv", 'a') as teamFile:
#     teamFile.write(id + "," + name + "," + league + "," + str(position) + "," + manager + "," + color1 + "," + color2 + '\n')

# for id in teamIDs:
#   getTeamDetails(id)
