#SQL Threat Protection

SQL is used to interact with relationship data bases. In the modern web based developments, the content and the behavior of many of the application is built on top of the data stored in a database servers. The data from the databases are exposed by REST ful interfaces to the consumer and thereby making the system vulnerable to SQL injection attacks where in malicious commands are send to the database via the web services. The main backdoor entry to the database happens via the unsanitized input data.

In SAP HANA Cloud Platform, API management the [JavaScript](https://help.hana.ondemand.com/apim_od/frameset.htm?5b63ed7782ab4b4ea96bf84119059039.html) policy can be used to identify the sql threats either in the input payload or the query parameters. This can achieved via the Regex to check if the user is passing sql commands like drop, create,delete table, ... via either input query parameters or input payload.

In case an error is detected then [Raise Fault](https://help.hana.ondemand.com/apim_od/frameset.htm?c7f2e8d9de4249cfa8cc2655ebd4878b.html) policy could be used to return 403 forbidden status code to the end user.

# How to use the sample

* Click on [SQLThreatProtection.zip](./SQLThreatProtection.zip) and then click on the "View Raw" Link or "Download" button to download the sample.
* Import the Downloaded API Proxy zip into your SAP HCP, API management tenancy. Additional instruction for this is available in [link](https://help.hana.ondemand.com/apim_od/frameset.htm?9342a932441e45cd9636eb0a01a89958.html).
