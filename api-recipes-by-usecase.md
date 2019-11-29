# API Recipes by Topic
\| Browsing by Topic \|  [Browse by Type](./api-recipes-by-type.md) \|[Request a Recipe](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Request&template=recipe-request.md&title=How+to++) \| [Report a broken link](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=documentation&template=bug_report.md&title=Broken%20Link) \|

* [Authentication](#Authentication)
* [Caching](#caching)
* [Consume APIs  of an Applications or Platform](#Connectivity)
* [Cross Origin Resource Sharing](#cors)
* [Debugging and Tracing](#debugging-and-tracing)
* [Security](#security)
* [Traffic Management](#traffic-management)
---
## Authentication

| Topic| Description | Type |
| --- | --- | --- |
| [Basic authentication to target endpoint](./authentication/basicauthentication) | Sample showcasing the generation of basic authentication header values for authentication with target endpoint. Edit the *setcredential* policy to provide the credentials to be used to connect to the target endpoint |[API Proxy](./api-recipes-by-type.md#api-proxies) |
| [Basic authentication for user credentials, SAML 2.0 Browser Profile Authentication for Target Endpoint](./authentication/basictosamlauth) | Sample showcasing the enablement of an API proxy with basic authentication. The user name and password is passed in the HTTP header. Authorization is then used to trigger the SAML 2.0 browser profile flow to the target endpoint. | [API Proxy](./api-recipes-by-type.md#api-proxies) |
[Principal propagation via SAML](./recipes/for/principal-propagation-via-saml)|Assists you in SAML User propagation from the application to back-end system via SAP API Management| [Policy Template](./api-recipes-by-type.md#policy-templates) |
| [SAML 2.0 browser profile based authentication to target endpoint](./authentication/saml) | Sample showcasing the handling of SAML 2.0 browser profile based authentication to the target endpoing using JavaScript policy|[API Proxy](./api-recipes-by-type.md#api-proxies) |
| [Verify API Key](./verifyapikey) | Sample showcasing the enforcement and verification of API key based access to the API Proxy. Sample contains examples to pass the API key either as header parameter or as query parameter. __Variants__: Verify API Key Passed as Header  \| Verify API Key Passed as Query Psrameter \| |[API Proxy](./api-recipes-by-type.md#api-proxies) |
[Verify APIKey](./recipes/for/verify-api-key)|Assists you in protecting APIs by Verifying the API Key |[Policy Template](./api-recipes-by-type.md#policy-templates) |

---
## Caching

| Topic| Description | Type |
| --- | --- | --- |
[Metadata Cache for Odata APIs](./recipes/for/metadata-cache-for-odata-apis)|Helps to improve performance of Odata API Proxies by caching metadata across invocations|[Policy Template](./api-recipes-by-type.md#policy-templates) |

---
## Connectivity

| Topic| Description | Type |
| --- | --- | --- |
[Connect to SAP Cloud Foundry services](./recipes/for/connect-to-sap-cloud-foundry-services)|Helps to manage mircoservices running in cloud foundry using SAP Cloud Platform API Management|[Policy Template](./api-recipes-by-type.md#policy-templates) |
[Connect to SAP Cloud Platform services](./recipes/for/connect-to-sap-cloud-platform-services)|Helps in consuming APIs hosted on SAP Cloud Platform and protected by Cloud Platform OAuth|[Policy Template](./api-recipes-by-type.md#policy-templates) |
[Connect to SAP Concur](./recipes/for/connect-to-sap-concur)|Facilitates easy consumption of Concur APIs protected by OAuth|[Policy Template](./api-recipes-by-type.md#policy-templates) |
[Connect to SAP SuccessFactors](./recipes/for/connect-to-sap-successfactors)| Helps to consume SAP SuccessFactors APIs protected by OAuth|[Policy Template](./api-recipes-by-type.md#policy-templates) |

---
## CORS

| Topic| Description | Type |
| --- | --- | --- |
| [Cross-Origin Resource Sharing (CORS)](./cors) | Sample showcasing the handling of a response with a CORS header. This is helpful in scenarios where the targer server doesn't support sending CORS headers. |[API Proxy](./api-recipes-by-type.md#api-proxies) |
[CORS](./recipes/for/CORS)| Supports your API to be consumed by the application where CORS support is not available|[Policy Template](./api-recipes-by-type.md#policy-templates) |

---
## Debugging and Tracing

| Topic| Description | Type |
| --- | --- | --- |
[Debugging and traceability](./recipes/for/api-management-debugging-and-traceability)|Assists in API proxy execution performance assessment|[Policy Template](./api-recipes-by-type.md#policy-templates) |

---
## Security

| Topic| Description | Type |
| --- | --- | --- |
[JSON Threat Protection](./recipes/for/json-threat-protection)|Assists you in securing your APIs from JSON threats for APIs managed by API Management|[Policy Template](./api-recipes-by-type.md#policy-templates) |
| [SQL Threat Protection](./sqlthreatprotection) | Sample showcasing the detection of SQL threats in a query parameters and error handling via HTTP 403 Forbidden response. |[API Proxy](./api-recipes-by-type.md#api-proxies) |
[SQL Threat Protection](./recipes/for/sql-threat-protection)|Assists you in securing your APIs from SQL threat for APIs managed by API Management|[Policy Template](./api-recipes-by-type.md#policy-templates) |
| [Url Masking](./urlmask) | Sample showcasing the masking/rewriting of the target system host, basepath and replacing it with the proxy endpoint host and base path. |[API Proxy](./api-recipes-by-type.md#api-proxies) |
[URL Masking](./recipes/for/url-masking)|Assists in protecting backend system for APIs managed by API Management|[Policy Template](./api-recipes-by-type.md#policy-templates) |
[XML Threat Protection](./recipes/for/xml-threat-protection)|Protects APIs from XML threats for APIs managed by API Management|[Policy Template](./api-recipes-by-type.md#policy-templates) |

---
## Traffic Management

| Topic| Description | Type |
| --- | --- | --- |
| [Quota](./quota) | Sample showcasing the control the flow of traffic from the client to the target servers using *Quota* polices. It contains samples to limit the no of calls allowed per developer and also showcases quota violation handling using a HTTP 429 status as per the [RFC](https://tools.ietf.org/html/rfc6585#page-3).  __Variants__: SimpleQuota \| SimpleQuotaPerDeveloper \| QuotaWith429StatusCode \|   |[API Proxy](./api-recipes-by-type.md#api-proxies) |
[Quota With 429 Status Code](./recipes/for/quota-with-429-status-code)|Helps to set quota and 429 status message|[Policy Template](./api-recipes-by-type.md#policy-templates) |
| [Spike Arrest](./spikearrest) | Sample showcasing the throttling of the number of incoming request processed by the API proxy. |[API Proxy](./api-recipes-by-type.md#api-proxies) |
