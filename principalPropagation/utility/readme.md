# About

This utility helps in easier generation of the *Trust XML* and *Destination* which is required to enable Principal Propagation within SAP API Management on Integration Suite

**origin** sub-account - The user token generation happens within this sub-account<br>
**target** sub-account - SAP API Management is hosted on this sub-account

# Prerequisite 
Install Python >=3.7 from [here](https://www.python.org/downloads/ "here")
Install [Requests](https://pypi.org/project/requests/ "Requests") library for Python
Access to the SAP BTP CF sub-account. 

# Generate Trust XML
-  Navigate to the *utility* folder
- We will use *generateTrustXml.py* for Trust XML generation
- Use the following code to generate the XML

```bash
/usr/bin/python3 <location>/generateTrustXml.py --originTrustLoc <path> --originIdpMetaLoc <path> --originAuthUri <value> --originSubaccountId <value>
```

**--originTrustLoc** : 
Relative location of the file downloaded from 

    Origin sub-account->Destinations->Download Trust button

**--originIdpMetaLoc**:
Relative location of the file downloaded from

	Origin sub-account-> Trust Configuration->SAML Metadata button

**--originAuthUri**:

	Origin sub-account-> Instances and Subscriptions->Create button
	Service: Authorization and Trust Management Service
	Plan: Application
	Provide Instance Name and Create
	Create a Service Key for the Instance
	Within the Credentials use the value of the *url* key . Note the url must the pattern https://*.authentication.*.com

**--originSubaccountId**:

	Origin sub-account->Overview->Subaccount id

- The output trust file is generated in

> ./out/upload_me_in_target_subaccount.xml

- The output file is to uploaded in the

> target sub-account->Trust Configuration-> New Trust Configuration-> Upload buttontarget sub-account->Trust Configuration-> New Trust Configuration-> Upload button
