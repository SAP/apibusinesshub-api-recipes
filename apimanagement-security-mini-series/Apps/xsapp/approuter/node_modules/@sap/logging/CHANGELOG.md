# Change Log
All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

The format is based on [Keep a Changelog](http://keepachangelog.com/).

## 5.2.0 - 2020-01-08

### Added
- Added `organization_id` and `organization_name` to the log output

## 5.1.0 - 2019-12-02

### Added
- Node.js 12.x support.

## 5.0.2 - 2019-07-10

### Fixed
- Update *lodash* dependency to v4.17.13.

## 5.0.1 - 2019-05-13

### Fixed
- Update *@sap/e2e-trace* dependency to v2.0.0.

## 5.0.0 - 2019-05-02

### Removed
- Node.js v4 support

## 4.1.0 - 2019-01-16

### Added
- Support for Node.js 10

## 4.0.2 - 2018-09-16

### Fixed
- Update *lodash* dependency to v4.17.11.

## 4.0.1 - 2018-09-04

### Fixed
- `logContext.id` is used as a fallback value for correlation id if no other value is available.

## 4.0.0 - 2018-08-20

### Removed
- Support for writing entries to files (the `logLocation` and `traceLocation` options are no longer taken into account).
- The `STORAGE` property exposed by the library.
- Node 0.12 support.
- Coloring when writing to console.
- `ApplicationContext.prototype.createRequestContext`.

### Changed
- The exposed middleware can be consumed via the `middleware` property instead of `expressMiddleware`.
- Back slashes cannot be used in category names.
- middleware does not take an application context, but an object with an `appContext` property
and optionally - a `logNetwork` property.
- _x-correlationid_ header is no longer taken into account when resolving request id.
- An error is thrown if the level set through the `XS_APP_LOG_LEVEL` environment variable is not valid.

### Added
- Performance improvements.
- Support for CF Log format.
- Possibility to explicitly set correlation id via JavaScript API.
- Correlation id (if present) will be set to ListLog entries as well.
- `AppContext.prototype.createLogContext`.
- `LogContext.prototype.enableNetworkLog`.

## 3.4.0 - 2018-04-26

### Added
- Possibility to enable logging of the current user via the `XS_LOG_USER` environment variable.
From this version onwards the user is not being logged by default.

## 3.3.2 - 2018-04-05

### Fixed
- Update dependencies.
- Unsetting tracer locations.
- `tracer.exiting` when the argument for the return value of the function is falsy.

## 3.3.1 - 2018-02-05

### Fixed
 - Replace new lines in traces when running on XS Advanced.
 - Replace new lines in logs when running on XS Advanced.

## 3.3.0 - 2018-01-19

### Added
- npm-shrinkwrap.json

## 3.2.1 - 2017-12-01

### Fixed
- Update momentjs to 2.19.3

## 3.2.0 - 2017-11-23

### Added
- The request id can be taken from the request headers 'x-request-id', 'x-correlationid', 'x-vcap-request-id' (if available).
- The request id is exposed through the `requestId` property of the request context.
- Improvements to the documentation.

### Fixed
- Handling of tracer locations.
- Process does not exit even if there is no other activity keeping the event loop running.

## 3.1.0 - 2017-08-14

### Added
- Support for Node.js v8.
- Performance improvements in tracing.

## 3.0.0 - 2017-04-12

### Changed
- Automatic location tracking for tracers has been removed due to severe performance impact. This affects application code as follows:
  * A location (path to a file) needs to be explicitly passed to the `getTracer` functions as first argument. Passing `__filename` as a location is recommended.
  * A tracer is no longer associated with the script it is currently being used in, but with the location provided for its instantiation.
  * A function name (a string) should be passed as a first argument to the `entering`, `exiting`, `throwing` and `catching` methods of tracers.

## 2.2.0 - 2017-02-07

### Fixed
- support for the 'xs unset-logging-level' command

### Added
- 'unsetLevel' method on application level contexts

## 2.1.2 - 2017-01-24

### Fixed
- Minor improvements

## 2.1.1 - 2017-01-24

### Changed
- Rename package to use @sap scope

## 2.1.0 - 2017-01-09

### Added
- Log session id when available.

## 2.0.3 - 2016-12-01

### Fixed
- Minor fixes.

## 2.0.2 - 2016-11-08

### Fixed
- Minor fixes.

## 2.0.1 - 2016-11-08

### Fixed
- Minor fixes.

## 2.0.0 - 2016-10-25

### Changed
- By default logs and traces are written to standard output and standard error respectively.

### Fixed
 - Replace new lines in logs.

### Removed
- The package no longer fallbacks to the environment variables  _XS_APPLICATION_LOG_FILE_ and _XS_TRACE_FILE_.
