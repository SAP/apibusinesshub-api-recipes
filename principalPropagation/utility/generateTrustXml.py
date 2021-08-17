from optparse import OptionParser
from os import error
import re
import os.path
import requests
import json

print("********************************")
print("********************************")

my_path:str = os.path.abspath(os.path.dirname(__file__))
outputFolder="./out"
outputFilePath:str=os.path.join(my_path, outputFolder)
if not os.path.exists(outputFilePath):
    os.makedirs(outputFilePath)

generatedXml:str=outputFolder+"/upload_me_in_target_subaccount.xml"

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


#########-----prepare--------#########
authStr:str=".authentication."
https:str="https://"
if (authStr not in jsonObj["trustTwoSubaccounts"]["originAuthUri"]) or (https not in jsonObj["trustTwoSubaccounts"]["originAuthUri"]):
    raise error("URI:"+jsonObj["trustTwoSubaccounts"]["originAuthUri"]+" has missing '.authentication.' or 'https://' therefore unable to extract subdomain and host")

subdomainWithHttps,landscapeHost=jsonObj["trustTwoSubaccounts"]["originAuthUri"].split(authStr)
print("*Host="+landscapeHost)

z,subdomain=subdomainWithHttps.split(https)
print("*Subdomain="+subdomain)


##########----Origin Certificate Operations starts-----#######
certificateFilePath:str=os.path.join(my_path, jsonObj["trustTwoSubaccounts"]["originTrustLoc"])
print("*Certificate is read from="+certificateFilePath)
oTrustContent:str=readFile(certificateFilePath)
#extract origin certificate
start:str="-----BEGIN CERTIFICATE-----"
end:str="-----END CERTIFICATE------"
oCertificate:str=oTrustContent[len(start):-len(end)]
print("*Extracting Certificate passed successfully")
##########----Origin Certificate Operations ends-----#######

##########---Origin SAML Metadata Operations start---------################

#download the metadata file
idpMetaContentPath:str=os.path.join(my_path, jsonObj["trustTwoSubaccounts"]["originIdpMetaLoc"])

print("*SAML IDP Metadata is read from="+idpMetaContentPath)
oIdpMetaContent:str=readFile(idpMetaContentPath)
#extract entityId
regx:str="entityID=\"(.*?)\""
extractedEntityId:str = re.search(regx, oIdpMetaContent).group(1)

if len(extractedEntityId)==0:
    raise error("failed to find entityID within the Metadata File")

print("*EntityID="+extractedEntityId)
##########---Origin SAML Metadata Operations ends---------################

###########---Generate New Trust XML starts---------############################
templateContent="""<ns3:EntityDescriptor
    ID="cfapps.${S1_LANDSCAPE_HOST}/${S1_SUBACCOUNT_ID}"
    entityID="cfapps.${S1_LANDSCAPE_HOST}/${S1_SUBACCOUNT_ID}"
    xmlns="http://www.w3.org/2000/09/xmldsig#"
    xmlns:ns2="http://www.w3.org/2001/04/xmlenc#"
    xmlns:ns4="urn:oasis:names:tc:SAML:2.0:assertion"
    xmlns:ns3="urn:oasis:names:tc:SAML:2.0:metadata">
    <ns3:SPSSODescriptor AuthnRequestsSigned="true"
        protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <ns3:KeyDescriptor use="signing">
            <KeyInfo>
                <KeyName>${S1_ENTITYID}</KeyName>
                <X509Data>
                    <X509Certificate>${S1_CERTIFICATE}</X509Certificate>
                </X509Data>
            </KeyInfo>
        </ns3:KeyDescriptor>
    </ns3:SPSSODescriptor>
    <ns3:IDPSSODescriptor
        WantAuthnRequestsSigned="true"
        protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <ns3:KeyDescriptor use="signing">
            <KeyInfo>
                <KeyName>${S1_ENTITYID}</KeyName>
                <X509Data>
                    <X509Certificate>${S1_CERTIFICATE}</X509Certificate>
                </X509Data>
            </KeyInfo>
        </ns3:KeyDescriptor>
    </ns3:IDPSSODescriptor>
</ns3:EntityDescriptor>
"""
#replace S1_ENTITYID
templateContent=templateContent.replace("${S1_ENTITYID}",extractedEntityId)

#replace S1_ENTITYID
templateContent=templateContent.replace("${S1_CERTIFICATE}",oCertificate)

#replace ${S1_SUBACCOUNT_ID}
templateContent=templateContent.replace("${S1_SUBACCOUNT_ID}",jsonObj["trustTwoSubaccounts"]["originSubaccountId"])

#replace ${S1_LANDSCAPE_HOST}
templateContent=templateContent.replace("${S1_LANDSCAPE_HOST}",landscapeHost)

#write to file
generatedPath:str=os.path.join(my_path, generatedXml)
f = open(generatedPath, "w")
f.write(templateContent)
f.close()
print("*Metadata file is generated in the 'out' folder, please upload the file in the target subaccount(where APIM is hosted)->Trust Configuration->New Trust Configuration->Upload ")
###########---Generate New Trust XML ends---------############################

print("################################")
print("################################")



