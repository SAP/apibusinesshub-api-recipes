var rc = context.getVariable("response.content");

//mask the servers
var maskedResponse = rc.replace(new RegExp(getTargetHost(),'g'), getProxyHost());

//mask the base path
maskedResponse = maskedResponse.replace(new RegExp(escapeRegExp(getTargetBasePath()),'g'), getProxyBasePath());


context.setVariable("response.content", maskedResponse);
