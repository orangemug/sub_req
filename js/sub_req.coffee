class SubReq
  TIMEOUT = 1000*15
  # PRIVATE
  uniqName = ->
    rand = Math.floor(Math.random()*1000001)
    return "_subReq#{rand}"


  # Create the subdomain link.
  #   url     - url to the request handling html page. This should be served from the subdomain.
  #   success - success callback, returns the ajax method in the response.
  #   error   - error callback
  constructor: (url, opts) ->
    # Remove the subdomain from subdomain.example.com becomes example.com and
    # then up the domain to this, allowing us to do ajax requests to example.com.
    document.domain = window.location.hostname.split(".").splice(1).join(".")

    # Set the callback
    uniqName = uniqName()

    # Create the iframe element
    iframe = document.createElement("IFRAME")
    iframe.setAttribute "src", "#{url}?callback=#{uniqName}"
    iframe.style.width = "0px"
    iframe.style.height = "0px"
    iframe.style.display = "none"

    # Timeout
    timer = setTimeout () ->
      console.error "SubReq Timeout for #{url}"
      window[uniqName] = null
      document.body.removeChild(iframe)
      opts.error('timeout')
    ,TIMEOUT

    # Bind the callback
    window[uniqName] = (ajaxHandle) =>
      clearTimeout(timer)
      opts.success(ajaxHandle)

    # Add the iframe to the page
    document.body.appendChild(iframe)


# Create the API attach to window.
window['SubReq'] = (args...) ->
  new SubReq(args...)
