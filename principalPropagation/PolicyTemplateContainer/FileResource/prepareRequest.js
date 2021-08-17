if (context.getVariable("myVar.destination.doQueryForFreshToken") === "y") {
    
  var accountNameFound = context.getVariable("myVar.accountNameFound")
  var cacheObj = {},
    cacheString = context.getVariable("myVar.cacheResponseString")
  if ((cacheString === null) || (cacheString === undefined) || (cacheString === "")) {
    cacheObj = {}
  } else {
    cacheObj = JSON.parse(cacheString)
  }
  cacheObj[accountNameFound] = {}
  cacheObj[accountNameFound]["destToken"] = context.getVariable("myVar.destination.resp.access_token")
  cacheObj[accountNameFound]["generatedTime"] = context.getVariable("system.timestamp") 
  cacheObj[accountNameFound]["tokenValidTillTime"] = cacheObj[accountNameFound]["generatedTime"]+ (context.getVariable("myVar.destination.resp.access_token_expiry")*1000)


  var str = JSON.stringify(cacheObj)
  context.setVariable("myVar.cacheString", str)

}

//massage token 
var finalToken = context.getVariable("myVar.destination.resp.finalToken")
context.setVariable("request.header.Authorization", "Bearer " + finalToken)