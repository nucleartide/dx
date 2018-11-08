'use strict'

exports.dx = function dx(func, ctx) {
  ctx = ctx || null

  return function funcWrappedByDx() {
    var args = Array.prototype.slice.call(arguments)

    try {
      var res = func.apply(ctx, args)

      var isPromise = res && typeof res.then === 'function'
      if (isPromise) {
        return res
          .then(function(res) { return [res, null] })
          .catch(function(err) { return [null, err] })
      }

      return [res, null]
    } catch (err) {
      return [null, err]
    }
  }
}
