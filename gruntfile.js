module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        timestamp: (new Date()).getTime(),
        clean: ["public/dist/"],
        uglify: {
            options: {},
            dist: {
                files: {
                    'public/dist/qr-<%= pkg.version %>-<%= timestamp %>.js': [
                        'public/wtest/js/qr.js'
                    ],
                    'public/dist/weixin-<%= pkg.version %>-<%= timestamp %>.js': [
                        'public/wtest/js/weixin.js'
                    ],
                    'public/dist/wtest-<%= pkg.version %>-<%= timestamp %>.js': [
                        'public/wtest/js/wtest.js'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'public/dist/qr-<%= pkg.version %>-<%= timestamp %>.css': [
                        'public/wtest/css/qr.css'
                    ]
                }
            }
        },
        copy: {
            config: {
                expand: true,
                src: 'public/wtest/conf/*',
                dest: 'public/dist/conf/',
                filter: 'isFile',
                flatten: true
            },
            lib: {
                expand: true,
                src: 'public/wtest/lib/*',
                dest: 'public/dist/lib/',
                filter: 'isFile',
                flatten: true
            }
        },
        htmlbuild: {
            diaosi: {
                path: 'public/wtest',
                src: '<%= htmlbuild.diaosi.path %>/diaosi.html',
                dest: 'public/dist/'
            },
            qrcode: {
                src: '<%= htmlbuild.diaosi.path %>/qrcode.html',
                dest: 'public/dist/',
                options: {
                    beautify: true,
                    prefix: '',
                    relative: true,
                    styles: {
                        bundle: [
                            '<%= htmlbuild.diaosi.dest %>/qr-<%= pkg.version %>-<%= timestamp %>.css'
                        ]
                    },
                    scripts: {
                        bundle: [
                            '<%= htmlbuild.diaosi.dest %>/qr-<%= pkg.version %>-<%= timestamp %>.js'
                        ]
                    }
                }
            },
            ios: {
            src: '<%= htmlbuild.diaosi.path %>/IOS.html',
            dest: 'public/dist/',
            options: {
              beautify: true,
              prefix: '',
              relative: true,
              scripts: {
                bundle: [
                  '<%= htmlbuild.diaosi.dest %>/weixin-<%= pkg.version %>-<%= timestamp %>.js',
                  '<%= htmlbuild.diaosi.dest %>/wtest-<%= pkg.version %>-<%= timestamp%>.js'
                ]
              }
            }
          },
          android: {
            src: '<%= htmlbuild.diaosi.path %>/android.html',
            dest: 'public/dist/',
            options: {
              beautify: true,
              prefix: '',
              relative: true,
              scripts: {
                bundle: [
                  '<%= htmlbuild.diaosi.dest %>/weixin-<%= pkg.version %>-<%= timestamp %>.js',
                  '<%= htmlbuild.diaosi.dest %>/wtest-<%= pkg.version %>-<%= timestamp%>.js'
                ]
              }
            }
          }
        }
    });

    //grunt task
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('build', ['clean','copy:config', 'copy:lib', 'uglify', 'cssmin', 'htmlbuild']);
};