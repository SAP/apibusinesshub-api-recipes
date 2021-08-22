# About

This utility helps in easier generation of the *Trust XML* and *Destination* which is required to enable Principal Propagation within SAP API Management on Integration Suite

**origin** sub-account - The user token generation happens within this sub-account<br>
**target** sub-account - SAP API Management is hosted on this sub-account

# Contents

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#generate-trustxml">Generate TrustXML</a>
    </li>
	   <li>
      <a href="#generate-destination-for-oauth2samlbearerassertion">Generate Destination for OAuth2SAMLBearerAssertion</a>
    </li>
	   <li>
      <a href="#generate-destination-for-oauth2usertokenexchange">Generate Destination for OAuth2UserTokenExchange</a>
    </li>
  </ol>
</details>

# Prerequisite 
Install Python >=3.7 from [here](https://www.python.org/downloads/ "here")
Install [Requests](https://pypi.org/project/requests/ "Requests") library for Python
Access to the SAP BTP CF sub-account. 

# Generate TrustXML
-  Navigate to the *utility* folder
- We will use *generateTrustXml.py* for Trust XML generation
- Use the following code to generate the XML

```bash
/usr/bin/python3 <location>/generateTrustXml.py --config ./config.json                                    
```
Contents within config.json
```
{
  "trustTwoSubaccounts": {
    "originTrustLoc": "<location of Trust Certificate>",
    "originIdpMetaLoc": "<location of IDP metadata>",
    "originAuthUri": "<origin authrization uri>",
    "originSubaccountId": "<sub-account id>"
  }
}
```
**originTrustLoc** : 
Relative location of the file downloaded from 

    Origin sub-account->Destinations->Download Trust button

**originIdpMetaLoc**:
Relative location of the file downloaded from

	Origin sub-account-> Trust Configuration->SAML Metadata button

**originAuthUri**:

(in case you already have a Service Instance and Service Key Created of the XSUAA, you can reuse the existing key and skip the below steps except last)

	Origin sub-account-> Instances and Subscriptions->Create button
	Service: Authorization and Trust Management Service
	Plan: Application
	Provide Instance Name and Create
	Create a Service Key for the Instance
	Within the Credentials use the value of the *url* key . Note the url must comply the pattern https://*.authentication.*.com

**originSubaccountId**:

	Origin sub-account->Overview->Subaccount id

- The output trust file is generated in

> ./out/upload_me_in_target_subaccount.xml

- The output file is to uploaded in the

> target sub-account->Trust Configuration-> New Trust Configuration-> Upload button

# Generate Destination for OAuth2SAMLBearerAssertion
-  Navigate to the *utility* folder
- We will use *generateDestination_for_samlbearer.py* for Destination Generation
- Use the following code to generate the Destination

```bash
/usr/bin/python3 <path>/generateDestination_for_samlbearer.py --config ./config.json
```
The config.json takes the following json
```
{
  "samlbearerDestination": {
    "targetIdpMetaLoc": "<location of the IDP metadata>",
    "opProxyClientId": "<op proxy client id>",
    "opProxyClientSecret": "<op proxy client secret>"
  }
}
```
**targetIdpMetaLoc** : 
Relative location of the file downloaded from

	Target sub-account->Trust Configuration->SAML Metadata button

**opProxyClientId**:

(in case you already have a Service Instance and Service Key Created of the on-premise connectivity, you can reuse the existing key and skip the below steps except last)

	Target sub-account-> Instances and Subscriptions->Create button
	Service: API Management, API portal
	Plan: on-premise-connectivity
	Provide Instance Name and Create
	Create a Service Key for the Instance
	Within the Credentials use the value of the 'clientId' key
	
**opProxyClientSecret**:

	Within the Credentials in the above step use the value of the 'clientsecret' key


- The output trust file is generated in

> ./out/upload_this_destination_in_origin_account.xml

- The output file is to uploaded in the

> Origin sub-account->Destinations-> Import button. Import the Destination , name the Destination and save

# Generate Destination for OAuth2UserTokenExchange
-  Navigate to the *utility* folder
- We will use *generateDestination_for_usertoken.py* for Destination Generation
- Use the following code to generate the Destination

```bash
/usr/bin/python3 <path>/generateDestination_for_usertoken.py --config ./config.json
```
The config.json takes the following json
```
{
  "userTokenExchangeDestination": {
    "tokenServiceUrl": "<tokenServiceUrl>",
    "opProxyClientId": "<op proxy client id>",
    "opProxyClientSecret": "<op proxy client secret>"
  }
}
```
**tokenServiceUrl** : 
(in case you already have a Service Instance and Service Key Created of the on-premise connectivity, you can reuse the existing key and skip the below steps except last)

	Target sub-account-> Instances and Subscriptions->Create button
	Service: API Management, API portal
	Plan: on-premise-connectivity
	Provide Instance Name and Create
	Create a Service Key for the Instance
	Within the key use the value of the 'tokenUrl' key

**opProxyClientId**:
	
	Within the Credentials use the value of the 'clientId' key
	
**opProxyClientSecret**:

	Within the Credentials in the above step use the value of the 'clientSecret' key


- The output trust file is generated in

> ./out/upload_this_destination_in_target_account.xml

- The output file is to uploaded in the

> Target sub-account->Destinations-> Import button. Import the Destination , name the Destination and save.
