# SAP API Management, debugging and traceability policy template 


**Performance_Traceability** Policy Template assists in API Proxy Execution Performance assessment


**How to Use**

* Click on the Performance_Traceability.zip file
* Now to download policy template, either hit the **Download** button or link **View Raw**
* To apply this Policy Template on your API Proxy, launch APIPortal (Policy Templates tab) & import.
* Now open API Proxy on which the policy template needs to be applied, go to policy editor in edit-mode
* Click on the **Policy Template**, select the imported Policy Template from the list & apply
* Now, Start Debug and access the API Proxy to get performance data
* Following parameters can be found in the policy as variables which will give details of the API Proxy performance

**proxy_request_receiving_latency**: Time request has taken to reach proxy end point
    
    This variable value can be found in the policy 'proxy_request_receiving_latency'

**Proxyonlyprocessingtime**: Time taken by proxy end point to work on the request.

      This vairable value can be found in the policy 'proxy_processing_time'

**target_receiving_request_latency**: Time request has taken to reach target end point, this is latency value does not include proxy processing time.
    
    This variable value can be found in the policy 'targetreceivinglatency'

**targetprocessingtime**: Time taken by target end point(backend system) to work on the request
    
    This variable value can be found in the policy 'target_processing_time'

**proxy__receiving_response_latency**: Time response has taken to reach proxy end point, this is latency value does not include target processing time.
    
    This variable value can be found in the policy 'targetreceivinglatency'

**ProxyincludingTargetprocessingtime** : Time taken by proxy and target end point to work on the request
    
    This variable value can be found in the policy 'proxy_processing_time'


For more information on [Debug API](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/fb2c7aa34cdc443294a325ccb7876785.html)
