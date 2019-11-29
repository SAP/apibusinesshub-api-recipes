# Traffic Management using Quota


\| [Recipes by Topic](../api-recipes-by-usecase.md) \| [Recipes by Type](../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20Traffic-Mgmt-using-quota- ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20Traffic-Mgmt-using-quota- ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20Traffic-Mgmt-using-quota- ) \|


We can have many flavors of the quota policy. We can have a quota of x calls for a given time period (minute, hour, day, week, month) or we can have a quota of x calls for a time period per developer. We can have different message weight for POST calls versus GET calls.  

Click [here](https://help.hana.ondemand.com/apim_od/frameset.htm?1f742c1e1a5c4a21bd83994071ddaea0.html) to read more details on the Quota policies

## Download API Proxy samples

| Zip Name | Description        |
| ------------- |-------------|
| [SimpleQuota](./simplequota)      | API Proxy Zip Bundle showcasing the quota policy of 5 calls per 15 mins  |
| [SimpleQuotaPerDeveloper](./simplequotaperdeveloper)      | API Proxy Zip Bundle where in the quota policy of 5 calls per developer per 15 mins  |
| [QuotaWith429StatusCode](./quotawith429statuscode) | API Proxy Zip Bundle where in custom error message with status 429 status code is returned. This is as per the [RFC] (https://tools.ietf.org/html/rfc6585#page-3) |

## What is Quota?
In SAP HANA Cloud Platform, API management, we offer a wide variety of rate limiting policies which can be used to control the flow of the traffic from the Client to the SAP HANA Cloud Platform,API Management. These policies are quota, spike arrest, concurrent rate limit policies. In this document we show case how we can use the quota policy to configure the number of request messages that could be allowed by an API Proxy over a time period or interval such as minute, hours or day.
Quota policy consists of the following elements:-

| Element        | Description           | Example  |
| ------------- |-------------| -----|
| Allow     | This specifies the number of request allowed for the API Proxy. This can be set using the attribute count and countRef. In case both attributes are set then countRef has higher priority, i.e., if countRef is not resolved at runtime then count is used.| The possible ways to set it are as follows:- Allows 5 calls:- &lt;Allow count=”5”&gt; Allows the no of calls as set in the header &lt;Allow countRef=”request.header.count”&gt;|
| Interval     | The interval of time for which quota should be applied. The attribute ref can be used to specify a flow variable containing the interval for the quota. If both explicit interval and ref is specified then ref takes the priority. | The possible values ways to set it are as follows:- Interval of every 5 &lt;Interval&gt;5&lt;Interval&gt; Interval as set in the custom header &lt;Interval ref=”request.header.interval” /&gt;|
| TimeUnit     | Used to specify the time period on which quota would be applied. The possible values are minute,hour,day,week or month. The attribute ref can be used to specify a flow variable containing the timeunit for the quota. If both explicit interval and ref is specified then ref takes the priority. | The possible values ways to set it are as follows:- Interval of every 5 &lt;Interval&gt;5&lt;Interval&gt; Interval as set in the custom header &lt;Interval ref=”request.header.interval” /&gt;|
| Identifier     |The unique identifier for the quota, this can be used to set quota per developers. | Quota counter per developer apikey <Identifier ref=”verifyapikey.apikeyaccess.client_id”&gt;|
| MessageWeight | Used to specify the message weight for each calls. The default message weight is 1. The attribute ref can be used to specify a flow variable containing the message weight for the quota. If both explicit weight and ref is specified then ref takes the priority.|The possible ways to set it are as follows:- Messageweight of 2 for each message &lt;MessageWeight>2&lt;/MessageWeight> Message weight as set in the header &lt;MessageWeight ref=”request.header.weight” />|
