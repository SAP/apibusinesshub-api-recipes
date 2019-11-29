# Traffic Management using Spike Arrest


\| [Recipes by Topic](../api-recipes-by-usecase.md) \| [Recipes by Type](../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20spike-arrest-api-proxy ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20spike-arrest-api-proxy ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20spike-arrest-api-proxy ) \|


Sample showcasing the throttling of the number of incoming request processed by the API proxy.

[Download API Proxy](SpikeArrest.zip)

## What is Spike Arrest?
In SAP HANA Cloud Platform, API management we offer the spike arrest which protects the target system against a sudden spike in the traffic. The spike arrest throttles the number of the incoming request processed by the API Proxy.
It is recommended to put this policy as the first policy in the API Proxy execution and attached to the PreFlow of the Proxy End Point flow.

This policy can be used with or without the quota policy. .
Typically the target server are built assuming a certain load that it can safely handle, While the quota policy allows x number of calls in time period, the spike arrest policy allows to smooth the traffic that to target server.


Quota policy consists of the following elements:-

| Element        | Description           | Example  |
| ------------- |-------------| -----|
| Identifier     |The unique identifier for the quota, this can be used to set quota per developers. | Spike Arrest counter per developer apikey &lt;Identifier ref=”verifyapikey.apikeyaccess.client_id”/&gt;|
| MessageWeight | Used to specify the message weight for each calls. The default message weight is 1. The attribute ref can be used to specify a flow variable containing the message weight for the spike arrest. If both explicit weight and ref is specified then ref takes the priority.|The possible ways to set it are as follows:- Messageweight of 2 for each message &lt;MessageWeight>2&lt;/MessageWeight> Message weight as set in the header &lt;MessageWeight ref=”request.header.weight” />|
| Rate     | Rate to which to limit the traffic spikes. It can specified as number of traffic calls per second or per minute  | Spike Arrest of 2 calls per minute &lt;Rate&gt;2pm&lt;/Rate&gt;  Spike Arrest of 2 calls per sec &lt;Rate&gt;2ps&lt;/Rate&gt;|

Click [here](https://help.hana.ondemand.com/apim_od/frameset.htm?bf441dc839034613b059cb508ad610f7.html) to view more details on the Spike Arrest policy.

## How to use the sample

* Click on [SpikeArrest.zip](./SpikeArrest.zip) and then click on the "View Raw" Link or "Download" button to download the sample.
* Import the Downloaded API Proxy zip into your SAP API management tenancy. Additional instruction for this is available in [link](https://help.hana.ondemand.com/apim_od/frameset.htm?9342a932441e45cd9636eb0a01a89958.html).
