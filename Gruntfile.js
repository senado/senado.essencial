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
                    'output/styles.css': 'styles.less',
                    'output/essencial.thin.css': 'essencial.thin.less'
                }
            },
            'essencial.componentize': {
                files: {
                    'output/essencial.fat.css': 'essencial.fat.less'
                }
            },
            main: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'dist/main.css.map',
                    sourceMapURL: 'main.css.map',
                    sourceMapRootpath: '../'
                },
                files: {
                    'dist/main.css': 'less/styles.less'
                }
            }
        },
        jade: {
            essencial: {
                options: {
                    pretty: true
                },
                files: {
                    'output/index.html': ['index.jade']
                }
            },
            'essencial.includes': {
                options: {
                    pretty: true,
                    data : {
                        dist: true
                    }
                },
                files: {
                    'dist/utf-8/navglobal.html': ['jade/navglobal.jade'],
                    'dist/utf-8/footer.html': ['jade/footer.jade'],
                    'dist/utf-8/portaltopo.html': ['jade/portaltopo.jade'],
                    'dist/utf-8/scripts.html': ['jade/scripts.jade']
                }
            },
            main: {
                options: {
                    pretty: true
                },
                files: {
                    'index.html': ['index.jade']
                }

            }
        },
        watch: {
            'styles.essencial': {
                files: ['**/*.less'],
                tasks: ['less:essencial', 'uncss:essencial', 'less:essencial.componentize'],
                options: {
                    spawn: false
                }
            },
            'jade.essencial': {
                files: ['**/*.jade'],
                tasks: ['jade:essencial'],
                options: {
                    spawn: false
                }
            },

            styles: {
                files: ['**/*.less'],
                tasks: ['less:main'],
                options: {
                    spawn: false
                }
            },
            jade: {
                files: ['**/*.jade'],
                tasks: ['jade:main'],
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
        styledown: {
            build: {
                files: {
                    'styleguide/index.html': ['**/less/**/*.less']
                },
                options: {
                    css: 'dist/fat.css',
                    config: 'styleguide/config.md',
                    sg_css: 'styleguide/styledown.css',
                    sg_js: 'styleguide/styledown.js',
                    title: 'Senado.CSS'
                }
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
                src: 'output/essencial.fat.css'
            },
            main: {
                src: 'dist/main.css'
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
        cssUrlEmbed: {
            essencial: {
                files: {
                    'output/essencial.fat.css': ['output/essencial.fat.css']
                }
            }
        },
        clean: {
            build: {
                src: ['dist', 'output']
            },
            essencial: {
                src: ['output', 'tests/**/results']
            }
        },
        usebanner: {
            essencial: {
                options: {
                    position: 'top',
                    banner: '/*! <%= pkg.name %> v<%= pkg.version %>  | <%= pkg.repository %> */',
                },
                files: {
                    src: ['dist/fat.css', 'dist/thin.css', 'dist/main.css']
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
            essencial: ['watch:styles.essencial', 'watch:livereload', 'watch:jade.essencial'],
            main: ['watch:styles', 'watch:livereload', 'watch:jade']
        },
        charset: {
            essencial : {
                options: {
                    from: 'utf8',
                    to: 'iso-8859-1',
                },
                files: [{
                    dest: 'dist/iso-8859-1/footer.html',
                    src: 'dist/utf-8/footer.html'
                }, {
                    dest: 'dist/iso-8859-1/navglobal.html',
                    src: 'dist/utf-8/navglobal.html'
                }, {
                    dest: 'dist/iso-8859-1/portaltopo.html',
                    src: 'dist/utf-8/portaltopo.html'
                }, {
                    dest: 'dist/iso-8859-1/scripts.html',
                    src: 'dist/utf-8/scripts.html'
                }]
            }
        },
        phantomcss: {
            'essencial.desktop': {
                options: {
                    screenshots: 'tests/desktop/screenshots/',
                    results: 'tests/desktop/results/',
                    viewportSize: [800, 800]
                },
                src: [ 'tests/**/*desktop.js' ]
            },
            'essencial.mobile': {
                options: {
                    screenshots: 'tests/mobile/screenshots/',
                    results: 'tests/mobile/results/',
                    viewportSize: [320, 480]
                },
                src: [ 'tests/**/*mobile.js' ]
            }
        }
    })

    // region loadNpmTasks
    grunt.loadNpmTasks('grunt-uncss')
    grunt.loadNpmTasks('grunt-banner')
    grunt.loadNpmTasks('grunt-charset')
    grunt.loadNpmTasks('grunt-styledown')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-phantomcss')
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-css-url-embed')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-connect')
    // endregion

    grunt.registerTask('build.essencial', [
        'jade:essencial',             // gera html
        'less:essencial',             // gera styles dos módulos essenciais
        'uncss:essencial',            // faz o uncss do fat.css
        'less:essencial.componentize' // gera o arquivo no escopo sf-component
    ])
    grunt.registerTask('server.essencial', [
        'connect', 'concurrent:essencial'
    ])
    grunt.registerTask('dev.essencial', [
        'build.essencial', 'server.essencial'
    ])
    grunt.registerTask('essencial', [
        'clean:build',                    // limpar arquivos antigos

        'build.essencial',                // gera html, styles, faz o uncss e componentiza
        'autoprefixer:essencial',         // autoprefixa
        'cssUrlEmbed:essencial',          // embute a fonte

        //'connect',                      // comparação de screenshots
        //'phantomcss:essencial.mobile',
        //'phantomcss:essencial.desktop',

        'cssmin:essencial',               // comprime o css gerado
        'usebanner:essencial',            // insere o banner nos arquivos css

        'jade:essencial.includes',        // gera os html para inserção
        'charset',                        // gera cópia do include em iso-88959-1

        'clean:essencial'                 // limpar arquivos que não seja de distribuição
    ])

    grunt.registerTask('build', [
        'jade:main',
        'less:main'
    ])
    grunt.registerTask('server', [
        'connect', 'concurrent:main'
    ])
    grunt.registerTask('dev', [
        'build', 'server'
    ])

    grunt.registerTask('default', [
        'essencial', 'styledown'
    ])

}
