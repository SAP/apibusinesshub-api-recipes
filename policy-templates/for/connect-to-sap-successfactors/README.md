# SAP API Management, Connect to SAP SuccessFactors Policy Template 


**SuccessFactors_OAuth2SAMLAssertion** Policy Template facilitates easy consumption of SAP SuccessFactors APIs protected by OAuth

As SAP SuccessFactors APIs are protected by OAuth, each time you access the API you need to provide an OAuth token. This policy template facilitates easy access by generating the OAuth token, thereby reducing your effort.


**How to Use**

* Click on the **SuccessFactors_OAuth2SAMLAssertion.zip** file
* Now to download policy template, either hit the **Download** button or link **View Raw**
* To apply this Policy Template on your API Proxy, launch APIPortal (Policy Templates tab) & import.
* Now open API Proxy on which the policy template needs to be applied, go to policy editor in edit-mode
* Click on the **Policy Template**, select the imported Policy Template from the list & apply
* Enter values for the following variables(in the config.js file):
 
     'sapapim.sf.user_id', 'sapapim.sf.client_id', 'sapapim.sf.company_id', 'sapapim.sf.token_url' and 'sapapim.sf.private_key' 
 <Enter>

* Enter SuccessFactors OAuth token generation url in the 'getOAuthAccessToken' policy
* Enter SuccessFactors OAuth idp url in the 'getSAMLAssertion' policy

For more information  refer blog [SuccessFactors OAuth](https://blogs.sap.com/2017/03/05/how-to-initiate-an-oauth-connection-to-successfactors-employee-central/)
