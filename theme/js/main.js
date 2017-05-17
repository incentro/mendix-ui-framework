// Uses AMD or browser globals to create a module. This example creates a
// global even when AMD is used. This is useful if you have some scripts
// that are loaded by an AMD loader, but they still want access to globals.
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jQuery"], function (jQuery) {
      // Also create a global in case some scripts
      // that are loaded still are looking for
      // a global even when an AMD loader is in use.
      return (root.MxJS = factory(jQuery));
    });
  } else {
    // Browser globals
    root.MxJS = factory(root.jQuery);
  }
}(this, function (jQuery) {
  var moduleMxJS = {
    version: "1.0.0",
    getVersion: function () {
      console.debug("getVersion: " + this.version);
      return self.version;
    },


    yourFunction: function () {
      // your function: acces within Mendix with:
      // MxJS.yourFunction();

      function functionWithinFunction(el, className) {
        // a function within yourFunction, with arguments
      }
    },
  };
  return moduleMxJS;
}));
