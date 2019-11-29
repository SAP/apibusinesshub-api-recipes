# Verify API Key

\| [Recipes by Topic](../api-recipes-by-usecase.md) \| [Recipes by Type](../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20verify-api-key ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20verify-api-key ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20verify-api-key ) \|


Samples showcasing the enforcement and verification of API key based access to the API Proxy. Sample contains examples to pass the API key either as header parameter or as query parameter.

## API Proxy samples

| Zip Name | Description        |
| ------------- |-------------|
| [VerifyAPIKeyQuery](./verifyapikeyquery)      | API Proxy Zip Bundle where in the API Key is passed in the query param  |
| [VerifyAPIKeyHeader](./verifyapikeyheader)      | API Proxy Zip Bundle where in the API Key is passed in the header param  |

## About the Verify API Key Policy
The [Verify API Key](https://help.hana.ondemand.com/apim_od/frameset.htm?4d15a0427494452dbb42a319e9bb420f.html) policy enforces the verification of API keys at runtime, which ensures the access of the API by Application with valid API Key.
This policy ensures that API keys are valid, have not been revoked, and are approved to consume the specific APIs associated with API products.

The APP key can be passed by the application developer either in the header, query parameters. The policy consists of the following elements:-

| Property Name        | Description           |Examples  |
| ------------- |:-------------:| -----:|
| APIKey      | This specifies the reference of the variable containing the api key. This can be set using the attribute ref  | The possible ways to set it are as follows:- 1. API Key in Query Parameter named apikey &lt;APIKey ref="request.queryparam.apikey"/&gt; 2. API Key in header Parameter named apikey &lt;APIKey ref="request.header.apikey"/&gt;|
