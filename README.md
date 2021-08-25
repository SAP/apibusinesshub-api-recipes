# Welcome to SAP API Business Hub Community for API Recipes

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/apibusinesshub-api-recipes)](https://api.reuse.software/info/github.com/SAP/apibusinesshub-api-recipes)

\| [Browse by Topic](./api-recipes-by-usecase.md) \| [Browse by Type](./api-recipes-by-type.md) \| [Request a Recipe](https://github.com/SAP/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Request&template=recipe-request.md&title=How+to++) \| [Report a broken link](https://github.com/SAP/apibusinesshub-api-recipes/issues/new?assignees=&labels=documentation&template=bug_report.md&title=Broken%20Link) \|

[**SAP API Management**](https://www.sap.com/products/cloud-platform/capabilities/integration.api-management.html) provides enterprises a comprehensive solution to address all API needs, with features such as API provisioning and publishing, API discovery and consumption, security and access control, analytics and reporting, monitoring and operations and developer portal, [learn more](https://help.sap.com/viewer/product/SAP_CLOUD_PLATFORM_API_MANAGEMENT/Cloud/en-US).  

This repository provides samples of API proxies, policy templates and applications, showcasing the capabilities of *SAP API Management* to deliver APIs protected by state-of-the-art authentication mechanisms and security policies (API Keys, basic authentication, SAML tokens, SQL threat protection) to effectively secure access to your data and services and protecting them for consumption in the cloud using quotas, spike arrests and URL rewriting.

The graphical user interface of API Management is itself API-based, permitting extensions and customizations. A sample is given in the [*cloudportaltemplate*](./cloudportaltemplate) sub folder.

### What is an API Proxy?
An *API Proxy* is a representation of a HTTP-based service that abstracts the actual proxy endpoint properties on one end and the actual target endpoint (the endpoint that is relevant for the end user to invoke) on the other end. Additionally it includes properties that describe the policies that can be invoked on the API, [learn more](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/8962643388fc4df6b7a165baa14475d9.html).\
 *Policies* define a set of rules (such as enforcing security and controlling traffic) that is applied on the API, [learn more](https://help.hana.ondemand.com/apim_od/frameset.htm?7e4f3e590f164996994cddc8e48bf7f5.html)

### What is a Policy Template?
A Policy Template is the best way to apply the same sequence of policies to multiple API Proxies. The policy templates can be shared and reused, [learn more](https://blogs.sap.com/2017/08/28/policy-management-made-easy-with-templates-in-sap-api-management/).  

## Before Starting

* Sign up [here](https://hcp.sap.com/try.html) for a free trial of *SAP Cloud Platform*.

* Instructions for sign up [here](http://scn.sap.com/community/api-management/blog/2016/02/02/free-trial-of-sap-api-management-on-hana-cloud-platform-is-available-now) for a free trial of *SAP API Management*.

* Refer to the [blog](http://scn.sap.com/docs/-71207) for an Overview of *SAP API Management*

## How to consume the recipes?
Please refer to the help documentation to [import an API Proxy](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/9342a932441e45cd9636eb0a01a89958.html)

Refer to this blog on  [how to consume policy templates](https://blogs.sap.com/2017/03/08/sap-api-management-simplify-your-life-with-policy-templates/). You can also refer to the following help documents:
* [Import a policy template](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/52263adfe7d9407bbc55eb57594e6500.html)
* [Apply a policy template](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/269442f98bc343eb8d4deb09f87a0680.html)

## Available recipes
* [Browse by topic](api-recipes-by-usecase.md)
* [Browse by type](api-recipes-by-type.md)

## How to obtain support?
* [Request a Recipe](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=Recipe%20Request&template=recipe-request.md&title=How+to++)
* [Report a broken link](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new?assignees=&labels=documentation&template=bug_report.md&title=Broken%20Link)
* [Create any other type of issue on this repository](https://github.com/SAP-samples/apibusinesshub-api-recipes/issues/new).

## Contributing
Contribute to this repository with reusable content or samples. Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Licensing
Copyright 2016-2021 SAP SE or an SAP affiliate company and apibusinesshub-api-recipes contributors. Please see our [LICENSE](LICENSE) for copyright and license information. Detailed information including third-party components and their licensing/copyright information is available [via the REUSE tool](https://api.reuse.software/info/github.com/SAP/apibusinesshub-api-recipes).
