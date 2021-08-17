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

generatedDestination:str=outputFolder+"/upload_this_destination_in_origin_account"

parser = OptionParser()
parser.add_option('--configFile', type=str,dest="configFile",help='ConfigFile containing the configs')

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

#########-----read destination IDP Metadata--------#########

#parse the XML content
tMetaFilePath:str=os.path.join(my_path, jsonObj["samlbearerDestination"]["targetIdpMetaLoc"])
print("*Target IDP Meta is read from="+tMetaFilePath)
root=ET.parse(tMetaFilePath).getroot()

entityID:str=None

if 'entityID' not in root.attrib:
    raise error("entityID is not found in the IDP Metadata..aborting")

entityID=root.attrib['entityID']
print("*EntityId="+entityID)

entityLocation:str=None
for child in root:
    if "SPSSODescriptor" in child.tag:
        for eachDescriptor in child:
            if "Binding" in eachDescriptor.attrib:
                if "URI" in eachDescriptor.attrib["Binding"]:
                    entityLocation=eachDescriptor.attrib["Location"]

if entityLocation==None:
    raise error("Entity Location not found in the IDP Metadata..aborting")

print("*EntityLocation="+entityLocation)

######----Create template--------########
templateDestination="""#clientKey=<< Existing password/certificate removed on export >>
#tokenServicePassword=<< Existing password/certificate removed on export >>
#
Type=HTTP
TrustAll=true
authnContextClassRef=urn\:oasis\:names\:tc\:SAML\:2.0\:ac\:classes\:PreviousSession
audience=<audience>
Authentication=OAuth2SAMLBearerAssertion
Name=
tokenServiceURL=<token_service_url>
ProxyType=Internet
URL=https://dummyURL.com
nameIdFormat=urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress
tokenServiceURLType=Dedicated
tokenServiceUser=<token_service_user>
clientKey=<client_key>
tokenServicePassword=<token_service_password>
"""

templateDestination=templateDestination.replace("<audience>",entityID)
templateDestination=templateDestination.replace("<token_service_url>",entityLocation)
templateDestination=templateDestination.replace("<token_service_user>",jsonObj["samlbearerDestination"]["opProxyClientId"])
templateDestination=templateDestination.replace("<client_key>",jsonObj["samlbearerDestination"]["opProxyClientId"])
templateDestination=templateDestination.replace("<token_service_password>",jsonObj["samlbearerDestination"]["opProxyClientSecret"])

#write to file
generatedPath:str=os.path.join(my_path, generatedDestination)
f = open(generatedPath, "w")
f.write(templateDestination)
f.close()
print("*Destination file is generated in the 'out' folder, please upload the file in the origin subaccount(where token generation happens)->Destinations->Import Destination")
print("################################")
print("################################")








