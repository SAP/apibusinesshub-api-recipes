//Sets the proxy host in the proxyendpoint preflow so that it can be used later on
function setProxyHost(){
  var host = context.proxyRequest.headers['host'];
  context.setVariable("apim.proxyHost", host);
}

//Escapes the characters of regex use
function escapeRegExp(value) {
    return value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

//Trims the last chars from the string
function trimEnd(value, searchChar){
  if (value.charAt(value.length - 1) == searchChar) {
    value = value.substr(0, value.length - 1);
  }
  return value;
}

//Returns the target end host and port from the target url
function getTargetHost(){
   var targetUrl = context.getVariable("target.url");
  
  var index = targetUrl.indexOf("://");
  targetUrl = targetUrl.substring(index+3);
  
  index = targetUrl.indexOf("/");
  
  return targetUrl.substring(0,index);
}

//Returns the proxy host from the context variable
function getProxyHost(){
  return context.getVariable("apim.proxyHost");
}

//Returns the target base path by escaping the trailing /
function getTargetBasePath(){
  return trimEnd(context.getVariable("target.basepath"),'/');
}

//Returns the proxy base path by escaping the trailing /
function getProxyBasePath(){
  return trimEnd(context.getVariable("proxy.basepath"),'/');
}
