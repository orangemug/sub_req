(function() {
  window['SubReqGateway'] = function(ajaxFun) {
    var arg, args, callback, regex;
    document.domain = window.location.hostname.split(".").splice(1).join(".");
    arg = "callback";
    regex = new RegExp("[\\?&]" + arg + "=([^&#]*)");
    args = regex.exec(window.location.href);
    if (args.length < 1) {
      console.warn("Missing 'callback' arg");
    }
    callback = args[1];
    return parent[callback](ajaxFun);
  };
}).call(this);
