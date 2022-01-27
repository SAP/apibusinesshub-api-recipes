
# Configure OAuth 2.0 SAML Bearer Assertion Flow in SAP APIM using Policy Template

## About
To access a resource protected by OAuth 2.0, an OAuth 2.0 client must authenticate using an access token. The grant type SAML 2.0 bearer assertion is used to get an initial access token from an OAuth 2.0 authorisation server. </br>
To achieve this, a SAML assertion is POSTed to an OAuth token endpoint, which on processing the SAML assertion issues an access token.

##  Use Cases
- Within an mTLS setup between client application and SAP APIM , there is need to propagate the User principal (captured from the certificate) to backend services protected by OAuth 2.0 based authentication.
- Propagate User Principal from external IDPs to backend services protected by OAuth 2.0 based authentication

##  1. Generate Certificate for Signing SAML Assertion

_Note: - This is an optional step, in case you already a X509 certificate with private key which can be used for SAML assertion signing, then this step can be skipped. For the certificate generation, in the blog we have used [Open SSL](https://github.com/openssl/openssl)._

-   Create a new folder in your file system to place the x509 certificate.
-   In the cmd prompt navigate to the certificate folder and then use the openssl commands to generate the certificates
```sql
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 730
```
-   Enter the password when prompted say abcd. This password should be used in section **5. Upload JAR to SAP APIM**

##  2. Build IDP Metadata
- Goto [SAML Tool](https://www.samltool.com/idp_metadata.php)
- Fill the following fields with the respective contents
	-  *SP X.509 cert (same cert for sign/encrypt)* field : **cert.pem**(generated from previous step) contents minus the header -----BEGIN CERTIFICATE----- and -----END CERTIFICATE----- . Use the Root Certificate in case there are chain of certificates. 
	-  *EntityId* : MyDelegateIdp
- Click on *BUILD IDP METADATA*
- Copy the IDP Metadata, will require in the next step

##  3. Create Delegated IDP within sub-account
- Navigate to the subaccount where SAP APIM is hosted.
- Navigate to Trust Configuration -> New Trust Configuration
- Fill the following fields with the respective contents
	- *Metadata* : Upload the IDP metadata generated from the previous step
	- *Name* : saml.idp.delegate (provide your name)
	- *Origin Key* : saml.idp.delegate (provide your name)
	- *Create Shadow Users During Logon*: Uncheck
	- *Available for User Logon*: Uncheck
- Parse and Save

##  4. Generate KeyStore artifact for SAP APIM

-   In the folder in which certificate is generated create folder named  **META-INF**
-   Create a file named descriptor.properties with the following content
```sql
certFile=cert.pem
keyFile=key.pem
```
-   In the cmd prompt enter the following command to generate the jar file with the certificate
```sql
jar -cf idpKeystore.jar cert.pem key.pem
```
-   Add in the descriptors file to the generated jar using the command
```sql
jar -uf idpKeystore.jar META-INF/descriptor.properties
```

##  5. Create KeyStore in SAP APIM
- Navigate to SAP APIM -> API Portal application
- Navigate to Configure -> Certificates -> Create
- File the following fields with the respective contents
	- *Select Certificate Type* : Key Store
	- *StoreName*: MySAMLStoreName (provide your name)
	- *Name*: MySAMLKeyName (provide your name)
	- *Upload*: Upload the jar from the previous step
	- *Password*: Provide the password used to generate the key in **Step 1: Generate Certificate for Signing SAML Assertion**
- Click on *Create* and the Key Store is created

##  6. Create On Premise Proxy Service Instance
- Navigate to sub-account where SAP APIM is hosted
- Navigate to *Instances and Subscriptions*-> Create
- File the following fields with the respective contents
	- *Service*: API Management, API portal
	- *Plan*: on-premise-connectivity (in case the plan is unavailable , check with your entitlements)
	- *Instance Name*: MyOpProxy (provide your name)
-  Generate the Key for the Instance . The value of keys 'clientid' and 'clientsecret' are required in the following steps

##  7. Import Policy Template in API Proxy
- Within API Portal , navigate to Discover
- Search SAP API Management Security Best Practises
- Copy the *SAPCloudFoundrySAML2OAuthFlow* Template within the package
- The template is copied within API Portal -> Develop-> Policy Templates
- Navigate to the API Proxy ->Policies-> Edit -> Policy Template and click *Apply*
- Select *SAPCloudFoundrySAML2OAuthFlow* -> Apply
- The Policy Template is be applied to the Proxy flow

##  8. Configure  Policy Template
Within the API Proxy -> scripts -> samlHelper.js , the configuration requires updation. 

```json
{
    "issuer":"saml.idp.delegate",
    "audience":"",
    "recipient":"",
    "username":"user@example.com",
    "storeName":"MySAMLStoreName",
    "keyName":"MySAMLKeyName",
    "clientId":"",
    "clientSecret":"",
    "tokenGenerationEndpoint":""
}
```

**Issuer**
``` 
Value of 'Origin Key' in Trust Configuration setup from Step 3
```
**Audience**
``` 
- Navigate to sub-account where APIM is hosted
- Navigate to Trust Configuration -> SAML Metadata
- Within the Metadata search for 'entityID'
- Provide the value of 'entityID'
``` 
**Recipient**
``` 
- Navigate to sub-account where APIM is hosted
- Navigate to Trust Configuration -> SAML Metadata
- Within the Metadata search for 'AssertionConsumerService'
- Provide the value of 'AssertionConsumerService' which contains 'oauth/token/alias'
``` 
**Username**
``` 
The user email-id which needs to be authenticated. 
Note:The user needs to be onboarded within the Delegated IDP created in Step 3

In case the user email-id needs to be extracted from certificate or from other sources, enable the below configuration
configObj["username"]=context.getVariable("your_variable_for_user")

``` 
**StoreName**
``` 
 Value of 'Store Name' in Certificate->Key Store created in Step:5
``` 
**KeyName**
``` 
Value of 'Name' in Certificate->Key Store created in Step:5
``` 
**ClientId**
``` 
Value of 'clientid' from the Service Key created in the on-Premise Proxy Service Instance in Step:6
``` 
**ClientSecret**
``` 
Value of 'clientsecret' from the Service Key created in the on-Premise Proxy Service Instance in Step:6
``` 
**TokenGenerationEndpoint**
``` 
Same as the value of 'Recipient' minus the 'https://' or 'http://'
``` 
##  9. Deploy
Deploy the API Proxy and execute the API Proxy to realise the desired flow
