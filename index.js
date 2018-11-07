exports.dx = function dx(func) {
  return function funcWrappedByDx(...args) {
    try {
      const res = func(...args)

      const isPromise = res && typeof res.then === 'function'
      if (isPromise) {
        return res
          .then(res => ([res, null]))
          .catch(err => ([null, err]))
      }

      return [res, null]
    } catch (err) {
      return [null, err]
    }
  }
}
