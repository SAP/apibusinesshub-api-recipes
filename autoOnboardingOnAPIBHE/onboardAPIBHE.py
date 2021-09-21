import requests
import os
from requests.auth import HTTPBasicAuth
from csv import reader
import json


def getAccessToken(apiEndpoint: str, clientId: str, clientSecret: str) -> str:

    tokenEndpoint = apiEndpoint+"?grant_type=client_credentials"
    r = requests.get(url=tokenEndpoint, auth=HTTPBasicAuth(
        clientId, clientSecret))
    if r.status_code == 200:
        j = json.loads(r.text)
        token = j["access_token"]
        print("Access Token retrieval successful")
        return token

    print("error in generating access token")


def acceptRegistration(apiEndpoint: str, token: str, userId: str, roleCollection: str):
    j = {
        "rolesAccess": [
            {
                "status": "registered",
                "role": roleCollection,
                "responseReason": "Accepting or Rejecting or Revoking Access"
            }]}
    registrationUrl: str = apiEndpoint+"/api/1.0/registrations/"+userId
    r = requests.put(url=registrationUrl, data=j, headers={
        "Authorizations": "Bearer "+token,
        "Content-Type":'application/json'
    })
    print("Accepted/Rejected for userId:", userId, " - ", r.status_code)


def makeRegistration(apiEndpoint: str, token: str, userId: str, emailId: str, firstName: str, lastName: str, country: str, requestReason: str, roleCollection: str) -> int:
    # convert into JSON:
    payload = json.dumps({
  "userId": userId,
  "firstName": firstName,
  "lastName": lastName,
  "emailId": emailId,
  "country": country,
  "rolesAccess": [
    {
      "requestReason": requestReason,
      "role": roleCollection
    }
  ]
})
    registrationUrl: str = apiEndpoint+"/api/1.0/registrations"
    r = requests.post(url=registrationUrl, data=payload, headers={
        "Authorization": "Bearer "+token,
        "Content-Type":'application/json'
    })
    print("Registration Status of emailId:", emailId, " - ", r.status_code)
    if r.status_code!=201:
        print(r.content)
    return r.status_code


def readCsvAndExecute(filePathWithName: str, configObj: json, accessToken: str,skipAccept:bool):
    count = 0
    with open(filePathWithName, 'r') as read_obj:
        # pass the file object to reader() to get the reader object
        csv_reader = reader(read_obj)
        # Iterate over each row in the csv using reader object
        for row in csv_reader:
            count = count+1
            # row variable is a list that represents a row in csv
            if count > 1:
                status: int = makeRegistration(
                    configObj["url"],
                    accessToken,
                    row[0],
                    row[1],
                    row[2],
                    row[3],
                    row[4],
                    "created by APIs",
                    row[5]
                )
                if status == 201 and skipAccept==False:
                    acceptRegistration(
                        configObj["url"],
                        accessToken,
                        row[0],
                        row[5]
                    )
                else:
                    print("Skipped accept/reject for userId:" +row[0])

skipAccept:bool=True
# Get config file location
configFilePath: str = open(os.path.dirname(
    os.path.abspath(__file__))+'/config.json', "r")
# Reading from config file
configObj: json = json.loads(configFilePath.read())
# Read user list csv
filePathWithName = os.path.dirname(os.path.abspath(__file__))+'/userList.csv'
# Get Access Token
accessToken = getAccessToken(
    configObj["tokenUrl"], configObj["clientId"], configObj["clientSecret"])
readCsvAndExecute(filePathWithName, configObj, accessToken,skipAccept)
