# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 8.0.0 - 2020-05-26

### Updated dependencies
 - deps: @sap/xssec@3.0.3

### Removed
- Remove of SAP_JWT_TRUST_ACL environment variable support (functionality now comes with audience validation)

## 7.1.3 - 2020-05-17

### Added
- Enhances of the x-approuter-authorization token security check in the service2Approuter flow.

## 7.1.2 - 2020-05-08

### Fixed
- Fix appurl usage of x-subscriber-tenant

## 7.1.1 - 2020-05-05

### Added
- Cache improvements
- Usage of x-subscriber-tenant header when provided.
- handle html5 repo and xsuaa destinations separately

### Fixed
- Fix connectivity token handling for Kubernetes

## 7.1.0 - 2020-04-16

### Added
- Enable service logout configuration in central xs-app.json.
### Fixed
- Destination token cached in session is never refreshed.

## 7.0.0 - 2020-04-06

### Added
- Support node version 10 and node version 12 instead of node version 8 and node version 10

## 6.8.2 - 2020-03-04

### Fixed
- Fix extension of resolveUaaConfig

## 6.8.1 - 2020-02-20

### Fixed
- Fix default route

## 6.8.0 - 2020-02-10

### Added
- Enable external session manager extensibility when using HTML5 Repository

## 6.7.2 - 2020-01-30

### Added
- Support SameSite cookie attribute

### Updated dependencies
 - deps: express-session@1.17.0
 - deps: @sap/logging@5.2.0

## 6.7.1 - 2019-12-24

### Added
- Backend cookies secret variable (BACKEND_COOKIES_SECRET) Secret that is used to encrypt backend session cookies in service to Application Router flow. Should be set in case multiple instances of Application Router are used. By default a random sequence of characters is used.


## 6.7.0 - 2019-11-24

### Added
- Enhance the use of the xsenv@2.1.0 library to access bound destination service credentials, which support reading destination service credentials in Kubernetes.

### Fixed
- Anonymous login on destination flow

## 6.6.0 - 2019-11-12

### Announcement
- The Preserve URL fragment (PRESERVE_FRAGMENT) is being deprecated and will be removed in the near future

### Updated dependencies
- deps: sap/xsenv@2.1.0 Application Router uses xsenv library to access bound services credentials. We have upgraded the library to xsenv version 2.1.0 which supports reading credentials in Kubernetes.
- deps: https-proxy-agent@2.2.4
## 6.5.1 - 2019-10-10

### Fixed
- Adding sec-websocket-protocol header as the protocol of websockets

## 6.5.0 - 2019-10-03

### Added
- Timeout for Business Service

### Fixed
- Adding destination token middleware for websockets

## 6.4.1 - 2019-09-23

### Fixed
- CSP header fix return frame-ancestors in login

## 6.4.0 - 2019-09-16

### Added
- Allowed dynamic destinations 
- Return CSP header with no cache
- Added setXForwardedHeaders option

## 6.3.0 - 2019-09-10

### Added
- Support Cache-Control for static content from html5-repo

## 6.2.0 - 2019-09-03

### Added
- Support Subscription url from vcap.
- Adding validation - Session created for one tenant must not be used by other tenants

### Updated dependencies
 - deps: @sap/xssec@2.2.2

## 6.1.2 - 2019-08-28
- Support Xsuaa credentials in request body

## 6.1.1 - 2019-08-27
- Fix in destination middleware - session.update
 
## 6.1.0 - 2019-07-31

### Added
- Support for redirection to logout page with query parameters after central logout
- Connectivity is now returned in subscription getDependencies callback

### Fixed
- Error when processing unknown authentication types

## 6.0.2 - 2019-07-14

### Fixed
- Validation of destination with OnPremise proxyType
- CSRF protection in Service to Approuter flow
### Updated dependencies
- deps: lodash@4.17.13

## 6.0.1 - 2019-05-30

### Fixed
- Fixed TypeError bug when Approuter saves a cookie from backend and should logout when session timeout exceeded. 
- Fixed calculation of location after login.

## 6.0.0 - 2019-05-06

### Added
- Support node version 8 and node version 10 instead of node version 4.5 and node version 6

## 5.15.0 - 2019-04-29

### Added
- Support for Service to Application Router functionality (Beta version).
- Added destination in host support.

## 5.14.1 - 2019-04-17

### Added
- Enhanced Approuter application logs when serving of static content (from HTML5 App Repo) was failed.

### Fixed
- Fixed subscription callbacks url.

## 5.14.0 - 2019-04-04

### Added
- Websockets support for HTML5 Application Repository.

### Fixed
- onSubscription callback.

## 5.13.1 - 2019-03-27

### Added
- Added automatic recovery of Approuter after recovery of UAA.

### Fixed
- Fixed subscription callbacks url.
- Fixed avoid central appConfig routes overrides.

### Updated dependencies
 - deps: @sap/xssec@2.1.16

## 5.13.0 - 2019-02-14

### Added
- Ability to define identity provider for authentication in the route.

## 5.12.0 - 2019-02-05

### Added
- Dynamic destination support.

## 5.11.0 - 2019-01-22

### Added
- Client credentials token support.

## 5.10.2 - 2019-01-08

### Fixed
- Fix proxy issue in Connectivity flow.

## 5.10.1 - 2019-01-03

### Fixed
- Fixed flow of access destination via desination service.

## 5.10.0 - 2018-12-30

### Added
- Propagation of approuter host during logout.

## 5.9.0 - 2018-12-18

### Added
- Ability to change destination without restarting application on CF
- Access destination that is exposed on destination service instance level.
- Enabled all authentication types defined in the destination service.

## 5.8.0 - 2018-10-27

### Fixed
- Fix login flow for URLs with empty query (URL that ends with '?').

### Added
- Documentation of integration with HTML5 Apps Repo.

### Updated dependencies
 - deps: ws@1.1.5
 - deps: lodash@4.17.11
 - deps: @sap/logging@4.0.2
    - deps: lodash@4.17.11

## 5.7.0 - 2018-10-08

### Added
 - Propagate client id to UAA during Logout
 
## 5.6.4 - 2018-08-27

### Updated dependencies
- deps: @sap/audit-logging@2.2.4
- deps: sync-request@5.0.0
     
### Fixed
- Duplicate destination names in xs-app.json bug

## 5.6.3 - 2018-08-15

### Updated dependencies
 - deps: e2e-trace@1.3.0
 - deps: xssec@2.1.15
    - deps: request@2.88.0

### Fixed
 - Fix bug of post/put requests with content/type=application/json

## 5.6.2 - 2018-08-09

### Updated dependencies
 - deps: serve-static@1.13.2
    - deps: send@0.16.1
	     - deps: mime@1.4.1
	     - 	deps: debug@2.6.9

### Fixed
 - Fix error in case of local destination and UAA with tenant mode shared
 
## 5.6.1 - 2018-08-07

### Updated dependencies
 - deps: body-parser@1.18.3
 - deps: uid-safe@2.1.5
 - deps: @sap/xssec@2.1.9
 - deps: send@0.16.2
 - deps: compression@1.7.3
 - deps: express-session@1.15.6
 - deps: connect@3.6.5

## 5.6.0 - 2018-08-05

### Added
 - Added SaaS application registration support (subscription)
 - Enhanced usage of PreserveHostHeader additional property

### Fixed
 - Fix error handling in case of bad signature

## 5.5.0 - 2018-07-19

### Added
 - Added optional additional properties 'PreserveHostHeader' to Destination service
 - Added optional additional properties 'sap-client' to Destination service

## 5.4.2 - 2018-07-04

### Fixed
 - Fix refresh page location after timeout bug
 - Fix fragment cookie name bug
 - Fix vulnerabilities issues
 
## 5.4.1 - 2018-06-25
 
### Fixed
 - Fix logout bug

## 5.4.0 - 2018-06-10

### Added
 - Support extensibility of logout end-point 
 
### Fixed
 - Fix vulnerabilities issues

## 5.3.0 - 2018-05-13

### Added
 - Enable extended session management
 - Enable Correlation ID propagation

## 5.2.1 - 2018-05-02

### Added
 - Support audit log service

## 5.2.0 - 2018-04-16

### Added
 - Support routing to destination with authentication type OAuth2SAMLBearerAssertion

### Fixed
 - Fix bug in forward undefine token


## 5.1.0 - 2018-03-14

### Added
 - Support destination configuration from destination service

### Fixed
 - Fix bug in trace functionality
 - Fix bug in fragment functionality

## 5.0.0 - 2018-01-29

### Fixed
 - Minor fix in destinations handling in Extension flow.
 - Fix fragment handling in URL during Login flow.
 
## 4.0.1 - 2018-01-01

### Fixed
 - Minor fixes in CORs.

## 4.0.0 - 2017-12-18

### Added
 - Application router can consume content from the HTML5 application repository.

### Fixed
 - Fix in headers handling when using CF destination and onPremise destination in same xs-app.json.
 - Minor fix in CORs.

## 3.0.1 - 2017-10-08

### Removed
 - Node 0.12 support.
 
## 2.10.0 - 2017-07-30

### Added
 - Enabled connectivity to on premise backend.
 - Added external reverse proxy support.

### Fixed
 - Fix CSRF token generation to use a Secure Random number generator.

## 2.9.1 - 2017-06-29

### Fixed
 - Minor fixes in CORs.
 - Introduce CORs feature in README.md.
 
## 2.9.0 - 2017-06-27

### Added
 - Support for CORs functionality.

## 2.8.2 - 2017-06-13

### Fixed
 - Fix cancel request.
 - Fix logout in dynamic routing.

## 2.8.1 - 2017-06-01

### Fixed
 - Fixes in documentation of dynamic routing and troubleshooting section.
 - Fix logout when using websocket.

## 2.8.0 - 2017-04-26

### Added
 - Introduce table of contents in README.md.
 - Added JWT refresh in websocket connections.
 - Significant performance improvements via adopting @sap/logging version 3

## 2.7.1 - 2017-03-20

### Fixed
 - Add username to logs.
 - Minor fixes in websockets and session handling.

## 2.7.0 - 2017-02-13

### Added
- Replacements from services.
- Start approuter on https
- Show warning when a route is explicitly both public and csrf protected.

### Fixed
- Should not escape client cookies.
- Redirect to welcome page if not CSRF token fetch request.
- Wrong basic authentication status codes.

## 2.6.1 - 2017-01-25

### Changed
- Rename package to use @sap scope

## 2.6.0 - 2017-01-25

### Added
- `REQUEST_TRACE` environment variable for enhanced request tracing.
- Support for PATCH in router configuration.
- New extensions - see extending.md.

### Removed
- Customizable UAA config resolution.

### Fixed
- Fixes in documentation.
- Handling of request protocol.
- Removed npm 2 restriction.

## 2.5.0 - 2016-12-13

### Added
- Enable customizable UAA config resolution
- Support for custom error pages (errorPage in xs-app.json)
- Extend sizing guide

### Fixed
- Crash in error handler due to missing logger.
- Does not cache login responses.
- Does not log UAA missing when not needed.
- In case of parallel logins Approuter may use wrong user.
- Does not send basic credentials to backend, unless route is public.

## 2.4.0 - 2016-11-16

### Added
- Introduce SECURE_SESSION_COOKIE environment variable - enforces the secure flag of application router's session cookie.
- Additional checks for regular expressions during startup.

### Changed
- Previous component name in sap passport has been changed to 'XSA Approuter'.

### Fixed
 - Missing logging context in error handler when using extensions.

## 2.3.4 - 2016-11-04

### Fixed
- The _x-csrf-token_ header is no longer forwarded to backend in case a path requires authentication and CSRF token protection.
- Set the _Secure_ flag of the session cookie depending on the environment application router runs in.
- Some of the links in README.md were broken.

## 2.3.3 - 2016-11-02

### Added
-	Add COMPRESSION env var to be able to configure compression.

### Fixed
- Do not cache wsAllowedOrigins across requests.
- Favor UAA config from default-env.json over default-services.json.
-	Extend error message for proxy settings problem.
-	Enable compression by default when custom setting is provided.
-	Propagate errors to handler.
- Avoid session resave at the end of request. Fix session overwrite.

## 2.3.2 - 2016-09-30

### Fixed
- Cookie locationAfterLogin clash in port based routing.

## 2.3.1 - 2016-09-28

### Fixed
- Unverified redirect via locationAfterLogin cookie.
- Fallback to default UAA if no tenant captured.
- Fix X-Frame-Options header overwriting.
- Session cookie name - use application_id instead of instance_id.
- Fix port validation for approuter.start().

## 2.3.0 - 2016-09-02

### Added
- Multitenancy support.
- Matching route by both URL path and HTTP method.

### Fixed
- Fixed race condition while CSRF token generation.

## 2.2.0 - 2016-08-17

### Added
- Start approuter with xs-app.json passed as an object.
- Follow symlinks in localDir config.
- Document the Content-Security-Policy header as a best practice.

## 2.1.3 - 2016-08-13

### Added
- Genarate CSRF token once per session.

## 2.1.2 - 2016-08-06

### Fixed
- Remove instance cookies from client request.
- Fix locatioinAfterLogin cookie path.

## 2.1.1 - 2016-07-24

### Fixed
- Support to host welcome page externally.
- Fix logout path matching.
- Fix 500 sent in case locationAfterLogin cookie is missing.


## 2.1.0 - 2016-07-17

### Added
- Allow source of route to be matched in case-insensitive way.
- New configuration for maximum client connection timeout.
- Add support for approuter extensions (custom middleware).
- Allow fetching CSRF token with HEAD request.

## 2.0.0 - 2016-05-12

### Added
- Configuration for the Cache-Control header in xs-app.json. The header is used when serving static resources.

### Removed
- local-* files (e.g. local-destinations, local-plugins) can no longer be used in the approuter during local development. Instead of these the approuter reads a single file located in the working directory (default-env.json), which contains the corresponding environment variables (e.g. destinations, plugins) and their values.
