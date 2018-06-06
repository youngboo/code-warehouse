var Base = require('./src/base')
;(function (global) {
  function factory () {
    var base = new Base()
    return base
  }

  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && (define.cmd || define.amd)) {
    define(factory)
  } else {
    global.moduleName = factory()
  }
})(typeof window !== 'undefined' ? window : global)
