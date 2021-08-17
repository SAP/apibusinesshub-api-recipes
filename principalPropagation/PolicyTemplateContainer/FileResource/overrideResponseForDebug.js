var staticVariableMap={
    "AccountNameIdentified":"myVar.accountNameFound",
    "Destination_Auth_Endpoint":"myVar.destination.authEndpoint",
    "Destination_Auth_ClientId":"myVar.destination.clientId",
    "Destination_Auth_Uri":"myVar.destination.uri",
    "Destination_Name":"myVar.destination.name",
    "QueryFreshRefreshToken":"myVar.destination.doQueryForFreshToken",
    "CacheResponseAtStart":"myVar.cacheResponseString",
    "CacheResponseAtEnd":"myVar.cacheString"

    }
    
var dynamicVariableMap={
    "IncomingAuthToken":"myVar.incoming.loginToken",
    "Base64EncodedDestinationServiceCred":"myVar.destination.encodedBasicAuth",
    "Destination_Service_access_token":"myVar.destination.resp.access_token",
    "Final Token required for API Proxy":"myVar.destination.resp.finalToken"

}

var finalJson={}
finalJson["static"]=getJson(staticVariableMap)
finalJson["dynamic"]=getJson(dynamicVariableMap)


var rc = context.getVariable("response.content");
context.setVariable("response.content", JSON.stringify(finalJson));
context.setVariable("response.header.Content-Type'", 'application/json');

//context.setVariable("response.content", finalJson);


function getJson(myMap){
    var j={},value=0
    for (var m in myMap){
        
        try{
            value=JSON.parse(context.getVariable(myMap[m]))
        }catch(e){
            value=context.getVariable(myMap[m])
        }
        j[m]=value
    }
    return j
    
}
    
