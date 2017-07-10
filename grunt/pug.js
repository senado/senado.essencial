module.exports = {
  includes: {
    options: {
      pretty: true,
      data: {
        dist: true
      }
    },
    files: {
      '<%= config.dist %>/fat/navglobal.html': ['src/pug/fat/navglobal.pug'],
      '<%= config.dist %>/fat/footer.html': ['src/pug/fat/footer.pug'],
      '<%= config.dist %>/fat/footer-sem-ga.html': ['src/pug/fat/footer-sem-ga.pug'],
      '<%= config.dist %>/fat/portaltopo.html': ['src/pug/fat/portaltopo.pug'],
      '<%= config.dist %>/fat/scripts.html': ['src/pug/commons/scripts.pug'],
      '<%= config.dist %>/thin/navglobal.html': ['src/pug/commons/navglobal.pug'],
      '<%= config.dist %>/thin/footer.html': ['src/pug/thin/footer.pug'],
      '<%= config.dist %>/thin/footer-sem-ga.html': ['src/pug/thin/footer-sem-ga.pug'],
      '<%= config.dist %>/thin/portaltopo.html': ['src/pug/thin/portaltopo.pug'],
      '<%= config.dist %>/thin/scripts.html': ['src/pug/commons/scripts.pug']
    }
  }
}
