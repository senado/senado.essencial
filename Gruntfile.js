var path = require('path')

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uncss: {
      fat: {
        options: {
          ignore: ['.collapse.in', '.collapsing', '.open'],
          stylesheets: ['styles.css']
        },
        files: {
          'output/uncss.css': ['output/index.html']
        }
      },
      thin: {
        options: {
          ignore: ['.collapse.in', '.collapsing', '.open'],
          stylesheets: ['thin.css']
        },
        files: {
          'output/thin.css': ['output/thin.html']
        }
      }
    },
    clean: {
      build: {
        src: ['dist', 'output']
      },
      essencial: {
        src: ['output']
      },
      tests: {
        src: ['tests/**/*.diff.png', 'tests/**/*.fail.png']
      }
    },
    usebanner: {
      essencial: {
        options: {
          position: 'top',
          banner: '/*! <%= pkg.name %> v<%= pkg.version %>  | <%= pkg.repository %> */'
        },
        files: {
          src: ['dist/fat.css', 'dist/thin.css']
        }
      }
    },
    copy: {
      html: {
        files: [{
          expand: true, flatten: true, src: ['dist/fat/*.html'], dest: 'dist/fat/utf-8'
        }, {
          expand: true, flatten: true, src: ['dist/thin/*.html'], dest: 'dist/thin/utf-8'
        }]
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
          src: 'output/*.html'
        }]
      },
      includes: {
        files: [{
          expand: true,
          src: 'dist/*/*.html'
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
  grunt.loadNpmTasks('grunt-phantomcss')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')
  // endregion

  grunt.registerTask('build', [
    'he:essencial', // converte caracteres especiais em htmlentities
    'uncss:fat', // faz o uncss do fat.css
    'uncss:thin', // faz o uncss do thin.css
    'less:componentize' // gera o arquivo no escopo sf-component
  ])

  grunt.registerTask('default', [
    'clean:build', // limpar arquivos antigos
    'build', // gera html, styles, faz o uncss e componentiza
    'usebanner:essencial', // insere o banner nos arquivos css
    'copy:html', // guarda os arquivos html em utf-8 antes da conversão em entities
    'he:includes', // converte caracteres especiais em htmlentities

    'clean:essencial', // limpar arquivos que não seja de distribuição
    'clean:tests' // limpar arquivos de testes
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
