module.exports = function(grunt) {


  grunt.initConfig({
    riotdocs:{
      'run':{
        "source":"tags",
        "destination":"docs",
        files: {
                src: 'tags/*'
            }
      }
    },
    copy: {
    main: {
      expand: true,
      cwd:"docs",
      src: 'index.html',
      dest: '.'
    },
  },

  });
  // Default task(s).
  // 
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadTasks('tasks');
  grunt.registerTask('default', [ "riotdocs:run", "copy:main"]);


};