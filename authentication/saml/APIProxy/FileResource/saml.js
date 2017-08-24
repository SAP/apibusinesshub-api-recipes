/*
This method will extract the form element from the response body
*/
function getFormRequest(data) {
    var startIndex = data.indexOf("<form");
    var endIndex = data.indexOf("</form>");
    
    return data.substring(startIndex, endIndex + 7);
}

/*
This method will get the action url from the form element
*/
function getFormUrl(xml) {
    return String(xml.@action);
}

/*
This method will create the form request by looping through the input parameters
and then encoding the name and the value and later joining the form parameters with &
*/
function createFormRequest(data) {
    var req = [];
    for (var i = 0, length = data.length; i < length; i++) {
        req.push(encodeURIComponent(data[i].name) + "=" + encodeURIComponent(data[i].value));
    }
    return req.join("&");
}

/*
This method will read the input parameters from the response to be send to the IDP
*/
function getInputData(xml) {
    var req = [];
    for (var i = 0, length = xml.input.length(); i < length; i++) {
        var input = xml.input[i];
        if (input.@type == "hidden") {
            req.push({ name: input.@name, value: input.@value });
        }
    
    }
    return req;
}

/*
This method will use the regex pattern to get the input parameters from the form element
Sometimes the SAP IDP retunrs invalid xml element and therefore asxml featur couldn't be used
instead we use the regex approach.
*/
function getInputDataFromStr(data) {
    var res = data.match(/type="hidden" name="(.*?)" value="(.*?)"/g);
    var req = [];
    for (var i = 0, length = res.length; i < length; i++) {
        var input = res[i];
        var inputName = input.match(/name="(.*?)"/g)[0].replace("name=", "").split('"').join('');;
        var inputValue = input.match(/value="(.*?)"/g)[0].replace("value=", "").split('"').join('');;
        req.push({ name: inputName, value: inputValue });
    }
                
                res = data.match(/name='(.*?)' type='hidden' value='(.*?)'/g);
    if (res) {
        for (var i = 0, length = res.length; i < length; i++) {
            var input = res[i];
            var inputName = input.match(/name='(.*?)'/g)[0].replace("name=", "").split("'").join('');
            var inputValue = input.match(/value='(.*?)'/g)[0].replace("value=", "").split("'").join('');;
            req.push({ name: inputName, value: inputValue });
        }
    }

    return req;
}

/*
This method will add the credentials to the form request
*/
function addCredentialToForm(req) {
    var cred = getCredential();
    var requestAsJSON = JSON.stringify(req);
    req.push({ name: "j_username", value: cred.user });
    req.push({ name: "j_password", value: cred.password });
    return req;
}

/*
This method will return the target url to which the connectivity is requested
*/
function getTargetUrl() {
    return context.getVariable("target.url");
}

function getAllCookies(res) {
    var cookies = [];
    var i = 0;
    while (res.headers['set-cookie'][i]) {
        cookies.push(res.headers['set-cookie'][i]);
        i++;
    }
                while (res.headers['Set-Cookie'][i]) {
        cookies.push(res.headers['Set-Cookie'][i]);
        i++;
    }
    return cookies.join("; ");
}

var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  'Upgrade-Insecure-Requests' : 1
};

var cookie = null;

/*
This method will call the resource provider to trigger the saml flow, 
the resource provider is the same as the target url. This request would be 
redirected to Identity provider. The cookie from the response of this calls is required
so that it can be presented while connecting to the ACS.
*/
function callServiceProvider() {
    var url = getTargetUrl();
    print("Calling the Target Server for SAML " + url);
    var req = new Request(url, 'GET');
    var res = httpClient.send(req);
    res.waitForComplete();
    
    if (res.isSuccess()) {
        var responseObj = res.getResponse().content;
               //print("Target Response " + responseObj);
        var payload = createFormRequest(getInputDataFromStr(getFormRequest(responseObj)));
        cookie = res.getResponse().headers['set-cookie'];
        //print("Cookies from the sever " + cookie);
        callIDP(getIDPUrl(), payload);
       
    }
}

/*
This method will invoke the Identity provider without any authentication call.In the subsquent
call, in the form data the authentication details are passed
*/
function callIDP(url, payload) {
    print("Calling the IDP " + url);
    
    var req = new Request(url, 'POST', headers, payload);
    var res = httpClient.send(req);
  
    res.waitForComplete();
    
    if (res.isSuccess()) {
        var responseObj = res.getResponse().content;
               //print("Response from IDP " + responseObj);
        var idpCookie = getAllCookies(res.getResponse());
        var formPayLoad = "utf8=%E2%9C%93&" + createFormRequest(addCredentialToForm(getInputDataFromStr(getFormRequest(responseObj))));
        //print("The input request is " + formPayLoad);
        authenticateToIDP(url, formPayLoad, idpCookie);
    }
}

/*
This method will trigger the authentication call to the identity provider. In the HCP, we are cuurently
using the form based authentication to authenticate to the idp. This would return the SAMLResponse and would be redirected
to the SAML ACS endpoint, which is the same as the targeturl.
*/
function authenticateToIDP(url, payload, idpCookies) {
    
    print("Authenticating to IDP with Form Auth " + url);
    var idpHeaders = {
                'Content-Type': 'application/x-www-form-urlencoded',
         'Cookie' : idpCookies
                };
    var req = new Request(url, 'POST', idpHeaders, payload);
    var res = httpClient.send(req);
    
    res.waitForComplete();
    if (res.isSuccess()) {
        print("Authenticating is success " + res.status);
        var responseObj = res.getResponse().content;
        var payload = createFormRequest(getInputDataFromStr(getFormRequest(responseObj)));
        callSAMLACS(getTargetUrl(), payload);
    }
   
}

/*
This is the call the SAML ACS provider, which is the same the target url. To this call, the cookie received while making the
1st call to the target server has to be provided. In this case, the call would be redirected back to the target server itself
with the SAML session cookies. This cookies can be used in the subsequent calls to directly connect to the target server
endpoint. The cookies can be used till the time the token expires.
*/
function callSAMLACS(url, payload) {
    print("Calling ACS Provider " + url);
    
    headers.Cookie = cookie;
    
    var req = new Request(url, 'POST', headers, payload);
    var res = httpClient.send(req);
    
    res.waitForComplete();
    
    var status = res.getResponse().status;
    
    print("The target response status " + status + " and response i " + res.getResponse().content);
    
    //print("Cookies response " + getAllCookies(res.getResponse()) );
    context.targetRequest.headers["Cookie"] = getAllCookies(res.getResponse());
   
}


callServiceProvider();
