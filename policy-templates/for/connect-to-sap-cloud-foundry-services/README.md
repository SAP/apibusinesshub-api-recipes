# SAP API Management, Connect to SAP Cloud Foundry services Policy Template 

Policy Templates helps to manage mircoservices running in cloud foundry using SAP Cloud Platform API Management

  * **SAP Cloud Foundry SAML2OAuth Flow**<Enter> 
 
      OAuth SAML Assertion Bearer Flow for SAP Cloud Foundry Microservices via SAP Cloud Platform API Management

  * **SAP Cloud Foundry XSUAA JWTToken**<Enter>
 
       Assists to manage microservice on Cloud Foundry protected by XS-UAA service using SAP Cloud Platform API Management

**How to Use SAP Cloud Foundry SAML2OAuth Flow**

Note: We assume that all prerequisite required to use SAP Cloud Platform API Management in Cloud Foundry is performed, else refer the blog mentioned below

* Click on **SAPCloudFoundrySAML2OAuthFlow.zip**
* To download policy template, either hit the **Download** button or link **View Raw**
* To apply this Policy Template on your API Proxy, launch APIPortal (Policy Templates tab) & import policy template
* Now open API Proxy(corresponding to the Cloud Foundry application) on which the policy template needs to be applied, go to policy editor in edit-mode
* Click on the **Policy Template**, select the imported Policy Template from the list & apply
* Once the 'CloudFoundrySAML2OAuthFlow' policy template is applied, you need to update the values as below: 
    
    In the samlHelper.js file,enter values for the following:
  
      sapapim.issuer : Value of identity Provided Name on SAP Cloud Foundry Account
      
      sapapim.audience : Service Provider name of the SAP Cloud Foundry tenant UAA, value of 'entityID' from downloaded UAA SAML tenant metadata
      
      sapapim.recipient : Value of entity 'AssertionConsumerService'(url with oauth/token/alias..) from the downloaded UAA SAML tenant metadata
      
      sapapim.username : User name used to login to microservice.
      
      sapapim.storename : Certificate Key store name created in the API Management certificate tab
      
      sapapim.keyname : Certificate Key name created in the API Management certificate tab
      
      sapapim.clientId : Value is in the XSUAA binding to your cloud foundry application

      sapapim.secret : Value is in the XSUAA binding to your cloud foundry application

* In the policy getOAuthToken enter 'HTTPTargetConnection URL', value is same as of 'sapapim.recipient'
* Now test the API, this should give desired result



**How to Use SAP Cloud Foundry XSUAA JWTToken**

Note: We assume that all prerequisite required to use SAP Cloud Platform API Management in Cloud Foundry is performed, else refer the blog mentioned below

* Click on **SAPCloudFoundryXSUAAJWTToken.zip**
* To download policy template, either hit the **Download** button or link **View Raw**
* To apply this Policy Template on your API Proxy, launch APIPortal (Policy Templates tab) & import policy template
* Now open API Proxy(corresponding to the Cloud Foundry application) on which the policy template needs to be applied, go to policy editor in edit-mode
* Click on the **Policy Template**, select the imported Policy Template from the list & apply
* Once the 'CloudFoundryXSUAAJWTToken' policy template is applied, you need to update the values as below:
 
      Enter the OAuth token generation url in the getOAuthtoken policy, this url is in the XSUAA binding to your cloud foundry  application<Enter>
 
      Enter the values for 'sapapim.clientId' and 'sapapim.secret' in the Config.js file, check XSUAA binding to your cloud foundry application
    
* Now test the API in the API Management test console.
   
* Now test the API, this should give desired result

For more information please refer:<Enter>

[API Management Service in SAP Cloud Foundry](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/b22df927b1374ff88d062f4dc1d84952.html)

[Blog on SAP API Management Cloud Foundry](https://blogs.sap.com/2017/11/13/manage-your-apis-developed-in-cloud-foundry-using-api-management)

[Developing APIs/Microservices in Cloud Foundry and Managing through API Management](https://blogs.sap.com/2018/01/03/developing-apismicroservices-in-cloud-foundry-and-managing-through-api-management/)
