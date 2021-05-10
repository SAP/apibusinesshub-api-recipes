var logdata = {
    requestId : context.getVariable("messageid"),
    orgname : context.getVariable("organization.name"),
    envname : context.getVariable("environment.name"),
    proxyname : context.getVariable("apiproxy.name"),
    currentSystemTime : context.getVariable("system.time"),
    requestStartTime : context.getVariable("client.received.end.time"),
    messageContent : context.getVariable("response.content"),
    targetResponseTime : context.getVariable("target.received.end.timestamp") - context.getVariable("target.sent.start.timestamp"),
    apiResponseTime : context.getVariable("system.timestamp") - context.getVariable("client.received.end.timestamp")
}
print("logged data is :"+JSON.stringify(logdata));
context.setVariable("sapim.logmessage",JSON.stringify(logdata));
