const race = function (array) {
  const promises = array.map((timeoutFunction) => {
    return new Promise((resolve, reject) => {
      timeoutFunction((error, data) => resolve(data))
    })
  })

  return function (cb) {
    return Promise.race(promises).then((data) => cb(null, data))
  }
}

const parallel = function (array) {
  const promiseList = array.map((timeoutFunction) => {
    return new Promise((resolve, reject) => {
      timeoutFunction((error, data) => resolve(data))
    })
  })

  return function (cb) {
    return Promise.all(promiseList).then((data) => cb(null, data))
  }
}

const sequence = function (array) {
  const promise = array.reduce((p, timeoutFunction) => {
    return p.then((data) => {
      return new Promise((resolve, reject) => {
        timeoutFunction((nothing, result) => {
          return resolve(result)
        }, data)
      })
    })
  }, Promise.resolve())

  return function (cb) {
    return promise.then((data) => cb(null, data))
  }
}

module.exports = {
  sequence,
  race,
  parallel
}

var example = `
      var getUser = function(userId) {
        return function(cb) {
          setTimeout(function() {
            cb(null, {userId: userId, name: 'Joe'});
          }, Math.random() * 100);
        };
      };

      var userThunk1 = getUser(1);
      var upperCaseName = function(cb, user) {
        cb(null, user.name.toUpperCase());
      };
      
      async.sequence([userThunk, upperCaseName])(function(err, data) {
        console.log(data); // JOE
      });


      ====
      var userThunk2 = getUser(2);
      async.parallel([userThunk1, userThunk2])(function(err, users) {
        console.log(users); // [ { userId: 1, name: 'Joe' }, { userId: 2, name: 'Joe' } ]
      });

      var faster = function(cb) {
        setTimeout(cb.bind(null, null, "I'm faster"), 10);
      }
      
      async.race([userThunk1, faster])(function(err, winner) {
        console.log(winner); // I'm faster
      });

      var userThunk = getUser(22);
`
