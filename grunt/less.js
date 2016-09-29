module.exports = {
  options: {
    sourceMap: false
  },
  componentize: {
    files: {
      '<%= config.dist %>/fat.css': 'src/less/full.less'
    }
  }
}
