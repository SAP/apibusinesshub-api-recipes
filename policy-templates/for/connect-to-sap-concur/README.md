# SAP API Management, connect to SAP Concur policy template


**Concur_Connectivity** Policy Template facilitates easy consumption of Concur APIs protected by OAuth

OAuth helps to secure APIs and this is one of the industry standard, for more info on OAuth, https://en.wikipedia.org/wiki/OAuth


**How to Use**

* Click on the Concur_Connectivity.zip file
* Now to download policy template, either hit the **Download** button or link **View Raw**
* To apply this Policy Template on your API Proxy, launch APIPortal (Policy Templates tab) & import.
* Now open API Proxy on which the policy template needs to be applied, go to policy editor in edit-mode
* Click on the **Policy Template**, select the imported Policy Template from the list & apply
* Enter the OAuth token generation url in the getOAuthtoken policy
* Enter the values for 'sapapim.clientId', 'sapapim.secret', sapapim.user and 'sapapim.pass' in the config.js file
