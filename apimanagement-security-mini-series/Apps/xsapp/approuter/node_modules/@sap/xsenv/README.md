# @sap/xsenv

Utility for easily reading application configurations for bound services and certificates in the SAP Cloud Platform Cloud Foundry environment, SAP XS advanced model and Kubernetes (K8S).


## Install

```sh
npm install --save @sap/xsenv
```

## Usage

```js
var xsenv = require('@sap/xsenv');

// Read the configuration for all bound service instances
var services = xsenv.readServices();
console.log(services.serviceInstance); // prints { credentials: { user: ..., pass:... }, name: 'serviceInstance', tags: [...], label: ...

// Read the credentials for all bound service instances matching a given service query
var services = xsenv.filterServices({ label: 'hana' });
console.log(services); // prints [ { credentials: { ... } }, { credentials: { ... } } ]

// Read only the credentials portion of the configuration for a service instance matching a given service query
var svc = xsenv.serviceCredentials({ tag: 'hana' });
console.log(svc); // prints { host: '...', port: '...', user: '...', password: '...', ... }

// Read configuration for a service instance matching a given service query
var services = xsenv.getServices({ hana: { name: 'hanaInstance' }}); // returns { hana: { host: '...', port: '...', user: '...', password: '...', ... } }
var hanaInstanceCredentials = services.hana;

```
For specifics in the usage in different environments, read below.

## Usage in Cloud Foundry and SAP XS Advanced

Cloud Foundry and SAP XS advanced both provide application configurations via environment variables.
The properties of the bound services are in [VCAP_SERVICES](http://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES) environment variable in both cases.

### Service Lookup

Normally in Cloud Foundry you bind a service instance to your application with a command like this one:
```sh
cf bind-service my-app aservice
```

Here is how you can get this service configuration in your Node.js application if you don't know the instance name in advance:
```js
var xsenv = require('@sap/xsenv');

var services = xsenv.readServices();
var svc = services[process.env.SERVICE_NAME];
```

You can look up services based on their metadata:
```js
var svc = xsenv.serviceCredentials({ tag: 'hdb' });
console.log(svc); // prints { host: '...', port: '...', user: '...', password: '...', ... }
```
This example finds a service binding with `hdb` in the tags.
See [Service Query](#service-query) below for description of the supported query values.

You can also look up multiple services in a single call:
```js
var xsenv = require('@sap/xsenv');

var services = xsenv.getServices({
  hana: { tag: 'hdb' },
  scheduler: { label: 'jobs' }
});

var hanaCredentials = services.hana;
var schedulerCredentials = services.scheduler;
```
This example finds two services - one with tag `hdb` and the other with label `jobs`.
`getServices` function provides additional convenience that default service configuration can be provided in a JSON file.

To test the above example locally, create a file called `default-services.json` in the working directory of your application.
This file should contain something like this:
```json
{
  "hana": {
    "host": "localhost",
    "port": "30015",
    "user": "SYSTEM",
    "password": "secret"
  },
  "scheduler": {
    "host": "localhost",
    "port": "4242",
    "user": "my_user",
    "password": "secret"
  }
}
```
**Note:** The result property names (`hana` and `scheduler`) are the same as those in the query object and also those in `default-services.json`.

[Local environment setup](#local-environment-setup) describes an alternative approach to provide service configurations for local testing.

### User-Provided Service Instances

While this package can look up any kind of bound service instances, you should be aware that [User-Provided Service Instances](https://docs.cloudfoundry.org/devguide/services/user-provided.html) have less properties than managed service instances. Here is an example:
```json
  "VCAP_SERVICES": {
    "user-provided": [
      {
        "name": "pubsub",
        "label": "user-provided",
        "tags": [],
        "credentials": {
          "binary": "pubsub.rb",
          "host": "pubsub01.example.com",
          "password": "p@29w0rd",
          "port": "1234",
          "username": "pubsubuser"
        },
        "syslog_drain_url": ""
	  }
    ]
  }
```
As you can see the only usable property is the `name`. In particular, there are no tags for a user-provided services.


## Usage in Kubernetes

Kubernetes offers several ways of handling application configurations for bound services and certificates. @sap/xsenv expects that such configurations are handled as Kubernetes Secrets and mounted as files to the pod at a specific path. This path can be provided by the application developer, but the default is `/etc/secrets/sapcp`. From there, @sap/xsenv assumes that the directory structure is the following `/etc/secrets/sapcp/<service-name>/<instance-name>`. Here `<service-name>` and `<instance-name>` are both directories and the latter contains the credentials/configurations for the service instance as files, where the file name is the name of the configuration/credential and the content is respectively the value.

For example, the following folder structure:
```sh

/etc/
    /secrets/
            /sapcp/
                 /hana/
                 |    /hanaInst1/
                 |    |          /user1
                 |    |          /pass1
                 |    /hanaInst2/
                 |               /user2
                 |               /pass2
                 /xsuaa/
                       /xsuaaInst/
                                  /user
                                  /pass
```
resembles two instances of service `hana` - `hanaInst1` and `hanaInst2` each with their own credentials/configurations and one instance of service `xsuaa` called `xsuaaInst` with its credentials.

In Kubernetes you can create and bind to a service instance in the following way using the Service Catalog:

```sh
svcat provision xsuaaInst --class xsuaa --plan application
svcat bind xsuaaInst --name xsuaaBind
```
Upon creation of the binding, the Service Catalog will create a Kubernetes secret (by default with the same name as the binding) containing credentials, configurations and certificates. This secret can then be mounted to the pod as a volume.

The following *deployment.yml* file would generate the file structure above, assuming we have bindings `hanaBind1`, `hanaBind2` and `xsuaaBind` for service instances `hanaInst1`, `hanaInst2` and `xsuaaInst` created with Service Catalog:
```sh
...
     containers:
      - name: app
        image: app-image:1.0.0
        ports:
          - appPort: 8080
        volumeMounts:
        - name: hana-volume-1
          mountPath: "/etc/secrets/sapcp/hana/hanaInst1"
          readOnly: true
        - name: hana-volume-2
          mountPath: "/etc/secrets/sapcp/hana/hanaInst2"
          readOnly: true
        - name: xsuaa-volume
          mountPath: "/etc/secrets/sapcp/xsuaa/xsuaaInst"
          readOnly: true
      volumes:
      - name: hana-volume-1
        secret:
          secretName: hanaBind1
      - name: hana-volume-2
        secret:
          secretName: hanaBind2
      - name: xsuaa-volume
        secret:
          secretName: xsuaaBind

```

Of course, you can also create Kubernetes secrets directly with `kubectl` and  mount them to the pod. As long as the mount path follows the `<root-path>/<service-name>/<instance-name>` pattern, @sap/xsenv will be able to read and filter the bound services configurations.

### Service Lookup

Service look up in the Kubernetes environment looks the same way as it does in the Cloud Foundry one.

Looking at the above example of bound services here is how you can get the service configuration of `hanaInst1` in your node application:

```js
var xsenv = require('@sap/xsenv');

var services = xsenv.readServices();
console.log(services.hanaInst1.credentials); // prints { user1: '...', pass1: '...', ... }
```

Here is how to lookup the service based on its metadata in Kubernetes:
```js
var svc = xsenv.serviceCredentials({ label: 'hana' });
console.log(svc); // prints { host: '...', port: '...', user: '...', passwrod: '...', ... }
```
This example finds a service binding with `hana` as a label. Note that for Kubernetes lookup based on metadata is limited. See [Service Query](#service-query) below for description of the supported query values in Cloud Foundry and Kubernetes.


If you have mounted your secrets to a different path, you can pass it to @sap/xsenv like so:

```js
var xsenv = require('@sap/xsenv');

var services = xsenv.getServices('/some/user/path', {
  hana: { name: 'hanaInst1' },
  xsuaa: { label: 'xsuaa' }
});

var hanaCredentials = services.hana;
var schedulerCredentials = services.xsuaa;
```

## Local Usage

For local testing you can provide configurations by yourself. This package allows you to provide default configurations in a separate configuration file.
* This reduces clutter by removing configuration data from the app code.
* You don't have to set env vars manually each time you start your app.
* Different developers can use their own configurations for their local tests without changing files under source control. Just add this configuration file to `.gitignore` and `.cfignore`.

You can provide default configurations on two levels:
* For bound services via `getServices()` and `default-services.json`
* For any environment variable via `loadEnv()` and `default-env.json`

## Service Query

Both `getServices` and `filterServices` use the same service query values. Due to specifics of the environment the queries in Cloud Foundry can be richer - see property table below.

Query value | Description
------------|------------
{string}    | Matches the service with the same service instance name (`name` property). Same as `{ name: '<string>' }`.
{object}    | All properties of the given object should match corresponding service instance properties as they appear in VCAP_SERVICES or the Kubernetes secret. See below what is supported on each platform.
{function}  | A function that takes a service object as argument and returns `true`, only if it is considered a match.

If an object is given as a query value, it may have the following properties:

Property | CF  | K8S | Description
---------|-----|-----|------------
`name`   | yes | yes |Service instance name - the name you use to bind the service
`label`  | yes | yes |Service name - the name shown by `cf marketplace`
`tag`    | yes | no  |Should match any of the service tags
`plan`   | yes | no  |Service instance plan - the plan you use in `cf create-service`

If multiple properties are given, _all_ of them must match.

**Note:** Do not confuse the instance name (`name` property) with the service name (`label` property).
Since you can have multiple instances of the same service bound to your app,
instance name is unique while service name is not.

Here are some examples.

Find a service instance by name:
```js
xsenv.serviceCredentials('hana');
```

Look up a service by tag:
```js
xsenv.serviceCredentials({ tag: 'relational' });
```

Match several properties:
```js
xsenv.serviceCredentials({ label: 'hana', plan: 'shared' });
```

Pass a custom filter function:
```js
xsenv.serviceCredentials(function(service) {
  return /shared/.test(service.plan) && /hdi/.test(service.label);
});
```
Notice that the filter function is called with the full service object as it appears in VCAP_SERVICES, but `serviceCredentials` returns only the `credentials` property of the matching service. The behaviour is the same in Kubernetes - the function will return only the contents of the `credentials` portion of the mounted secret.

## API

### getServices([path], query, [servicesFile])

Looks up bound service instances matching the given query.
If a service is not found - returns default service configuration loaded from a JSON file. The order of lookup is VCAP_SERVICES -> mounted secrets path in K8S -> default service configuration.

* `path` - (optional) A string containing the mount path where the secrets are located in Kubernetes. By default is "/etc/secrets/sapcp". For example, by default the credentials for an instance "inst-name" of service "service-name" would be located under "/etc/secrets/sapcp/service-name/inst-name".
* `query` - An object describing requested services. Each property value is a filter as described in [Service Query](#service-query)
* `servicesFile` - (optional) path to JSON file to load default service configuration (default is default-services.json).
If `null`, do not load default service configuration.
* _returns_ - An object with the same properties as in query argument where the value of each property is the respective service credentials object
* _throws_ - An error, if for some of the requested services no or multiple instances are found

### serviceCredentials([path], filter)

Looks up a bound service instance matching the given filter works for both the Kubernetes and Cloud Foundry environments.

**Note:** This function does not load default service configuration from default-services.json.

* `path` - (optional) A string containing the mount path where the secrets are located in Kubernetes. By default is "/etc/secrets/sapcp".
* `filter` - Service lookup criteria as described in [Service Query](#service-query)
* _returns_ - Credentials object of found service
* _throws_ - An error in case no or multiple matching services are found

### filterServices([path], filter)

Returns all bound services that match the given criteria. Works in Cloud Foundry and Kubernetes.

* `path` - (optional) A string containing the mount path where the secrets are located in Kubernetes. By default is "/etc/secrets/sapcp".
* `filter` - Service lookup criteria as described in [Service Query](#service-query)
* _returns_ - An array of credentials objects of matching services. Empty array, if no matches found.

### readServices([path])

* `path` - (optional) A string containing the mount path where the secrets are located in Kubernetes. By default is "/etc/secrets/sapcp".
* _returns_ Returns an object where each service instance is mapped to its name. Works in Kubernetes and Cloud Foundry.

For example, given this VCAP_SERVICES:
```
  {
    "hana" : [ {
      "credentials" : {
        ...
      },
      "label" : "hana",
      "name" : "hana1",
      "plan" : "shared",
      "tags" : [ "hana", "relational" ]
    },
    {
      "credentials" : {
        ...
      },
      "label" : "hana",
      "name" : "hana2",
      "plan" : "shared",
      "tags" : [ "hana", "relational", "SP09" ]
    } ]
  }
```
`readServices` would return:
```
{
  hana1: {
    "credentials" : {
      ...
    },
    "label" : "hana",
    "name" : "hana1",
    "plan" : "shared",
    "tags" : [ "hana", "relational" ]
  },
  hana2: {
    "credentials" : {
      ...
    },
    "label" : "hana",
    "name" : "hana2",
    "plan" : "shared",
    "tags" : [ "hana", "relational", "SP09" ]
  }
}
```


### cfServiceCredentials(filter)

Same as [serviceCredentials(filter)](#servicecredentialspath-filter) but works only in Cloud Foundry. It is recommended to use the generic function.

### filterCFServices(filter)

Same as [filterServices(filter)](#filterservicespath-filter) but works only in Cloud Foundry. It is recommended to use the generic function.

### readCFServices()

Same as [readServices()](#readservicespath) but works only in Cloud Foundry. It is recommended to use the generic function.

## Local environment setup

To test your application locally you often need to setup its environment so that resembles the environment in Cloud Foundry or Kubernetes.
You can do this easily by defining the necessary environment variables in a JSON file.

For example you can create file _default-env.json_ with the following content in the working directory of the application :
```json
{
  "PORT": 3000,
  "VCAP_SERVICES": {
    "hana": [
      {
        "credentials": {
          "host": "myhana",
          "port": "30015",
          "user": "SYSTEM",
          "password": "secret"
        },
        "label": "hana",
        "name": "hana-R90",
        "tags": [
          "hana",
          "database",
          "relational"
        ]
      }
    ],
    "scheduler": [
      {
        "credentials": {
          "host": "localhost",
          "port": "4242",
          "user": "jobuser",
          "password": "jobpassword"
        },
        "label": "scheduler",
        "name": "jobscheduler",
        "tags": [
          "scheduler"
        ]
      }
    ]
  }
}
```
Then load it in your application:
```js
xsenv.loadEnv();
console.log(process.env.PORT); // prints 3000
console.log(xsenv.cfServiceCredentials('hana-R90')); // prints { host: 'myhana, port: '30015', user: 'SYSTEM', password: 'secret' }
```

This way you don't need in your code conditional logic if it is running in Cloud Foundry or locally.

You can also use a different file name:
```js
xsenv.loadEnv('myenv.json');
```

### loadEnv([file])

Loads the environment from a JSON file.
This function converts each top-level property to a string and sets it in the respective environment variable,
unless it is already set. This function does not change existing environment variables. So the file content acts like default values for environment variables.

This function does not complain if the file does not exist.

* `file` - optional name of JSON file to load, `'default-env.json'` by default. Does nothing if the file does not exist.

## Loading SSL Certificates

If SSL is configured in XS advanced On-Premise Runtime, it will provide one or more
trusted CA certificates that applications can use to make SSL connections.
If present, the file paths of these certificates are listed in `XS_CACERT_PATH`
environment variable separated by `path.delimiter` (`:` on LINUX and `;` on Windows).

### loadCertificates([certPath])

Loads the certificates listed in the given path.
If this argument is not provided, it uses `XS_CACERT_PATH` environment variable instead.
If that is not set either, the function returns `undefined`.
The function returns an array even if a single certificate is provided.
This function is synchronous.

* `certPath` - optional string with certificate files to load. The file names are separated by `path.delimiter`. Default is `process.env.XS_CACERT_PATH`.
* _returns_ - an array of loaded certificates or `undefined` if `certPath` argument is not provided
* _throws_ - an error, if some of the files could not be loaded

For example, this code loads the trusted CA certificates so they are used for all
subsequent outgoing HTTPS connections:
```js
var https = require('https');
var xsenv = require('@sap/xsenv');

https.globalAgent.options.ca = xsenv.loadCertificates();
```

This function can be used also to load SSL certificates for HANA like this:
```js
var hdb = require('hdb');
var xsenv = require('@sap/xsenv');

var client = hdb.createClient({
  host : 'hostname',
  port : 30015,
  ca   : xsenv.loadCertificates(),
  ...
});
```

## Debugging

Set `DEBUG=xsenv` in the environment to enable debug traces. See [debug](https://www.npmjs.com/package/debug) package for details.
