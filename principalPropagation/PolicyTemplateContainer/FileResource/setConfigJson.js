var configObj = {
  "enableDebug": false,
  "invalidateCache": false,
  "accounts": {
    "dummyname": {
      "issuer": "<sample>",
      "publicKey": "<sample>",
      "destinationName": "<sample>",
      "destinationUri": "<sample>",
      "destinationAuthEndpoint": "<sample>",
      "destinationClientId": "<sample>",
      "destinationClientSecret": "<sample>"
    }
  }
}

context.setVariable("myVar.incoming.loginToken", request.headers.Authorization)
context.setVariable("myVar.debug.enable", configObj["enableDebug"])

//check if the issuer of the incoming token is found in the configObj above
var eachAccountObj, issuerExpected, accountNameFound = null

for (var accountName in configObj["accounts"]) {
  eachAccountObj = configObj["accounts"][accountName]
  issuerExpected = eachAccountObj["issuer"]
  if (issuerExpected !== context.getVariable("jwt.dcodejwt.claim.issuer")) {
    continue
  }
  //issuer is found, set details for future validations
  accountNameFound = accountName
  print("Account Name found:" + accountNameFound)
  context.setVariable("myVar.accountNameFound", accountNameFound)
  context.setVariable("myVar.jwt.issuer", issuerExpected)
  context.setVariable("myVar.jwt.publicKey", eachAccountObj["publicKey"])
  context.setVariable("myVar.destination.clientId", eachAccountObj["destinationClientId"])
  context.setVariable("myVar.destination.clientSecret", eachAccountObj["destinationClientSecret"])
  context.setVariable("myVar.destination.authEndpoint", eachAccountObj["destinationAuthEndpoint"])
  context.setVariable("myVar.destination.uri", eachAccountObj["destinationUri"])
  context.setVariable("myVar.destination.name", eachAccountObj["destinationName"])

  //validate any custom claims if any provided in the config
  break;
}


/*
Expected cache payload
{
  "usa": {
    "destToken": "","generatedTime":123123,"tokenValidTillTime": 321
  }
}
*/

if (accountNameFound != null) {

  //transform cacheString to cacheObj
  var cacheObj = {},
    doQueryForFreshToken = "y"
  var cacheString = context.getVariable("myVar.cacheResponseString")

  if ((cacheString === null) || (cacheString === undefined) || (cacheString === "") || (configObj["invalidateCache"] === true)) {
    doQueryForFreshToken = "y"

  } else {
    cacheObj = JSON.parse(cacheString)
    if (accountNameFound in cacheObj) {
      //check if the token is still valid
      if (cacheObj[accountNameFound]["tokenValidTillTime"] > context.getVariable("system.timestamp")) {
        doQueryForFreshToken = "n"
        context.setVariable("myVar.destination.resp.access_token", cacheObj[accountNameFound]["destToken"])
      }
    }
  }

  context.setVariable("myVar.destination.doQueryForFreshToken", doQueryForFreshToken)
}
