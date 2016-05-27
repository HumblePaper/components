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
    }
  });
  // Default task(s).
  // 
  
  
  grunt.loadTasks('tasks');
  grunt.registerTask('default', [ "riotdocs:run"]);


};