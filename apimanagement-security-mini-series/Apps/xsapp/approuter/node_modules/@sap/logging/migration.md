# Migration Guide

## Version 3 ==> Version 4

### Changes to application code

#### Application context

`logLocation` and `traceLocation` are no longer considered.
The library writes entries to standard output and to standard error only.
This makes providing these options unnecessary:

```js
var logging = require('@sap/logging');

var appContext = logging.createAppContext({
  // these options are unnecessary in version 4
  logLocation: logging.STORAGE.CONSOLE,
  traceLocation: 'path-to-file'
});
```

#### Middleware

Code like:

```js
var logging = require('@sap/logging');
var appContext = logging.createAppContext();

// ...

app.use(logging.expressMiddleware(appContext));
```

should be transformed to:

```js
const logging = require('@sap/logging');
const appContext = logging.createAppContext();

// ...

app.use(logging.middleware({ appContext: appContext }));
```

#### Loggers and tracers from application context

Code like:

```js
appContext.getLogger('/Application/Category');
// or
appContext.getTracer(__filename);
```

should be transformed to one of the following variants:

- when getting a logger/tracer when a message from messaging service is received or a job run is triggered:

```js
appContext.createLogContext().getLogger('/Application/Category');
// or
appContext.createLogContext().getTracer(__filename);
```

With the snippet above, the context id will be auto-generated.
It is still possible to provide a custom value.

- when getting a logger/tracer for logging/tracing purposes during application startup:

```js
appContext.createLogContext({ id: '' }).getLogger('/Application/Category');
// or
appContext.createLogContext({ id: '' }).getTracer(__filename);
```

**Note**: The context id defaults to an auto-generated value.
Therefore, it is recommended to explicitly pass an empty string as `id` for the log context used on application startup to distinguish these entries from entries produced during job runs or during the processing of other events more easily.

#### Loggers and tracers from request context

Code like:

```js
appContext.createRequestContext(req).getLogger('/Application/Category');
// or
appContext.createRequestContext(req).getTracer(__filename);
```

should be transformed to:

```js
appContext.createLogContext({ req }).getLogger('/Application/Category');
// or
appContext.createLogContext({ req }).getTracer(__filename);
```

#### Request id

Code like:

```js
appContext.createRequestContext(req).requestId
```

should be transformed to:

```js
appContext.createLogContext({ req }).id
```
