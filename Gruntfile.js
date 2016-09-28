
module.exports = function (grunt) {
  require('load-grunt-config')(grunt, {
    data: {
      config: {
        dist: 'build'
      },
      pkg: require('./package.json')
    }
  })
}
