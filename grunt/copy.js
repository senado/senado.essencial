module.exports = {
  html: {
    files: [{
      expand: true, flatten: true, src: ['<%= config.dist %>/fat/*.html'], dest: '<%= config.dist %>/fat/utf-8'
    }, {
      expand: true, flatten: true, src: ['<%= config.dist %>/fat/*.html'], dest: '<%= config.dist %>/iso-8859-1'
    }, {
      expand: true, flatten: true, src: ['<%= config.dist %>/thin/*.html'], dest: '<%= config.dist %>/thin/utf-8'
    }, {
      expand: true, flatten: true, src: ['<%= config.dist %>/thin/*.html'], dest: '<%= config.dist %>/iso-8859-1'
    }]
  }
}
