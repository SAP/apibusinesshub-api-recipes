# Basic Authentication

\| [Recipes by Topic](../../../api-recipes-by-usecase.md) \| [Recipes by Type](../../../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20basic-authentication-api-proxy ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20basic-authentication-api-proxy ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20basic-authentication-api-proxy ) \|

Basic authentication allows a HTTP agent to pass in user name and password while making a call. The user name and password is passed in the http header Authorization.

[Download API Proxy](BasicAuthentication.zip)

## About BasicAuth policy
The Authorization field is constructed as follows:-

1. The username and password are combined with a single colon.
2. The resulting string is encoded using the Base64.
3. The authorization method and a space i.e. "Basic " is then put before the encoded string.

The BasicAuthentication policy from the SAP HANA Cloud Platform, API Management can be used to generate the Basic authentication header values. This can be used in conjuction with the AssignMessage policy
to store in the user name and password in the local proxy context. There is not encryption of the variables done by the SAP API Management
and therefore this is important that this way of passing the hard coding credentials of the service user is mostly used during development
and testing.

The Basic Authentication policy contains the following elements:-

| Property Name        | Description           | Example  |
| ------------- |-------------| -----|
| Operation     | The operation element describes if the policy should be used to encode the user, pass or to decode the variable to generate user, pass from the basic authentication format | Encode to generate the basic authentication credential and Decode to decode the passed Basic authentication credential |
| User     | In case of Encode operation, references the elements containing the user name and for Decode operation, references the elements where the user information should be stored  | &lt;User ref='request.queryname.user'&gt; |
| Password     | In case of Encode operation, references the elements containing the Password and for Decode operation, references the elements where the password information should be stored  | &lt;Password ref='request.queryname.pass'&gt; |
| AssignTo     | In case of Encode operation, references the elements where the generated Basic Authentication credentials should be stored  | &lt;AssignTo createNew='false'&gt;request.header.Authorization&lt;AssignTo&gt; |
| Source     | In case of Decode operation, references the elements from where the Basic Authentication information should be read  | &lt;Source&gt;request.header.Authorization&lt;Source&gt; |

Click [here](https://help.hana.ondemand.com/apim_od/frameset.htm?693c0d1720644d57918ed77acc6a95ef.html) for more information on the Basic Authentication Policy

## How to use the sample

* Click on [BasicAuthentication.zip](./BasicAuthentication.zip) and then click on the "View Raw" Link or "Download" button to download the sample.
* Import the Downloaded API Proxy zip into your SAP API management tenancy. Additional instruction for this is available in [link](https://help.hana.ondemand.com/apim_od/frameset.htm?9342a932441e45cd9636eb0a01a89958.html).
* Open the new imported API Proxy and then edit the assignuserdetails policy to pass in the service user name and password to be used for connecting to the target system.
