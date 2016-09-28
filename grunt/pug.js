module.exports = {
  includes: {
    options: {
      pretty: true,
      data: {
        dist: true
      }
    },
    files: {
      '<%= config.dist %>/fat/navglobal.html': ['src/jade/navglobal.pug'],
      '<%= config.dist %>/fat/footer.html': ['src/jade/footer.pug'],
      '<%= config.dist %>/fat/portaltopo.html': ['src/jade/portaltopo.pug'],
      '<%= config.dist %>/fat/scripts.html': ['src/jade/scripts.pug'],
      '<%= config.dist %>/thin/navglobal.html': ['src/jade/thin/navglobal.pug'],
      '<%= config.dist %>/thin/footer.html': ['src/jade/thin/footer.pug'],
      '<%= config.dist %>/thin/portaltopo.html': ['src/jade/thin/portaltopo.pug'],
      '<%= config.dist %>/thin/scripts.html': ['src/jade/thin/scripts.pug']
    }
  }
}
