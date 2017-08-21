module.exports = function(grunt) {

    var serveStatic = require('serve-static');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['css/sprite.css', 'css/style.css'],
                dest: 'css/main.css'
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    'css/style.css': 'less/style.less'
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js'],
            options: {
                globals: {
                    jQuery: true
                }   
            }
        },

        sprite: {
            all: {
                src: 'images/non-sprites/*.png',
                dest: 'images/spritesheet.png',
                destCss: 'css/sprite.css',
                imgPath: '../images/spritesheet.png',
                padding: 10
            }
        },

        cssmin: {
            options: {
            shorthandCompacting: false,
            roundingPrecision: -1
            },
            target: {
                files: {
                    'css/main.min.css': ['css/main.css']
                }
            }
        },

        uglify: {
            options: {
                compress: {
                    // sdrop_console: true
                },
                mangle: false
            },
            target: {
                files: {
                    'js/main.min.js': ['js/main.js']
                }
            }
        },

        watch: {
            less: {
                files: ['index.html', 'less/*'],
                tasks: ['jshint', 'less', 'concat', 'cssmin'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: ['js/main.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true,
                }
            }
        },

        connect: {
            all: {
                options:{
                    port: 8000,
                    hostname: "0.0.0.0",
                    // base: 'app/views/index.html',
                    // middleware: function(connect, options) {
                    //     return [
                    //         require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                    //         serveStatic(options.base[0])
                    //     ];
                    // }
                }
            }
        },

        open: {
            all: {
                path: 'http://localhost:<%= connect.all.options.port%>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-image-sprite');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'sprite', 'less', 'concat', 'cssmin', 'uglify', 'open', 'connect', 'watch']);
};