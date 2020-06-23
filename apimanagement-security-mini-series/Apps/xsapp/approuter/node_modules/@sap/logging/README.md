@sap/logging
===========

A package that provides logging and tracing functionalities for Node.js applications.

<!-- toc -->

- [Example](#example)
- [Logging & Tracing](#logging--tracing)
- [Categories & Locations](#categories--locations)
- [Location values](#location-values)
- [Wildcard support](#wildcard-support)
- [Formats](#formats)
- [Severity Levels](#severity-levels)
- [*XS_APP_LOG_LEVEL* environment variable](#xs_app_log_level-environment-variable)
- [Changing severity levels for an application](#changing-severity-levels-for-an-application)
  * [XS Advanced](#xs-advanced)
  * [Cloud Foundry](#cloud-foundry)
- [Logging sensitive data](#logging-sensitive-data)
- [API](#api)
  * [Application context](#application-context)
  * [Log context](#log-context)
  * [Log context id](#log-context-id)
  * [Middleware](#middleware)
  * [Loggers](#loggers)
  * [Tracers](#tracers)
  * [Convenient tracing methods](#convenient-tracing-methods)
  * [Other](#other)
- [Migration guide](#migration-guide)

<!-- tocstop -->

### Example

Following is an example of how to consume the package using [express](https://www.npmjs.com/package/express):

```js
var logging = require('@sap/logging');
var express = require('express');

var app = express();

var appContext = logging.createAppContext();

app.use(logging.middleware({ appContext: appContext, logNetwork: true }));

app.get('/demo', function (req, res) {
  var logger = req.loggingContext.getLogger('/Application/Network');
  var tracer = req.loggingContext.getTracer(__filename);

  logger.info('Retrieving demo greeting ...');
  tracer.info('Processing GET request to /demo');

  res.send('Hello World!');
});

app.listen(3000, function() {
  console.log('Server started');
});
```

In general, you just need to:
- Initialize the logging library with some application-wide options.
- Use the provided middleware that will extract request specific information.
It is recommended that this middleware is the first one to be called in order to have the logging context available as early as possible.
It is also recommended to have the middleware that sets the user of the request (if the application intends to log the current user)
right after the one provided by this library.
- Instantiate a logger and a tracer via the _loggingContext_ property of the request.
- Log and trace whatever you need.

See more details below.

### Logging & Tracing

Logs are addressed to an administrator of an application. Traces - to a developer or support staff.
- Events that need to be logged are related to how the app operates - e.g. the app cannot display some results taken from a remote HTTP service because the remote server is down.
An administrator of an app does not need to know how it is implemented, he/she should just be able to determine the state of the app itself.
- Traces are mainly used when a problem has occurred and further investigation on code level has to take place.

The logging library writes log entries to standard output and trace entries - to standard error.

### Categories & Locations

- Categories - represent a feature area in an application. For example, different layers - Network layer, Database layer etc.
The concept of categories is used in logging.
- Locations - represent a location in the source code - e.g. a path to a file. Used in the context of tracing. Getting a tracer object requires explicitly providing a location. It is recommended to pass as argument the location of the current script - `__filename`.

### Location values

The path to the application root is removed from the source file paths in the trace output to reduce duplication.
The application root directory is taken from the _HOME_ environment variable. If it is not defined, absolute file paths are used in the trace output.
Example:

Let's assume the structure of your application looks like the following:

<pre>
+-- demo-app
|   +-- package.json
|   +-- lib
|   |   +-- index.js
|   |   +-- services
|   |   |   +-- customer-service.js
|   |   |   +-- sales-service.js
</pre>

Here is how the location of a script (path to a file) will look like in the trace entries (having in mind `__filename` has been passed as location to the tracer):

| Script | _HOME_ environment variable is set  | _HOME_ environment variable is not set |
| ------ | ----------------------------------- | -------------------------------------- |
| index.js | /lib/index.js | /path/from/root/demo-app/lib/index.js |
| customer-service.js | /lib/services/customer-service.js | /path/from/root/demo-app/lib/services/customer-service.js |

The same applies to Windows systems as well.

**Note**: The path separator in the trace entries is always a forward slash, no matter the platform.

### Wildcard support

The asterisk (*) is the only wildcard character supported by the library.
It corresponds to zero or more characters (no matter what they are).
Let's illustrate the wildcard usage using the example application structure from the
previous section,
assuming the _HOME_ environment variable is set to the root of the application (as it would be on XS Advanced or Cloud Foundry):

| Pattern | Result |
| ------- | ------ |
| /Application/Network | Match a certain Category |
| /Application/Network/* | Match all subcategories |
| /lib/services/users-service.js | Match a specific file |
| /lib/services/* | Match all files in all subdirectories of _services_ |

### Formats

- [ListLog](http://help.sap.com/saphelp_nw73ehp1/helpdata/en/53/82dae7c2f5439a8afd1b0ee95c2e45/content.htm) format is used for logs in XS Advanced and during local development
- [Trace](http://help.sap.com/saphelp_nw74/helpdata/en/48/4f3966e39472d2e10000000a42189c/content.htm) format is used for traces in XS Advanced and during local development
- [CF Log](https://github.com/SAP/cf-java-logging-support/blob/master/cf-java-logging-support-core/beats/request-metrics/docs/fields.asciidoc) format is used for logs and traces in Cloud Foundry

**Note**: Instead of thread-name (in ListLog and Trace formats), a context id is used. This is an identifier that helps to distinguish which entries are logged/traced because of which requests/events.
More info on that is available in [this section](#log-context-id).

### Severity Levels

The following table shows which severity levels are available for loggers and tracers:

| Logging | Tracing |
| ------- | ------- |
|         | debug   |
|         | path    |
| info    | info    |
| warning | warning |
| error   | error   |
| fatal   | fatal   |

Here you can find when to use which level:

| Level   | When to use |
| -----   | ----------- |
| debug   | Used to output the internal status of a program. |
| path    | Used to analyze the execution flow of a program. |
| info    | Used for events that do not need any follow up activity. They show the normal operations within an app. |
| warning | Used for events that need follow up activity in order to prevent errors in the future. |
| error   | Used when the desired tasks cannot be completed and the application is still usable. |
| fatal   | Used in case of errors, because of which the application is no longer usable. |

The default severity level for loggers is _info_ and the default one for tracers is _error_.

### *XS_APP_LOG_LEVEL* environment variable

The `XS_APP_LOG_LEVEL` environment variable can be used to configure severity levels for logging and tracing.
Valid values are severity levels from `debug` to `fatal`. The level specified in this environment variable
will be used instead of all already set levels.
`none` is also a valid value for `XS_APP_LOG_LEVEL`. In that case all logging and tracing is disabled (useful for automated tests).
The library throws an error if the value of `XS_APP_LOG_LEVEL` is not a valid severity level or `none`.

### Changing severity levels for an application

#### XS Advanced

You can enable debug logs and traces for an application deployed on XS Advanced via the command:

```sh
xs set-logging-level <application-name> "*" debug
```

This can be reverted via the command:

```sh
xs unset-logging-level <application-name> "*"
```

Restart of the application is not required for those commands to take effect.

The example above shows how to enable _debug_ level for all loggers and tracers.
It is possible to use the command for setting levels for a single category or location
(e.g. `xs set-logging-level <application-name> "/index.js" debug`),
or multiple by using the asterisk wildcard (e.g. `xs set-logging-level <application-name> "/Application/Network/*" debug`).
The comparison with the actual category/location of a logger/tracer is executed in a case insensitive manner.

#### Cloud Foundry

You can enable debug logs and traces for an application deployed on Cloud Foundry via setting the environment variable `XS_APP_LOG_LEVEL`:

```sh
cf set-env <application-name> XS_APP_LOG_LEVEL debug
```

This can be reverted via the command:

```sh
cf unset-env <application-name> XS_APP_LOG_LEVEL
```

**Note**: Application restart is required after each of the commands above in order the changes to the environment to take effect.

### Logging sensitive data

Logging sensitive data is not enabled by default. The following table shows which environment variable enables (when set to `true`) which fields and for which formats:

| Environment Variable     | Field   | Taken from               | Format           |
| ------------------------ | ------- | -----------------------  | ---------------  |
| `XS_LOG_USER`            | user/remote_user    | `req.user.id` property   | ListLog, CF Log  |
| `XS_LOG_REFERER`         | referer | `referer` request header | CF Log           |
| `XS_LOG_CONNECTION_DATA` | remote_ip, remote_host, remote_port, x_forwarded_for | `req.connection.remoteAddress` property, `req.connection.remotePort` property, `x-forwarded-for` header | CF Log           |

### API

To consume the logging package, an [application context](#application-context) needs to be created.
It contains information that is valid for the whole application.
Next a [log context](#log-context) needs to be created.
It contains information that is valid for the current context.
A separate log context should be created for each new event (HTTP request received, job execution started, message from messaging service received).
Because of the asynchronous nature of Node.js, entries produced during the processing of different events can be mixed.
All entries contain information specific to the log context they are associated with,
which helps to distinguish between entries produced during the processing of different events.
[Loggers](#loggers) and [tracers](#tracers) are obtained from the log context.


#### Application context

```js
var logging = require('@sap/logging');

var appContext = logging.createAppContext({
  // options
});
```

To create the application context, pass some application-wide options.
Here is a list of the properties you may optionally pass:

| Property      | Description |
| ------------- | ----------- |
| csnComponent  | *String* Only applicable to SAP applications. |

You may use the application context to change severity levels (with [wildcards](#wildcard-support) for flexibility):
```js
appContext.setLevel('/Application/*', 'warning'); // for a logger
appContext.setLevel(pathToFile, 'debug'); // for a tracer
```

The method throws an error in case of an incorrect level.

Severity levels can be unset with:
```js
appContext.unsetLevel('/Application/*'); // for a logger
appContext.unsetLevel(pathToFile); // for a tracer
```

#### Log context

```js
appContext.createLogContext({
  // options
});
```

A log context needs to be created in order to obtain a logger or a tracer.

Here is a list of the options that can be provided to the log context (all are optional):

| Option        | Description |
| ------------- | ----------- |
| id            | *String* Included in all logs and traces, should be unique. Used to distinguish entries from different log contexts. Defaults to an auto-generated value. If `req` is provided, the value is taken from the request headers `x-request-id` and `x-vcap-request-id` if present. It is recommended to explicitly pass an empty string for log contexts used during application startup. If `req` is present, then this id can be thought of as a request id, because all log/trace entries for that request will have the same id. See [this section](#log-context-id) for more information. |
| correlationId | *String* Used to correlate entries for a logical transaction which involves processing within different applications. If the value is not set explicitly, then it is taken from the `x-correlationid` header (if `req` is provided and the header is present) or from the `id` of the log context. |
| req           | *Object* Represents an HTTP request. |

The log context exposes the following read-only properties:

| Property      | Description |
| ------------- | ----------- |
| id            | The id of the log context. |
| correlationId | The correlation id of the log context. This property is useful when the value needs to be sent to another application. |

Loggers and tracers can be obtained from the log context as follows:

```js
let logger = logContext.getLogger('/Application/Network');
let tracer = logContext.getTracer(__filename);
```

It is possible to log request metrics for an HTTP request using the `enableNetworkLog` method:

```js
logContext.enableNetworkLog(res);
```

It takes a response object as argument.
A `req` object needs to be passed in advance as option when creating the log context.
This method registers a handler for the `finish` event of the HTTP response.
An entry (of `info` severity level), containing request metrics will be logged when the event is emitted.
`enableNetworkLog` should be called once for a request-response pair:

```js
http.createServer(function (req, res) {
  var reqContext = appContext.createLogContext({ req: req });
  reqContext.enableNetworkLog(res);

  res.end('Hello World');
});
```

The log entry uses category `/LoggingLibrary/NetworkLog`.
It can be used to turn off the network log at runtime with [xs set-logging-level](#xs-advanced) or with [appContext.setLevel](#application-context).

#### Log context id

Let's take HTTP requests as an example: Because of the single-threaded nature and the event loop mechanism in Node.js, you may:
- receive a request
- start some async I/O operation
- in the meantime start processing another request before returning a response to the first one

This means that the log entries for the two requests will be mixed a bit. To overcome this issue, each request (and the corresponding log context) is
associated with a unique id which is present in the logs and traces for that request.
In that way one can distinguish between the logs from the first request and the logs from the second request.

The same concept applies to messages received from a messaging service and to job runs triggered according to a schedule.

#### Middleware

There is a utility middleware that can be used (see [this example](#example)).
It automatically attaches a property named _"loggingContext"_ to the request object.
It accepts an object with properties:

| Property      | Description |
| ------------- | ----------- |
| appContext    | *Mandatory* An application context object. |
| logNetwork    | *Optional* Defaults to `false`, boolean specifying whether an entry containing request metrics will be logged for every finished HTTP request. |

The middleware sets the _x-request-id_ response header to the context id for the current request,
so in case of any troubles you may see the value in the response header and then filter the logs to see what the entries for that request are.

#### Loggers

You may create a logger in the following way:

```js
var logger = req.loggingContext.getLogger('/Application/Network');
```

The log context has got the _"getLogger"_ function that takes 1 string argument - the category. Categories are names of functional areas in an application.
We recommend your categories to always begin with _"/Application"_. The categories form a hierarchy with forward slash as a separator. Using back slashes in categories is not allowed.

You may always get the severity level (a string) of a logger with such code:
```js
var level = logger.getLevel();
```

It is also possible to check whether an entry with a specific severity level will be logged with the current level configuration:

```js
var willItBeLogged = logger.isEnabled('info');
```

Logging entries:

```js
logger.info('Successful login of user %s - ', user, new Date());
logger.warning('Job could not finish successfully. An app admin should retrigger it.');
logger.error(new Error('Uups, an error has occurred'));
logger.fatal('We are in trouble');
```

You may use the same string interpolation mechanism as with [util.format](https://nodejs.org/api/util.html#util_util_format_format_args)

Logging errors:
```js
function callback(err, result) {
  if (err) {
    logger.error(err, 'Error during operation X');
  }
  // ...
}
```
If the first argument is an error, its message is appended to the log message.
Also, the error stack is written to the trace.
This works for all severity levels and also with tracers.

#### Tracers

All you need to do to obtain a tracer instance is:

```js
var tracer = req.loggingContext.getTracer(__filename);
```

Methods regarding level getting and checking are provided (similarly to loggers):

```js
var level = tracer.getLevel();
var willItBeTraced = tracer.isEnabled('path');
// etc.
```

#### Convenient tracing methods

**Note**: The first argument to all of these methods should be a string with the name of the function in which entries are being traced.

There are several methods that the API provides for convenience (they use severity level _path_):
- entering - used to record that a function has been entered in the program flow. You may pass all of the arguments of your function to the _entering_ function and they will be traced.
- exiting - typically used in pair with the _entering_ method. You may pass the return value of your function to the _exiting_ function.

```js
function myFunction(tracer, a, b ,c) {
  tracer.entering('myFunction', a, b, c);

  var result = // some logic here ...

  tracer.exiting('myFunction', result);
  return result;
}
```

- throwing - used when you would like to trace when the code is about to throw an error. You may pass the error that is about to be thrown as an argument.
- catching - used in catch blocks. You may pass the caught error as an argument.

```js
function func1(tracer) {
  var error = new Error('An error has occurred');
  tracer.throwing('func1', error);
  throw err;
}

function func2(tracer) {
  try {
    func1(tracer);
  } catch (err) {
    tracer.catching('func2', err);
    // logic for processing the error
  }
}
```

#### Other

The library supports SAP Passports. When a log context is created with a request object that has the `sap-passport` header,
the unique identifiers of the received SAP Passport will be part of the log entries for ListLog format.

### Migration guide

Guide on how to adopt new major versions of the library can be found [here](./migration.md).
