window['SubReqGateway'] = (ajaxFun) ->
  # Strip the subdomain and 'up' the domain
  document.domain = window.location.hostname.split(".").splice(1).join(".");

  arg = "callback"
  regex = new RegExp("[\\?&]#{arg}=([^&#]*)")
  args = regex.exec(window.location.href)
  if args.length < 1
    console.warn "Missing 'callback' arg"

  # Exec the callback in the parent passing back the ajax function
  callback = args[1]
  parent[callback](ajaxFun)
