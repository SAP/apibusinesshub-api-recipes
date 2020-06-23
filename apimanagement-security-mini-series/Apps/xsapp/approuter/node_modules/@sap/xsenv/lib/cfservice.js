'use strict';

var filter = require('./filter');
var VError = require('verror');

exports.readCFServices = readCFServices;
exports.filterCFServices = filterCFServices;

function readCFServices() {
  if (!process.env.VCAP_SERVICES) {
    return;
  }
  try {
    var services = JSON.parse(process.env.VCAP_SERVICES);
  } catch (err) {
    throw new VError(err, 'Environment variable VCAP_SERVICES is not a valid JSON string.');
  }

  var result = {};
  for (var s in services) {
    for (var si in services[s]) {
      var svc = services[s][si];
      result[svc.name] = svc; // name is the service instance id
    }
  }
  return result;
}

/**
 * Returns an array of Cloud Foundry services matching the given filter.
 *
 * @param filterQuery {(string|Object|function)}
 *  - if string, returns the service with the same service instance name (name property)
 *  - if Object, should have some of these properties [name, label, tag, plan] and returns all services
 *    where all of the given properties match. Given tag matches if it is present in the tags array.
 *  - if function, should take a service object as argument and return true only if it matches the filter
 * @returns Arrays of matching service objects, empty if no matches
 */
function filterCFServices(filterQuery) {
  return filter.apply(readCFServices(), filterQuery);
}
