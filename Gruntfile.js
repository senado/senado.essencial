module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      componentize: {
        files: {
          'build/fat.css': './src/less/full.less'
        }
      }
    },
    uncss: {
      options: {
        ignore: ['.collapse.in', '.collapsing', '.open']
      },
      fat: {
        options: {
          stylesheets: ['fat.css']
        },
        files: {
          'build/fat.css': ['build/fat.html']
        }
      },
      thin: {
        options: {
          stylesheets: ['thin.css']
        },
        files: {
          'build/thin.css': ['build/thin.html']
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      essencial: {
        files: {
          'build/fat.css': 'build/fat.css'
        }
      }
    },
    clean: {
      tests: {
        src: ['tests/**/*.diff.png', 'tests/**/*.fail.png']
      },
      build: {
        src: ['build/{fat,thin}.js']
      }
    },
    usebanner: {
      essencial: {
        options: {
          position: 'top',
          banner: '/*! <%= pkg.name %> v<%= pkg.version %>  | <%= pkg.repository %> */'
        },
        files: {
          src: ['build/fat.css', 'build/thin.css']
        }
      }
    },
    he: {
      options: {
        useNamedReferences: true,
        allowUnsafeSymbols: true
      },
      essencial: {
        files: [{
          expand: true,
          src: 'build/*.html'
        }]
      }
    },
    phantomcss: {
      'desktop.fat': {
        options: {
          screenshots: 'tests/fat/desktop/screenshots/',
          results: 'tests/fat/desktop/results/',
          viewportSize: [1200, 1200],
          rootUrl: 'http://localhost:8000/dist/fat.html'
        },
        src: [ 'tests/**/*desktop.js' ]
      },
      'mobile.fat': {
        options: {
          screenshots: 'tests/fat/mobile/screenshots/',
          results: 'tests/fat/mobile/results/',
          viewportSize: [320, 480],
          rootUrl: 'http://localhost:8000/dist/fat.html'
        },
        src: [ 'tests/**/*mobile.js' ]
      },
      'desktop.thin': {
        options: {
          screenshots: 'tests/thin/desktop/screenshots/',
          results: 'tests/thin/desktop/results/',
          viewportSize: [1200, 1200],
          rootUrl: 'http://localhost:8000/dist/thin.html'
        },
        src: [ 'tests/**/*desktop.js' ]
      },
      'mobile.thin': {
        options: {
          screenshots: 'tests/thin/mobile/screenshots/',
          results: 'tests/thin/mobile/results/',
          viewportSize: [320, 480],
          rootUrl: 'http://localhost:8000/dist/thin.html'
        },
        src: [ 'tests/**/*mobile.js' ]
      }
    }
  })

  // region loadNpmTasks
  grunt.loadNpmTasks('grunt-he')
  grunt.loadNpmTasks('grunt-uncss')
  grunt.loadNpmTasks('grunt-banner')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  // endregion

  grunt.registerTask('default', [
    'he', // converte caracteres especiais em htmlentities
    'uncss:fat', // faz o uncss do fat.css
    'uncss:thin', // faz o uncss do thin.css
    'less:componentize', // gera o arquivo no escopo sf-component
    'cssmin',
    'usebanner',
    'clean:build'
  ])

  grunt.registerTask('test', [
    'clean',
    'default',
    'phantomcss:mobile.fat',
    'phantomcss:mobile.thin',
    'phantomcss:desktop.fat',
    'phantomcss:desktop.thin',
    'clean'
  ])
}
