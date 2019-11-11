# SAP API Management Policy Template

SAP API Management **Policy Templates** provides the capability to reuse  policies. It is a collection of policies that can be applied to multiple API Proxies and shared to reduce time and effort.

Policy templates once imported are available in your API Management tenancy to consume. Policy templates can be applied along with their flows, essentially the sequence and point of invocation are replicated into the API Proxy. Policy template can also be copied where the business logic of the individual policy may be reuse but the flows and sequence of invocation can be customized by the developer.

To know more about the Policy Template, how to create, how to use etc, please go to [**SAP API Management Policy Templates**](https://help.hana.ondemand.com/apim_od/frameset.htm?c5d1872acd0746a0ab135fa6dbeef69f.html)

**How to use sample Policy Templates**

 * Sample Policy Template zips are available in respective policy template respository.
 * Download the zip files, launch API Management and go to the Policy Template tab present in Develop view.
 * Import downloaded Policy Template zips, once policy templates are imported, they are displayed in the Policy Templates tab

    ![alt text](./images/PolicyTemplate.png)


 * Now you want to apply the policy template on the API.
 * Open the API & go to Policy editor in edit-mode.

   ![alt text](./images/PolicyEditor_ApplyPolicyTemplate.png)

 * Click on the Policy Template & select Apply, list of availabe Policy Templates will be displayed.
 * Slect Policy template & click on Apply, polices present in the template are applied on the pre/post flow as defined.
 * You can also copy Policy template, here all polices will not be applied on the flows but copied in your API.
