(function() {
  var SubReq;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
  SubReq = (function() {
    var TIMEOUT, uniqName;
    TIMEOUT = 1000 * 15;
    uniqName = function() {
      var rand;
      rand = Math.floor(Math.random() * 1000001);
      return "_subReq" + rand;
    };
    function SubReq(url, opts) {
      var iframe, timer;
      document.domain = window.location.hostname.split(".").splice(1).join(".");
      uniqName = uniqName();
      iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", "" + url + "?callback=" + uniqName);
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.display = "none";
      timer = setTimeout(function() {
        console.error("SubReq Timeout for " + url);
        window[uniqName] = null;
        return document.body.removeChild(iframe);
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
      return typeof result == "object" ? result : child;
    })(SubReq, args, function() {});
  };
}).call(this);
