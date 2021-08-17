from optparse import OptionParser
from os import error
import os.path
import xml.etree.ElementTree as ET
import json

print("********************************")
print("********************************")

my_path:str = os.path.abspath(os.path.dirname(__file__))

outputFolder="./out"
outputFilePath:str=os.path.join(my_path, outputFolder)
if not os.path.exists(outputFilePath):
    os.makedirs(outputFilePath)

generatedDestination:str=outputFolder+"/upload_this_destination_in_target_account"

parser = OptionParser()
parser.add_option('--configFile', type=str,dest="configFile",help='ConfigFile containing the configs ')

options, args = parser.parse_args()

required="configFile".split()

for r in required:
    if options.__dict__[r] is None:
        parser.error("parameter %s required"%r)


def readFile(fileName:str)->str:
    f = open(fileName, "r")
    return f.read()


with open(os.path.join(my_path, options.configFile)) as f:
  jsonObj = json.load(f)

## TODO::validate json contents


######----Create template--------########
templateDestination="""#clientSecret=<< Existing password/certificate removed on export >>
#
#Tue Aug 17 15:18:32 UTC 2021
Type=HTTP
clientId=<client_key>
clientSecret=<client_secret>
Authentication=OAuth2UserTokenExchange
tokenServiceURL=<token_service_url>
ProxyType=Internet
URL=https\://dummyhost.com
tokenServiceURLType=Dedicated
"""

templateDestination=templateDestination.replace("<client_key>",jsonObj["userTokenExchangeDestination"]["opProxyClientId"])
templateDestination=templateDestination.replace("<client_secret>",jsonObj["userTokenExchangeDestination"]["opProxyClientSecret"])
templateDestination=templateDestination.replace("<token_service_url>",jsonObj["userTokenExchangeDestination"]["tokenServiceUrl"])

#write to file
generatedPath:str=os.path.join(my_path, generatedDestination)
f = open(generatedPath, "w")
f.write(templateDestination)
f.close()
print("*Destination file is generated in the 'out' folder, please upload the file in the target subaccount(where APIM is hosted)->Destinations->Import Destination")
print("################################")
print("################################")








