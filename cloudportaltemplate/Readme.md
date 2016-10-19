## Cloud Portal Template for SAP HANA Cloud Platform, API management

The Cloud Portal Template is a reference template which demonstrates how to create a custom-branded API developer portal in SAP HCP, portal services that supports and engages application developers using API products developed in SAP HCP, API Management. 

Companies can customize the API Developer Portal using this template within the SAP HCP, portal services. Developers can also consume services like the SAP Web IDE and SAP Jam service (planned for next template release) offered by SAP HANA Cloud Platform. The template composes of custom widgets built on the SAPUI5 framework using SAP Web IDE, providing SAP Fiori user experience. 

### Components
The template comprises of 3 Fiori applications as follows:
  1. API Product catalog, API Proxy details and its documentation
  2. Allow subscription to API Product
  3. Manage Subscriptions

### Get the Source Code
Download the sample website instance [**CPT-API.mtar**](https://github.com/SAP/cloud-api-management-samples/blob/master/cloudportaltemplate/CPT-API.mtar) and follow the instructions below.

## Quick start guide
#### Pre-requisites

* Sign up [here](https://hcp.sap.com/try.html) for a free trial of *SAP HANA Cloud Platform*.
* Sign up [here](https://blogs.sap.com/2016/02/02/free-trial-of-sap-api-management-on-hana-cloud-platform-is-available-now/) for a free trial of *SAP HANA Cloud Platform, API management*.
* Refer to the [blog] (https://blogs.sap.com/2016/03/03/sap-api-management-overview-getting-started/) for an Overview of *SAP HANA Cloud Platform, API management*.

## Deployment Instructions

### 1. Importing the Cloud Portal Template
1. Download the **CPT-API.mtar** file to your local filesystem
2. Open the SAP HANA Cloud Platform, Portal Service.
3. Navigate to "**Site Directory**"> "**Import Site**" and import the downloaded .mtar file.
4. When the import completes, "**INT 103 Demo**" appears in Site Directory

### 2. Importing the widget code into SAP Web IDE
1. Open the SAP Web IDE service workspace
2. Right click on **Workspace**
3. From the popup menu select "**Import**"> "**Application from SAP HANA Cloud Platform**" for "**devportalsitetemp**"
4. Repeat step 3 for "**apimngmnt1**", "**apimngmnt2**", "**apimngmnt3**".

### 3. Configuring Roles and Destinations
1. Navigate to the SAP HANA Cloud Platform Cockpit
2. Select "**Connectivity**" > "**Destinations**"
3. Create a destination as follows:

---
    *Name:          apimgmtdevportal
    Type:           HTTP
    Description:    APIMNGMNT
    *URL:           <see below *>
    Proxy Type:     Internet
    Authentication: AppToAppSSO
    Additional Properties
        WebIDEEnabled       true
        WebIDEUsage         api_mgmt_catalog
        [x] Use default JDK truststore
    

---

```
* -- To fill in the URL field, open the SAP HCP cockpit in a new tab and select "Services". 
Click on the tile for "SAP API Management Trial". 
Click on "Service Configuration"> "SAP API Management API Portal (Roles & Destinations)". 
Select *Destinations* from the left side menu and locate the destination "DEST_CI". 
Copy the subdomain and domain name (i.e. the substring starting at 'https:' and ending at '.com') segment 
of the URL for "DEST_CI". 
Return to the cockpit destinations tab and paste the copied substring.
```

---

### 4. Deploying an instance of the Cloud Portal Template on SAP HANA Cloud Platform
1. Navigate to SAP HANA Cloud Platform, Portal Service, select "**Site Directory**"
2. Click on the tile menu for "**INT 103 Demo**" and select "**Publish**"

## Instructional Video

 Click [here](http://www.youtube.com/watch?feature=player_embedded&v=3gala3XQAvY) to watch how to use the Cloud Portal Template.
 
## Important Disclaimers on Security and Legal Aspects
This document is for informational purposes only. Its content is subject to change without notice, and SAP does not warrant that it is error-free. SAP MAKES NO WARRANTIES, EXPRESS OR IMPLIED, OR OF MERCHANTABILITY, OR FITNESS FOR A PARTICULAR PURPOSE.

## Coding Samples
Any software coding and/or code lines / strings ("Code") included in this documentation are only examples and are not intended to be used in a productive system environment. The Code is only intended to better explain and visualize the syntax and phrasing rules of certain coding. SAP does not warrant the correctness and completeness of the Code given herein, and SAP shall not be liable for errors or damages caused by the usage of the Code, unless damages were caused by SAP intentionally or by SAP's gross negligence.

## Copyright and License
Copyright 2016 SAP SE

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
