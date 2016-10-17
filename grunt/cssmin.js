module.exports = {
  options: {
    keepSpecialComments: 0
  },
  essencial: {
    files: {
      '<%= config.dist %>/fat.css': '<%= config.dist %>/fat.css',
      '<%= config.dist %>/thin.css': '<%= config.dist %>/thin.css'
    }
  }
}
