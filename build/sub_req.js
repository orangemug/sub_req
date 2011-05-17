(function() {
  var create, ready;
  create = function(url, opts) {
    var elem;
    document.domain = window.location.hostname.split(".").splice(1).join(".");
    elem = $('<iframe></iframe>');
    elem.attr('src', url);
    elem.attr('id', "__sub_domain_comms");
    elem.css('display', "none");
    $('body').append(elem);
    return ready(opts);
  };
  ready = function(opts, attempts) {
    var subElem;
    if (attempts == null) {
      attempts = 0;
    }
    if (attempts > 99) {
      opts.error('timeout');
    }
    try {
      subElem = document.getElementById('__sub_domain_comms');
      if (subElem.contentWindow && subElem.contentWindow.document.domain === document.domain && subElem.contentWindow.request) {
        opts.success(subElem.contentWindow.request);
        return;
      }
    } catch (e) {

    }
    return setTimeout(function() {
      return ready(opts, attempts++);
    }, 200);
  };
  window.SubReq = {
    'create': create
  };
}).call(this);
