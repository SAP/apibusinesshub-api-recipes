# API Management Security series
## A deep dive exercise to setup Principal Propagation / SSO flows in API Management
This GitHub project has the API Proxies, Configurations, Destinations, Java Microservices and AppRouter projects in order to run the OnPremise connectivity examples.

 __Resources used in the video series__

## Part 1 - Introduction to Security flows and Principal propagation

Existing API Management SSO Blogs:
* [Part 1](https://blogs.sap.com/2018/01/19/part-1-single-sign-on-from-fiori-application-to-sap-gateway-via-sap-cloud-platform-api-management/) : Single sign on from Fiori Application to SAP Gateway via SAP Cloud Platform API Management
* [Part 2](https://blogs.sap.com/2018/01/19/part-2-single-sign-on-from-fiori-application-to-sap-gateway-via-sap-cloud-platform-api-management/) : Single sign on from Fiori Application to SAP Gateway via SAP Cloud Platform API Management

Cloud Connector setup guides:
* [Principal Propagation](https://blogs.sap.com/2017/06/22/how-to-guide-principal-propagation-in-an-https-scenario/) focussing on Cloud Connector seup
---
## Part 2 - CF setting up OnPremise connectivity plan

Product documentation resources to enable the on-premise-connectivity Plan:
* [Initial setup](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/65c51104497e4ad1ac12d273e8cee2d2.html) to get API Management activated in SAP Cloud Foundry accounts.
* Activating the on-Premise Connectivity [plan](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/2fc7a5b57541459abedfc26eb63f7590.html).
* Creating an [API Provider](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/6b263e2c1b2d4d9ba20bcd7872eedd9e.html).

---

## Part 3a - CF Simple Passthrough with OnPremise connectivity plan

Resources to build and deploy microservices in Cloud Foundry:
* Building a Java [microservice](https://developers.sap.com/tutorials/s4sdk-odata-service-cloud-foundry.html) with SAP Cloud SDK to connect to an OData source.
* [Securing](https://developers.sap.com/tutorials/s4sdk-secure-cloudfoundry.html) a Java microservice with authentication and authorization.

---

## Part 3c - CF OAuthUserTokenExchange with OnPremise connectivity plan

Resources to setup User Token exchange mechanism in SAP Cloud Foundry:
*  [Exchanging](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html) User JWTs via OAuth2UserTokenExchange Destinations.
* [APIs](https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource) to interact with Destination Services in SAP Cloud Foundry from the API Business Hub.

---

## Part 3d - CF OAuth2SAMLBearer with OnPremise connectivity plan

Resources to setup OAuth2SAMLBearerAssertion mechanism in SAP Cloud Foundry:
* [Setting](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/8ebf60c82a8e4cfc904f441c0c0acd6b.html) up Trust between Accounts and Destination settings for OAuth2SAMLBearer Assertion mechanism.
* Destination [attributes](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/c69ea6aacd714ad2ae8ceb5fc3ceea56.html) needed for OAuth2SAMLBearerAssertion.

---
## Part 4 - Neo OAuth2SAMLBearer flow OnPremise connectivity

Resources to setup OAuth2SAMLBearerAssertion mechanism in Neo environments:

* Understanding OAuth SAML Bearer assertion [flows](https://help.sap.com/viewer/368c481cd6954bdfa5d0435479fd4eaf/Cloud/en-US/f93122629816412c911f827a5eb62e5e.html) in Neo.

Deploying a Fiori App in Neo to demonstrate SSO flows:
* Using WebIDE to build a simple Fiori [App](https://developers.sap.com/tutorials/odata-03-webide-odata-features.html) in Neo.

---

## Part 5 - Neo orchestrating a SAML Assertion flow with OnPremise connectivity.

Resources to setup a SAML based flow to establish single single sign on:
* [Policy Template](https://api.sap.com/policytemplate/Principal_Propagation_via_SAML) in API Business Hub for SAML Verification and Generation flows.

---

## Part 6 - CF SAML Assertion Flow with OnPremise connectivity plan.

Resoures to setup a SAML flow from API Management tenant running in CF by directly authenticating to XSUAA:
* [Blog](https://blogs.sap.com/2019/09/02/blog-series-json-web-tokens-jwt-verification-policies-in-sap-cloud-platform-api-management/) series to learn more about conducting a JWT based verification scheme in API Management.
* [Policy template](https://api.sap.com/policytemplate/SAPCloudFoundrySAML2OAuthFlow) from API Business Hub to orchestrate the SAML2Grant exchange for OAuth token

---

## Part 7 - CF Client Credentials flow for principal propagation with OnPremise connectivity plan.

Resoures to setup a Client Credentials flow from API Management tenant running in CF by directly authenticating to XSUAA:

*  [Policy template](https://api.sap.com/policytemplate/SAPCloudFoundryXSUAAJWTToken) from API Business Hub to orchestrate the Client credentials flow for OAuth token