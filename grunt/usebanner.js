module.exports = {
  essencial: {
    options: {
      position: 'top',
      banner: '/*! <%= pkg.name %> v<%= pkg.version %>  | <%= pkg.repository %> */'
    },
    files: {
      src: ['<%= config.dist %>/fat.css', '<%= config.dist %>/thin.css']
    }
  }
}
