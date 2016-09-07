#verifyapikey

The [Verify API Key](https://help.hana.ondemand.com/apim_od/frameset.htm?4d15a0427494452dbb42a319e9bb420f.html) policy enforces the verification of API keys at runtime, which ensures the access of the API by Application with valid API Key. 
This policy ensures that API keys are valid, have not been revoked, and are approved to consume the specific APIs associated with API products.

The APP key can be passed by the application developer either in the header, query parameters. The policy consists of the following elements:-

| Property Name        | Description           |Examples  |
| ------------- |:-------------:| -----:|
| APIKey      | This specifies the reference of the variable containing the api key. This can be set using the attribute ref  | The possible ways to set it are as follows:- 1. API Key in Query Parameter named apikey &lt;APIKey ref="request.queryparam.apikey"/&gt; 2. API Key in header Parameter named apikey &lt;APIKey ref="request.header.apikey"/&gt;|

## API Proxy Examples

| Zip Name | Description        |
| ------------- |:-------------:| 
| [VerifyAPIKeyQuery](./VerifyAPIKeyQuery/APIProxy)      | API Proxy Zip Bundle where in the API Key is passed in the query param  |
| [VerifyAPIKeyHeader](./VerifyAPIKeyHeader/APIProxy)      | API Proxy Zip Bundle where in the API Key is passed in the header param  |

##Pre-requisite

1. User in [SAP Gateway](http://scn.sap.com/docs/DOC-40986) system
2. Create application so that the APP key can be passed while accessing the API Proxy
