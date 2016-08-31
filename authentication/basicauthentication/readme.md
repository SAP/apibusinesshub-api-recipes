#Basic Authentication

Basic authentications allows a HTTP agent to pass in user name and password while making a call. The user name and password is passed in the http header Authorization

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
| ------------- |:-------------:| -----:|
| Operation     | The operation element describes if the policy should be used to encode the user, pass or to decode the variable to generate user, pass from the basic authentication format | Encode to generate the basic authentication credential and Decode to decode the passed Basic authentication credential |
| User     | In case of Encode operation, references the elements containing the user name and for Decode operation, references the elements where the user information should be stored  | &lt;User ref='request.queryname.user'&gt; |
| Password     | In case of Encode operation, references the elements containing the Password and for Decode operation, references the elements where the password information should be stored  | &lt;Password ref='request.queryname.pass'&gt; |
| AssignTo     | In case of Encode operation, references the elements where the generated Basic Authentication credentials should be stored  | &lt;AssignTo createNew='false'&gt;request.header.Authorization&lt;AssignTo&gt; |
| Source     | In case of Decode operation, references the elements from where the Basic Authentication information should be read  | &lt;Source&gt;request.header.Authorization&lt;Source&gt; |

Click [here](https://help.hana.ondemand.com/apim_od/frameset.htm?693c0d1720644d57918ed77acc6a95ef.html) for more information on the Basic Authentication Policy

## API Proxy Examples

| Folder Name | Description        |
| ------------- |:-------------:| 
| BasicAuthentication      | API Proxy Zip Bundle where in the service user credential to be used to connect to the target server can be passed via the policy named assignuserdetails and setcredential. Edit the assignuserdetails policy to pass in the service user name and password to be used for the connection  |
