### Handling URL Redirects
The API Proxy URL redirects to a different Target EndPoint.
Let's say you have deployed a simple API proxy, wherein the target endpoint is pointing to the backend service located at the following URL:

https://services.odata.org/V2/Northwind/Northwind.svc

When you click on the API Proxy URL, if your browser displays the service URL instead of the proxied URL, it indicates that the service URL that you are trying to access has been moved temporarily or permanently to a new location. When this scenario occurs, API Management doesnot display the proxied URL. It instead displays the redirected URL of the backend service you provided.
You can handle this URL redirects by adding policies to your API proxy. These policies determine how URL direction is handled within API Management.

Resources which are protected by Cross Site Scripting (XSS) will not be available after the redirect.

