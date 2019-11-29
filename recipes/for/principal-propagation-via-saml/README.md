# SAP API Management, Principal propagation via SAML Policy Template

\| [Recipes by Topic](../../../api-recipes-by-usecase.md) \| [Recipes by Type](../../../api-recipes-by-type.md) \| [Request Enhancement](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,enhancement&template=recipe-request.md&title=Improve%20principal-propogation-via-saml-policy-template ) \| [Report a bug](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,bug&template=bug_report.md&title=Issue%20with%20principal-propogation-via-saml-policy-template ) \| [Fix documentation](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Fix,documentation&template=bug_report.md&title=Docu%20fix%20principal-propogation-via-saml-policy-template ) \|



Principal Propagation via SAML policy template enables SAML User propagation from the application to back-end system via SAP API Management.

[Download Policy Template](Principal_Propagation_via_SAML.zip)

This policy template helps in user propagation from App to API Management and then to Backend system.

## How to use Principal Propogation policy template?
* Download policy template, either hit the **Download** button or link **View Raw**
* Open the API Proxy ( which connects to an On-prem SAP backend API) and apply copied Principal_Propagation_via_SAML template
* Modify the script files as described here:

    	Keyinfo.js : PROVIDE SAML ROOT Certificate details from the SAP Cloud Platform account
    	SAMLHelper.js : update the following parameters
    	sapapim.issuer -- Identity Provider Name given to the SAP API Gateway(default value: apimgmt.api.gateway )
    	sapapim.audience -- SAML service provider name of the SAML 2.0 configuration on the SAP Backend(default value: GatewayS)
    	sapapim.recipient -- API Proxy target Url including the API Provider host and port
    	sapapim.username -- In the initial flow, this is the value of the user( which is already mapped to the backend ).

In the current flow this value is the variable 'saml.subject' which is provided by SAML assertion as per the value recieved by fiori   app(default value : context.getVariable("saml.subject")

	sapapim.storename -- Store name set in the API Management when uploading the certificate
    	sapapim.keyname -- Key name set in the API Management when uploading the certificate

To use this policy template, we assume all necessary configurations are completed:
  * This includes configurations in SAP API Management API Portal
	Configuration in the SAP Back-end system.
  * If back-end system is On-prem then Cloud connector configuration etc.

## References
* [Single sign on from Fiori Application to SAP Gateway via SAP Cloud Platform API Management
Part-1](https://blogs.sap.com/2018/01/19/part-1-single-sign-on-from-fiori-application-to-sap-gateway-via-sap-cloud-platform-api-management)
* [Single sign on from Fiori Application to SAP Gateway via SAP Cloud Platform API Management
Part-2](https://blogs.sap.com/2018/01/19/part-2-single-sign-on-from-fiori-application-to-sap-gateway-via-sap-cloud-platform-api-management/)
* [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Languagey)
