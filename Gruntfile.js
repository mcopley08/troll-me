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

<<<<<<< HEAD
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-jade')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-shell')
=======
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-nodemon')
    grunt.loadNpmTasks('grunt-concurrent')
>>>>>>> workflow
    grunt.registerTask('default', ['concurrent'])
    grunt.registerTask('minify', ['uglify'])
}
