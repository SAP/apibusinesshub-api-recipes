
<p align="center">
  <h1 align="center">Principal Propagation with SAP API Management</h1>
  <p align="center">
    This documentation depicts the use cases and step by step configuration for Principal Propagation on SAP API Management on Cloud Foundry . 
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#prerequisites">Pre-requisites</a>
    </li>
    <li>
      <a href="#getting-started">Setup & Configuration</a>
      <ul>
        <li><a href="#prerequisites">Same CF Subaccount</a></li>
        <li><a href="#installation">Different CF Subaccount</a></li>
        <li><a href="#installation">Subaccount on NEO</a></li>
        <li><a href="#installation">External Accounts: Azure Active Directory</a></li>
      </ul>
    </li>
     <li>
      <a href="#consumption">Consumption</a>
        <ul>
        <li><a href="#installation">Postman Collection</a></li>
        <li><a href="#prerequisites">CF Apps</a></li>
        <li><a href="#installation">UI5 Application</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT -->
## About

* [Overview of Principal Propagation ](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/e2cbb48def4342048362039cc157b12e.html)
* This documentation depicts the step-by-step configurations required to setup Principal Propagation for the following scenarios within the Cloud Foundry capability SAP API Management under the SAP Integration Suite in SAP BTP Platform.
* The Configurations of the Cloud Connector and the backend systems are left out of scope.
* The Configurations of SAP API Management applies to Prod,Canary,Trial landscape,this document only depicts the Trial setups. The configurations remain which same for other landscapes. 


<!-- GETTING STARTED -->
## Pre-requisites

1. [Activate your Trial Account](https://developers.sap.com/tutorials/hcp-create-trial-account.html)
2. Create Two sub-accounts within the Trial Global account
  a. Sub-account name: **red** , Sub-domain name : red , Region of choice </br>
  ![Blue sub-account creation](./images/blue_creation.png)
  b. Sub-account name: **blue** , Sub-domain name : blue, Region of choice </br>
  ![Red sub-account creation](./images/red_creation.png)

3. In sub-account:**blue** enable the Integration Suite and add SAP API Management cabaility by [Setup Integration Suite Trial](https://developers.sap.com/tutorials/cp-starter-isuite-onboard-subscribe.html)
4. Enable Cloud Foundry in both sub-accounts </br>
5. In sub-account:**blue** </br>
  a. Click on Entitlements-> Configure Entitlements -> Add Service Plans-> API Management, API Portal , enable **on-premise connectivity and apiportal-apiaccess** and save </br>
    ![Entitlement](./images/entitle_apim_plans.png)
  b. Enable Service Instances: **API Management , API Portal** , Plan: **on-premise-connectivity** , Instance Name: **blueop** </br>
    ![](images/blue_op_proxy.png)
  c. Enable Service Instances: **Authorization and Trust Management Service** , Plan: **application** , Instance Name: **bluexsuaa** </br>
    ![](images/blue_xsuaa.png)
  d. Enable Service Instances: **Destination** , Plan: **lite** , Instance Name: **bluedest** </br>
    ![](images/blue_dest.png)
  e. Create Service Keys for **blueop** , **bluexsuaa** , **bluedest** respectively </br>
  
6. In sub-account:**red** </br>
  a. Enable Service Instances: **Authorization and Trust Management Service** , Plan: **application** , Instance Name: **redxsuaa** </br>
    ![](images/red_xsuaa.png)
  b. Enable Service Instances: **Destination** , Plan: **lite** , Instance Name: **reddest** </br>
    ![](images/red_dest.png)
  e. Create Service Keys for **redxsuaa** , **reddest** respectively </br>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

