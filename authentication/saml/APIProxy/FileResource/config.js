/*
In this method provide your own scn user credential.
*/
function getCredential(){
  return {
    user:"your-user-name", //enter your credentials user name
    password:"your-password" //enter your credentials
  };
}

/*
Provide the idp details, by default the HCP accounts are configured to work the SAP ID service
*/
function getIDPUrl(){
  return "https://accounts.sap.com/saml2/idp/sso/accounts.sap.com";
}