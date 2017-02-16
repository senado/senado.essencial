module.exports = {
  includes: {
    options: {
      pretty: true,
      data: {
        dist: true
      }
    },
    files: {
      '<%= config.dist %>/fat/navglobal.html': ['src/pug/navglobal.pug'],
      '<%= config.dist %>/fat/footer.html': ['src/pug/footer.pug'],
      '<%= config.dist %>/fat/portaltopo.html': ['src/pug/portaltopo.pug'],
      '<%= config.dist %>/fat/scripts.html': ['src/pug/scripts.pug'],
      '<%= config.dist %>/thin/navglobal.html': ['src/pug/thin/navglobal.pug'],
      '<%= config.dist %>/thin/footer.html': ['src/pug/thin/footer.pug'],
      '<%= config.dist %>/thin/portaltopo.html': ['src/pug/thin/portaltopo.pug'],
      '<%= config.dist %>/thin/scripts.html': ['src/pug/thin/scripts.pug']
    }
  }
}
