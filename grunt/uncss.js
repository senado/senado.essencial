module.exports = {
  options: {
    ignore: ['.collapse.in', '.collapsing', '.open']
  },
  fat: {
    options: {
      stylesheets: ['fat.css']
    },
    files: {
      '<%= config.dist %>/fat.css': ['<%= config.dist %>/fat.html']
    }
  },
  thin: {
    options: {
      stylesheets: ['thin.css']
    },
    files: {
      '<%= config.dist %>/thin.css': ['<%= config.dist %>/thin.html']
    }
  }
}
