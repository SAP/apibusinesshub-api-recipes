'use strict';

const assert = require('assert');

module.exports.apply = apply;

function apply(services, filter) {
  assert(typeof filter === 'string' || typeof filter === 'object' || typeof filter === 'function',
    'bad filter type: ' + typeof filter);

  if (!services) {
    return [];
  }

  if (typeof filter === 'string') {
    return services[filter] ? [services[filter]] : [];
  }

  var result = [];
  for (var key in services) {
    if (applyFilter(services[key], filter)) {
      result.push(services[key]);
    }
  }
  return result;
}

function applyFilter(service, filter) {
  if (typeof filter === 'function') {
    return filter(service);
  }

  var match = false;
  for (var key in filter) {
    if (service[key] === filter[key] ||
      (/tags?/.test(key) && service.tags && service.tags.indexOf(filter[key]) >= 0)) {
      match = true;
    } else {
      return false;
    }
  }
  return match;
}
