var path = require('path')

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            essencial: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'output/styles.css.map',
                    sourceMapURL: 'styles.css.map',
                    sourceMapRootpath: '../'
                },
                files: {
                    'output/styles.css': 'styles.less'
                }
            },
            thin: {
                files: {
                    'output/essencial.thin.css': 'essencial.thin.less'
                }
            },
            componentize: {
                files: {
                    'output/essencial.fat.css': 'essencial.fat.less'
                }
            }
        },
        jade: {
            essencial: {
                options: {
                    pretty: true
                },
                files: {
                    'output/index.html': ['index.jade'],
                    'output/thin.html': ['thin.jade']
                }
            },
            includes: {
                options: {
                    pretty: true,
                    data : {
                        dist: true
                    }
                },
                files: {
                    'dist/fat/navglobal.html': ['jade/navglobal.jade'],
                    'dist/fat/footer.html': ['jade/footer.jade'],
                    'dist/fat/portaltopo.html': ['jade/portaltopo.jade'],
                    'dist/fat/scripts.html': ['jade/scripts.jade'],
                    'dist/thin/navglobal.html': ['jade/thin/navglobal.jade'],
                    'dist/thin/footer.html': ['jade/thin/footer.jade'],
                    'dist/thin/portaltopo.html': ['jade/thin/portaltopo.jade'],
                    'dist/thin/scripts.html': ['jade/thin/scripts.jade']
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'],
                tasks: ['less:essencial', 'less:thin', 'uncss:essencial', 'less:componentize'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade:essencial'],
                options: {
                    spawn: false
                }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['**/*.css', '**/*.html']
            }
        },
        uncss: {
            essencial: {
                options : {
                    ignore: ['.collapse.in', '.collapsing', '.open'],
                    stylesheets: ['styles.css']
                },
                files: {
                    'output/uncss.css': ['output/index.html']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'ie 9'],
                map: true
            },
            essencial: {
                src: ['output/essencial.fat.css', 'output/essencial.thin.css']
            }
        },
        cssmin: {
            options : {
                keepSpecialComments: 0,
                rebase: true,
                target: './',
                relativeTo: '../../'
            },
            essencial: {
                files: {
                    'dist/fat.css' : 'output/essencial.fat.css',
                    'dist/thin.css' : 'output/essencial.thin.css'
                }
            }
        },
        clean: {
            build: {
                src: ['dist', 'output']
            },
            essencial: {
                src: ['output', 'tests/**/*.diff.png', 'tests/**/*.fail.png']
            }
        },
        usebanner: {
            essencial: {
                options: {
                    position: 'top',
                    banner: '/*! ⁔║ <%= pkg.name %> v<%= pkg.version %>  | <%= pkg.repository %> */',
                },
                files: {
                    src: ['dist/fat.css', 'dist/thin.css']
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: '*',
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(function(req, res, next) {
                            res.setHeader('Access-Control-Allow-Origin', '*')
                            res.setHeader('Access-Control-Allow-Methods', '*')
                            next()
                        })
                        return middlewares
                    }
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true,
            },
            essencial: ['watch:styles', 'watch:livereload', 'watch:jade']
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
                    src: 'dist/**/*.html'
                }]
            }
        },
        phantomcss: {
            'desktop.fat': {
                options: {
                    screenshots: 'tests/fat/desktop/screenshots/',
                    results: 'tests/fat/desktop/results/',
                    viewportSize: [800, 800],
                    rootUrl: 'http://localhost:8000/output'
                },
                src: [ 'tests/**/*desktop.js' ]
            },
            'mobile.fat': {
                options: {
                    screenshots: 'tests/fat/mobile/screenshots/',
                    results: 'tests/fat/mobile/results/',
                    viewportSize: [320, 480],
                    rootUrl: 'http://localhost:8000/output'
                },
                src: [ 'tests/**/*mobile.js' ]
            },
            'desktop.thin': {
                options: {
                    screenshots: 'tests/thin/desktop/screenshots/',
                    results: 'tests/thin/desktop/results/',
                    viewportSize: [800, 800],
                    rootUrl: 'http://localhost:8000/output/thin.html'
                },
                src: [ 'tests/**/*desktop.js' ]
            },
            'mobile.thin': {
                options: {
                    screenshots: 'tests/thin/mobile/screenshots/',
                    results: 'tests/thin/mobile/results/',
                    viewportSize: [320, 480],
                    rootUrl: 'http://localhost:8000/output/thin.html'
                },
                src: [ 'tests/**/*mobile.js' ]
            }
        }
    })

    // region loadNpmTasks
    grunt.loadNpmTasks('grunt-he')
    grunt.loadNpmTasks('grunt-uncss')
    grunt.loadNpmTasks('grunt-banner')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-phantomcss')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-connect')
    // endregion

    grunt.registerTask('build', [
        'jade:essencial',             // gera html
        'he:essencial',               // converte caracteres especiais em htmlentities
        'less:essencial',             // gera styles dos módulos essenciais
        'less:thin',                  // gera styles dos módulos essenciais
        'uncss:essencial',            // faz o uncss do fat.css
        'less:componentize'           // gera o arquivo no escopo sf-component
    ])
    grunt.registerTask('server', [
        'connect', 'concurrent:essencial'
    ])
    grunt.registerTask('dev', [
        'build', 'server'
    ])
    grunt.registerTask('default', [
        'clean:build',                    // limpar arquivos antigos

        'build',                          // gera html, styles, faz o uncss e componentiza
        'autoprefixer:essencial',         // autoprefixa

        'cssmin:essencial',               // comprime o css gerado
        'usebanner:essencial',            // insere o banner nos arquivos css

        'jade:includes',                  // gera os html para inserção
        'he:includes',                    // converte caracteres especiais em htmlentities

        'clean:essencial'                 // limpar arquivos que não seja de distribuição
    ])

    grunt.registerTask('test', [
        'build',
        'connect',
        'phantomcss:mobile.fat',
        'phantomcss:mobile.thin',
        'phantomcss:desktop.fat',
        'phantomcss:desktop.thin',
        'clean'
    ])

}
