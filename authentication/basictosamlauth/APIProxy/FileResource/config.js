/*
In this method provide your own scn user credential.
*/
function getCredential(){
  return {
    user: context.getVariable("sapapim.user"), 
    password:context.getVariable("sapapim.password") 
  };
}

/*
Provide the idp details, by default the HCP accounts are configured to work the SAP ID service
*/
function getIDPUrl(){
  return "https://accounts.sap.com/saml2/idp/sso/accounts.sap.com";
}