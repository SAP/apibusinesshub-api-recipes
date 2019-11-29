# SAP API Management, connect to SAP Concur policy template

\| [Recipes by Topic](../../../api-recipes-by-usecase.md) \| [Recipes by Type](../../../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20concur-connectivity-policy-template ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20concur-connectivity-policy-template ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20concur-connectivity-policy-template ) \|


Concur Connectivity policy template facilitates easy consumption of Concur APIs protected by OAuth

[Download Policy Template](Concur_Connectivity.zip)

OAuth helps to secure APIs and this is one of the industry standard, for more info on OAuth, https://en.wikipedia.org/wiki/OAuth


**How to Use**

* Click on the Concur_Connectivity.zip file
* Now to download policy template, either hit the **Download** button or link **View Raw**
* To apply this Policy Template on your API Proxy, launch APIPortal (Policy Templates tab) & import.
* Now open API Proxy on which the policy template needs to be applied, go to policy editor in edit-mode
* Click on the **Policy Template**, select the imported Policy Template from the list & apply
* Enter the OAuth token generation url in the getOAuthtoken policy
* Enter the values for 'sapapim.clientId', 'sapapim.secret', sapapim.user and 'sapapim.pass' in the config.js file
