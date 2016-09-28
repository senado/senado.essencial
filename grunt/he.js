module.exports = {
  options: {
    useNamedReferences: true,
    allowUnsafeSymbols: true
  },
  includes: {
    files: [{
      expand: true,
      src: '<%= config.dist %>/*/*.html'
    }]
  }
}
