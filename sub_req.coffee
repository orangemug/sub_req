class SubReq
  # PRIVATE
  uniqCallback = ->
    rand = Math.floor(Math.random()*1000001)
    return "_subReq#{rand}"


  # Create the subdomain link.
  #   url     - url to the request handling html page. This should be served from the subdomain.
  #   success - success callback, returns the ajax method in the response.
  #   error   - error callback
  constructor: (url, opts) ->
    @success = opts?.success
    @error   = opts?.error

    # Remove the subdomain from subdomain.example.com becomes example.com and
    # then up the domain to this, allowing us to do ajax requests to example.com.
    document.domain = window.location.hostname.split(".").splice(1).join(".")

    # Set the callback
    callbackName = uniqCallback()
    window[callbackName] = () =>
      @ready()

    # Create the iframe
    elem = $('<iframe></iframe>')
    elem.attr('src', "url?#{callbackName}")
    elem.attr('id',  "__sub_domain_comms")
    elem.css('display', "none")
    $('body').append(elem)


  ready: () ->
    try
      subElem = document.getElementById('__sub_domain_comms')
      if subElem.contentWindow && subElem.contentWindow.document.domain == document.domain && subElem.contentWindow.request
        # Return the request handler
        setTimeout () ->
          opts.success subElem.contentWindow.request
        ,1000
        return
    catch e
      # Do nothing here it'll error it the window hasn't loaded yet
      console.error "Something went wrong!"


# Create the API attach to window.
window['SubReq'] = SubReq
