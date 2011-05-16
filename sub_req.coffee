# Create the subdomain link.
#   url     - url to the request handling html page. This should be served from the subdomain.
#   success - success callback, returns the ajax method in the response.
#   error   - error callback
create = (url, opts) ->
  # Remove the subdomain from subdomain.example.com becomes example.com and
  # then up the domain to this, allowing us to do ajax requests to example.com.
  document.domain = window.location.hostname.split(".").splice(1).join(".")
  window.request = $.ajax

  # Create the iframe
  elem = $('<iframe></iframe>')
  elem.attr('src', url)
  elem.attr('id',  "__sub_domain_comms")
  elem.css('display', "none")
  $('body').append(elem)

  # Check if we're ready
  ready(opts)

# Just checks if the link is ready
ready = (opts, attempts=0) ->
  if attempts > 99
    opts.error('timeout')

  try
    subWin = document.getElementById('__sub_domain_comms').contentWindow
    if subWin && subWin.document.domain == document.domain && subWin.contentWindow.request
      # Return the request handler
      success subWin.request
      return
  catch e
    # Do nothing here it'll error it the window hasn't loaded yet

  # Try again in a bit.
  setTimeout () ->
    ready(opts.success, error, attempts++)
  ,200


# Create the API attach to window.
window.SubReq =
  'create': create
