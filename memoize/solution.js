module.exports = function (func) {
  const cache = new Map()

  return function memoizedFunc(...args) {
    var key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    var result = func(...args)
    cache.set(key, result)

    return result
  }
}
