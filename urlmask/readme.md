# URL Masking


\| [Recipes by Topic](../api-recipes-by-usecase.md) \| [Recipes by Type](../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20url-masking-api-proxy ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20url-masking-api-proxy ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20url-masking-api-proxy ) \|


Sample showcasing the masking/rewriting of the target system host, basepath and replacing it with the proxy endpoint host and base path.

[Download API Proxy](./URLMask.zip)

## What is URL Masking?
Url masking means hiding the actual target server domain with SAP HANA Cloud Platform, API management runtime APIProxy domain. There are many ways in which it can be achieved. In this scenario we are taking a simple [JavaScript](https://help.hana.ondemand.com/apim_od/frameset.htm?5b63ed7782ab4b4ea96bf84119059039.html) based approach to replace all the target host references with the APIProxy reference. This would work well for simple APIProxies (esp in case the response data is not huge) created with target Url instead of being linked to the API Provider.
In this example we will also handle the masking of the target base path with the proxy base path. The base path is the URI fragment that follows the host in the URL as specified during the proxy creation and for the target endpoint, the target endpoint base path is the base path of the target url as specified during the proxy creation.

## How to use the sample

* Click on [URLMask.zip](./URLMask.zip) and then click on the "View Raw" Link or "Download" button to download the sample.
* Import the Downloaded API Proxy zip into your SAP API management tenancy. Additional instruction for this is available in [link](https://help.hana.ondemand.com/apim_od/frameset.htm?9342a932441e45cd9636eb0a01a89958.html).
