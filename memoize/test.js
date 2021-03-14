var assert = require('assert')
var memoize = require('./solution')

describe('memoize', function () {
  it('returns function', () => {
    var fib = memoize(function () {})
    assert.strictEqual(typeof fib, 'function')
  })

  it('returns function result correctly', () => {
    var fib = memoize(function (arg1, arg2) {
      return arg1 + arg2
    })
    assert.strictEqual(fib(1, 2), 3)
  })

  it('runs function once if argument does not change', () => {
    var called = 0
    var fib = memoize(function (arg1) {
      called++
      return arg1
    })
    fib(1)
    fib(1)
    fib(1)
    assert.strictEqual(called, 1)
  })

  it('can handle a single argument', function () {
    var called = 0
    var fib = memoize(function (n) {
      called++
      if (n < 2) return n
      return fib(n - 1) + fib(n - 2)
    })
    fib(10)
    assert.strictEqual(called, 11)
  })

  it('can handle multiple arguments', function () {
    var called = 0
    var fib = memoize(function (n, unused) {
      called++
      if (n < 2) return n
      return fib(n - 1, unused) + fib(n - 2, unused)
    })
    fib(10, 'x')
    fib(10, 'y')
    assert.strictEqual(called, 22)
  })
})
