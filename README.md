#Welcome to the SAP HANA Cloud Platform, API management Samples GitHub Repository

[**SAP HANA Cloud Platform, API management**](https://hcp.sap.com/capabilities/integration/api-management.html) provides enterprises a comprehensive solution to address all API needs, with features such as API provisioning and publishing, API discovery and consumption, security and access control, analytics and reporting, monitoring and operations and developer portal.  

This **SAP HANA Cloud Platform, API management repository** provides samples of API proxies and applications, showcasing the capabilities of *SAP HANA Cloud Platform, API management repository* to deliver APIs protected by state-of-the-art authentication mechanisms and security policies (API Keys, basic authentication, SAML tokens, SQL threat protection) to effectively secure access to your data and services and protecting them for consumption in the cloud using quotas, spike arrests and URL rewriting.

An *API Proxy* is a representation of a HTTP-based service that abstracts the actual proxy endpoint properties on one end and the actual target endpoint (the endpoint that is relevant for the end user to invoke) on the other end. Additionally it includes properties that describe the policies that can be invoked on the API. *Policies* define a set of rules (such as enforcing security and controlling traffic) that is applied on the API. More information on supported policies is available at [help.sap.com](https://help.hana.ondemand.com/apim_od/frameset.htm?7e4f3e590f164996994cddc8e48bf7f5.html)

##Before Starting

Sign up [here](https://hcp.sap.com/try.html) for a free trial of *SAP HANA Cloud Platform*.

Sign up [here](http://scn.sap.com/community/api-management/blog/2016/02/02/free-trial-of-sap-api-management-on-hana-cloud-platform-is-available-now) for a free trial of *SAP HANA Cloud Platform, API management*.

Refer to the [SCN blog] (http://scn.sap.com/docs/DOC-71207) for an Overview of *SAP HANA Cloud Platform, API management*.

Refer to the [SCN blog](http://scn.sap.com/community/api-management/blog/2016/02/10/how-to-use-sap-api-management-on-hcp-trial) for *Getting Started on SAP HANA Cloud Platform, API management*.

Refer to the [link](https://help.hana.ondemand.com/apim_od/frameset.htm?9342a932441e45cd9636eb0a01a89958.html) information on how to import API Proxies listed in this repository into your API Management tenant.

##Available Samples List

| Scenarios | Description |
| --- | --- |
| [Basic authentication to target endpoint](./authentication/basicauthentication) | Sample showcasing the generation of basic authentication header values for authentication with target endpoint. Edit the *setcredential* policy to provide the credentials to be used to connect to the target endpoint |
| [SAML 2.0 browser profile based authentication to target endpoint](./authentication/saml) | Sample showcasing the handling of SAML 2.0 browser profile based authentication to the target endpoing using JavaScript policy |
| [Basic authentication for user credentials, SAML 2.0 Browser Profile Authentication for Target Endpoint](./authentication/basictosamlauth) | Sample showcasing the enablement of an API proxy with basic authentication. The user name and password is passed in the HTTP header. Authorization is then used to trigger the SAML 2.0 browser profile flow to the target endpoint. |
| [Cross-Origin Resource Sharing (CORS)](./cors) | Sample showcasing the handling of a response with a CORS header. This is helpful in scenarios where the targer server doesn't support sending CORS headers. |
| [Quota](./quota) | Sample showcasing the control the flow of traffic from the client to the target servers using *Quota* polices. It contains samples to limit the no of calls allowed per developer and also showcases quota violation handling using a HTTP 429 status as per the [RFC](https://tools.ietf.org/html/rfc6585#page-3) |
| [Spike Arrest](./spikearrest) | Sample showcasing the throttling of the number of incoming request processed by the API proxy. |
| [SQL Threat Protection](./sqlthreatprotection) | Sample showcasing the detection of SQL threats in a query parameters and error handling via HTTP 403 Forbidden response. |
| [Url Masking](./urlmask) | Sample showcasing the masking/rewriting of the target system host, basepath and replacing it with the proxy endpoint host and base path. |
| [Verify API Key](./verifyapikey) | Sample showcasing the enforcement and verification of API key based access to the API Proxy. Sample contains examples to pass the API key either as header parameter or as query parameter. |


##License
These samples are provided as a starting point for your implementation and are provided without any warranty or support obligations.

Copyright 2016 SAP SE

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


