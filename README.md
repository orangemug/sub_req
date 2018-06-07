# sub_req

Simple wrapper to make requests across subdomains.

## Get it

For the host:
 * [sub_req.min.js](https://github.com/orangemug/sub_req/raw/master/build/sub_req.js)

For the gateway domain:
 * [sub_req_gateway.min.js](https://github.com/orangemug/sub_req/raw/master/build/sub_req_gateway.min.js)
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
    <script src="sub_req_gateway.js"></script>
    <script>
      // Tell the gateway what AJAX function you're exposing
      SubReqGateway($.ajax);
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

If you wish your cookies to work across subdomains you'll need to set them on the top level domain. For example if you were using Rails the server on `sub1.domain.com` would set

    Rails.application.config.session_store :active_record_store, {:domain => '.domain.com'}


## Build/Test
To build/minify simply run the following from the base directory, you'll need coffeescript installed to use `cake`

    cake build

All the tests are run the in browser using [jasmine](https://jasmine.github.io/), the following command starts a server which hosts the tests

    cake test

