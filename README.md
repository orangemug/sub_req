# sub_req

Simple wrapper to make requests across subdomains.

Get it:

 * [sub_req.js](https://github.com/orangemug/sub_req/raw/master/build/sub_req.js)
 * [sub_req.min.js](https://github.com/orangemug/sub_req/raw/master/build/sub_req.min.js)
 * [sample host page](https://github.com/orangemug/sub_req/raw/master/html/sub_req.html) - See the comments in the file.



## API
Below is an example usage. Say you have 2 domains you wish to communcate across

 * sub1.domain.com (the master)
 * sub2.domain.com

`sub2.domain.com` should make a communication page available, below is an example, it's also hosted [here](https://github.com/orangemug/sub_req/raw/master/html/sub_req.html).

    <html>
    <body>
    <!--
      This should basically be whatever you have in the cache already from your
      calling page which has an ajax wrapper. In my case its jQuery
    -->
    <script src="http://code.jquery.com/jquery-1.6.1.min.js"></script>
    <script>
      // Remove the subdomain from subdomain.example.com becomes example.com and
      // then up the domain to this, allowing us to do ajax requests to example.com.
      document.domain = window.location.hostname.split(".").splice(1).join(".");

      // The ajax method you want to expose.
      window.request = $.ajax;
    </script>
    </body>
    </html>


On `sub1.domain.com` require the `sub_req.min.js` and initialize the communication link.

    SubReq.create("http://sub2.domain.com/public/sub_req.html", {
      'success': function(subReqAjax) {
        // `subReqAjax` will be the ajax function exposed from host page.
      },
      'error': function() {
        // handle error
      }
    })


## Build/Test
To build/minify simply run the following from the base directory, you'll need coffeescript installed to use `cake`

    cake build

All the tests are run the in browser using [jasmine](http://pivotal.github.com/jasmine), the following command starts a server which hosts the tests

    cake test

