module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        CLIENT_DIR: '',
        uglify: {
            compile: {
                files: {
                    'public/js/app.min.js': ['index.js']
                }
            }
        },
        nodemon: {
            dev: {
                script: ['index.js']
            }
        },
        concurrent: {
            tasks: ['nodemon'],
            options: {
                logConcurrentOutput: true
            }
        },
    })

    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.registerTask('default', ['concurrent'])
    grunt.registerTask('minify', ['uglify'])
}
