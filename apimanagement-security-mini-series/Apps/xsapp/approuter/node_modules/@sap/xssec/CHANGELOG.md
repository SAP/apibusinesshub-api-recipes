# Change Log
All notable changes to this project will be documented in this file.


## 3.0.3 - 2020-05-25

- Fix jwt-bearer flow to take the right token as uri parameter.

## 3.0.2 - 2020-05-20

- Fix get verification key from keycache.

## 3.0.1 - 2020-05-19

- HotFix missing debugTrace in verification key
- Fix RetryStrategy

## 3.0.0 - 2020-05-15

- Replace grant type user_token in method requestToken (TYPE_USER_TOKEN) in favor of urn:ietf:params:oauth:grant-type:jwt-bearer
- Remove obsolete method getToken (use getHdbToken or getAppToken))
- Remove obsolete method requestTokenForClient (use requestToken)
- Remove obsolete method getIdentityZone (getSubaccountId) 
- Support for audience validation in token
- remove of SAP_JWT_TRUST_ACL environment variable support (functionality now comes with audience validation)
- remove depencency to node-jwt (ALPINE support)
- restructure internal code for better maintainability

## 2.2.5 - 2020-02-28

- Update to node-jwt version 1.6.6

## 2.2.4 - 2019-08-14

- Support for API methods getUserName and getUniquePrincipalName
 
## 2.2.3 - 2019-08-07

- Add retry for recieving keys

## 2.2.2 - 2019-06-24

- Use verification key from binding as backup if online key retrieval fails

## 2.2.1 - 2019-06-17

- Fix uaaDomain comparison in key cache

## 2.2.0 - 2019-06-17

- Align key cache implementation with other container security libraries

## 2.1.17 - 2019-05-17

- Introduce http timeout of two seconds
- Update version of module debug, lru-cache and @sap/xsenv
- Fix token verification for broker master instance subscriptions

## 2.1.16 - 2019-01-28

- Fix token parser: switch ASCII to Utf8 decode

## 2.1.15 - 2018-08-13

- Update version of module request

## 2.1.14 - 2018-07-24

- Evaluate SAP_JWT_TRUST_ACL if trustedclientidsuffix is present but not matching

## 2.1.13 - 2018-07-18

- Update version of module request

## 2.1.12 - 2018-06-01

- Support for API methods getSubaccountId and getOrigin
- Mark API method getIdentityZone as deprecated

## 2.1.11 - 2018-05-18

- Update version of module request

## 2.1.10 - 2018-04-20

- Fixes for keycache

## 2.1.9 - 2018-04-18

- Update version of module @sap/node-jwt (1.4.8)
- Fixes for keycache
- Update version of module request

## 2.1.8 - 2018-03-14

- Support for API method getAppToken

## 2.1.7 - 2018-03-05

- Support for API method requestToken

## 2.1.6 - 2018-02-19

- Update version of module @sap/node-jwt

## 2.1.5 - 2018-02-07

- Update version of module request

## 2.1.4 - 2017-12-04

- Support new JWT structure (attribute location ext_cxt)
- First implementation for keycache

## 2.1.3 - 2017-11-29

- Support for API method getClientId

## 2.1.2 - 2017-10-23

- Support for API method getSubdomain

## 2.1.1 - 2017-10-09

- Update version of modules @sap/node-jwt, @sap/xsenv and debug

## 2.1.0 - 2017-07-06

- Support of API method requestTokenForClient
- Update version of module @sap/node-jwt

## 2.0.0 - 2017-06-26

- Removal of deprecated constructor method createSecurityContextCc
- Removal of API method method getUserInfo

## 1.3.0 - 2017-06-23

- Revert removal of API method method getUserInfo

## 1.2.0 - 2017-06-22

- Support for API methods getLogonName, getGivenName, getFamilyName, getEmail
- Removal of API method method getUserInfo
- Fix identity zone validation (only relevant for tenants created with SAP Cloud Cockpit)

## 1.1.1 - 2017-05-30
- Update version of dependent modules

## 1.1.0 - 2017-05-22
- Mark API method createSecurityContextCC as deprecated

## 1.0.4 - 2017-05-17

- Support for validation of XSUAA broker plan tokens
- Support for API methods getCloneServiceInstanceId and getAdditionalAuthAttribute
- Support for validation of XSUAA application plan tokens in arbitrary identity zones

## 1.0.3 - 2017-03-29

- Update version of dependent modules

## 1.0.2 - 2017-02-22

- Support for validation of SAML Bearer tokens

## 1.0.1 - 2017-02-02

- Support for client credentials tokens in JWT strategy

## 1.0.0 - 2017-01-25

- Introduction of scopeing, module name changed to @sap/xssec
