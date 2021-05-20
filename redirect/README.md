### Handling URL Redirects
The API Proxy URL redirects to a different Target EndPoint.
Let's say you have deployed a simple API proxy, wherein the target endpoint is pointing to the backend service located at the following URL:

https://services.odata.org/V2/Northwind/Northwind.svc

When you click on the API Proxy URL, if your browser displays the service URL instead of the proxied URL, it indicates that the service URL that you are trying to access has been moved temporarily or permanently to a new location. When this scenario occurs, API Management doesnot display the proxied URL. It instead displays the redirected URL of the backend service you provided.
You can handle this URL redirects by adding policies to your API proxy. These policies determine how URL direction is handled within API Management.Check out the attached proxy to see how the URL redirects are handled. 

Please Note:

1. The Target Backend must redirect for the above to work . In HTTP, redirection is triggered by a server sending a special redirect response to a request. Redirect responses have status codes that start with 3 , and a Location header holding the URL to redirect to. In case the target backend doesn't return the Location header , the policies will not work.

2. Client side resources which are protected by Cross Site Scripting (XSS) will not be available.

