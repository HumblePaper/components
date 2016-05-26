module.exports = function(grunt) {

  grunt.loadNpmTasks('documentjs');
  grunt.initConfig({
    documentjs: {
      "sites": {
        "styles": {
            "glob": "tags/**/*.{tag,md}",
            "dest": "styleguide"
        }
    }
    }
  });
  // Default task(s).
  grunt.registerTask('default', ['documentjs']);

};