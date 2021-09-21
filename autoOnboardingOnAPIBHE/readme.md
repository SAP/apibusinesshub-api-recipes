# About
Utility to onboard users into API Business Hub Enterprise(APIBHE) without manually addition from the User Interface. Execute the below steps within the CF subaccount

# Create Service Instance of APIBHE
Service: API Management, API Business Hub Enterprise (apimanagement-devportal-trial) </br>
Plan: 'devportal-apiaccess' </br>
Use the role - 
`{
    "role": "AuthGroup.API.Admin"
}`
</br>
Create Service Key

# Create Service Instance of XSUAA 
Service: Authorization and Trust Management Service (xsuaa) </br>
Plan: 'apiaccess'</br>
Create Service Key </br>

# Create Destination
Fill the contents of the destination from the contents of the Service Key created in the above step - Authorization and Trust Management Service (xsuaa)

    Name: apimgmt-platform-access (must have name)
    Type: HTTP
    Description: 
    URL: https://yourxsuua.authentication.sap.hana.ondemand.com (Provide the value of the url field from the service key you created above.)
    Proxy Type: Internet
    Authentication: Oauth2ClientCredentials
    Client ID: apiacess-client_id (Provide the value of the "clientid" field from the service key you created above.)
    Client Secret: xxxxxxxxxxxxxxxxxxxxxxxxxx (Provide the value of the "clientsecret" field from the service key you created above.)
    Token Service URL: https://yourxsuua.authentication.sap.hana.ondemand.com (Provide the value of the url field from the service key you created above.)
    Token Service User:
    Token Service Password:

# Copy Utility from Git
Download the contents from the folder - autoOnboardingOnAPIBHE on the local system. 
# Gather Config
Copy the contents of the Service Key Json created witihn the Service Instance of APIBHE and paste within the config.json file
# Update Registered Users
Update the csv with the list of users that will be onboarded 
# Execute Utility
[Install Python requests](https://pypi.org/project/requests/) </br></br>
Execute python script </br>

    python onboardAPIBHE.py
    OR
    /usr/bin/python3 <your path>/onboardAPIBHE.py

# External Links
[API Access Plan for API Business Hub Enterprise](https://help.sap.com/viewer/66d066d903c2473f81ec33acfe2ccdb4/Cloud/en-US/dabee6e347f645a6805ec5b29f5d578c.html)
