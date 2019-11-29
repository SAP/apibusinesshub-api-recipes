# SAP API Management, debugging and traceability policy template

\| [Recipes by Topic](../../../api-recipes-by-usecase.md) \| [Recipes by Type](../../../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20performace-traceability-policy-template ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20performace-traceability-policy-template ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20performace-traceability-policy-template ) \|

Performance Traceability policy template assists in API Proxy execution performance assessment.

[Download Policy Template](Performance_Traceability.zip)

Learn more about [Debug API](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/fb2c7aa34cdc443294a325ccb7876785.html)

| KPI tracked | by variable | in Policy|
| --- | ---| ---|
|Time request has taken to reach proxy end point | proxy_request_receiving_latency|  proxy_request_receiving_latency |
| Time taken by proxy end point to work on the request| Proxyonlyprocessingtime|proxy_processing_time |
|Time request has taken to reach target end point, this is latency value does not include proxy processing time |target_receiving_request_latency |targetreceivinglatency |
| Time taken by target end point(backend system) to work on the request| targetprocessingtime|target_processing_time |
| Time response has taken to reach proxy end point, this is latency value does not include target processing time| proxy_receiving_response_latency|targetreceivinglatency |
| Time taken by proxy and target end point to work on the request| ProxyincludingTargetprocessingtime|proxy_processing_time |

[How to consume policy templates?](../../readme.md)
