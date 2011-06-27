(function() {
  var SubReq;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  SubReq = (function() {
    var TIMEOUT, uniqId;
    TIMEOUT = 1000 * 15;
    uniqId = function() {
      var rand;
      rand = Math.floor(Math.random() * 1000001);
      return "_subReq" + rand;
    };
    function SubReq(url, opts) {
      var iframe, timer, uniqName;
      document.domain = window.location.hostname.split(".").splice(1).join(".");
      uniqName = uniqId();
      iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", "" + url + "?callback=" + uniqName);
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.display = "none";
      timer = setTimeout(function() {
        console.error("SubReq Timeout for " + url);
        window[uniqName] = null;
        document.body.removeChild(iframe);
        return opts.error('timeout');
      }, TIMEOUT);
      window[uniqName] = __bind(function(ajaxHandle) {
        clearTimeout(timer);
        return opts.success(ajaxHandle);
      }, this);
      document.body.appendChild(iframe);
    }
    return SubReq;
  })();
  window['SubReq'] = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return typeof result === "object" ? result : child;
    })(SubReq, args, function() {});
  };
}).call(this);
