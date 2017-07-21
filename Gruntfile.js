// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {
    // CONFIGURE GRUNT
    grunt.initConfig({
        // get the configuration info from package.json file
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        // all of our configuration goes here
        jshint: {
            // configuration for jshint task
        },
//        cssmin: {
//            // configuration for cssmin task
//            options: {
//                mergeIntoShorthands: false,
//                roundingPrecision: -1
//            },
//            target: {
//                files: {
//                    'style.css': ['foo.css', 'bar.css']
//                }
//            }
////            admincss: {
////                src: ['']
////                dest: ['dest/']
////            }
//        },
        processhtml: {
//            dev: {
//                options: {
//                    data: {
//                        message: 'This is development environment'
//                    }
//                },
//                files: {
//                    'dev/index.html': ['index.html']
//                }
//            },
            dist: {
                options: {
                    process: true,
                    data: {
                        title: 'My app',
                        message: 'This is production distribution'
                    }
                },
                files: {
                    'dist/index.html': ['app/index.html']
                }
            },
//            custom: {
//                options: {
//                    templateSettings: {
//                        interpolate: /{{([\s\S]+?)}}/g // mustache
//                    },
//                    data: {
//                        message: 'This has custom template delimiters'
//                    }
//                },
//                files: {
//                    'custom/custom.html': ['custom.html']
//                }
//            }
        },
        uglify: {
            // uglify task configuration
            options: {},
            build: {}
        }
    });

    // log something
    grunt.log.write('Hello world! Welcome to Tutorialspoint!!\n');

    // Load the plugin that provides the "cssmin" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "processhtml" task.
    grunt.loadNpmTasks('grunt-processhtml');

    // Default task(s).
    //grunt.registerTask('default', ['uglify']);
//    grunt.registerTask('default', ['cssmin']);
    grunt.registerTask('default', ['processhtml']);
};