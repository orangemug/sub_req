(function() {
  var create, ready;
  create = function(url, opts) {
    var elem;
    document.domain = window.location.hostname.split(".").splice(1).join(".");
    window.request = $.ajax;
    elem = $('<iframe></iframe>');
    elem.attr('src', url);
    elem.attr('id', "__sub_domain_comms");
    elem.css('display', "none");
    $('body').append(elem);
    return ready(opts);
  };
  ready = function(opts, attempts) {
    var subWin;
    if (attempts == null) {
      attempts = 0;
    }
    if (attempts > 99) {
      opts.error('timeout');
    }
    try {
      subWin = document.getElementById('__sub_domain_comms').contentWindow;
      if (subWin && subWin.document.domain === document.domain && subWin.contentWindow.request) {
        success(subWin.request);
        return;
      }
    } catch (e) {

    }
    return setTimeout(function() {
      return ready(opts.success, error, attempts++);
    }, 200);
  };
  window.SubReq = {
    'create': create
  };
}).call(this);
