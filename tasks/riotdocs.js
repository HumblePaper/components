var fs = require('fs');
var parse = require('comment-parser');
var swig  = require('swig');


// console.log("files");

var Grunt;

var pages = [];

var parseTags = function(tags){
	var obj = {};

	tags.forEach(function(tag){
		switch (tag.tag) {
			case "page"		  :	obj.name = tag.name;
						  		break;
			case "description": obj.description = tag.description;
						  		break;
			case "demo"		  :	obj.demo = tag.name;
						 		break;
			case "example"	  : obj.example = {};
								obj.example.description = tag.description;
								obj.example.name = tag.name;
								break;
		}
	});		

	return obj;
};

var addPages = function(pageTags, filename){
	var page = parseTags(pageTags);
	page.tags = pageTags;
	page.filename = filename;
   	
   	// Grunt.log.writeln('pages', pageTags);


	pages.push(page);
    Grunt.log.writeln('pages', pages);

};

var renderHtml = function(callback){
	var destination = Grunt.config('riotdocs').run.destination;
	var count = 0;

	var updateCount = function(){
		count++;
		if(count == (pages.length + 1)){
			callback();
		}
	};


	var indexRenderedTemplate  = swig.renderFile('doctemplates/index.html', {
	    pages:pages
	});
    // Grunt.log.writeln('indexTemplate', destination, indexRenderedTemplate);
    fs.writeFile(destination+'/index.html', indexRenderedTemplate, updateCount);

    var renderPage = function(page){
    	var pageRenderedTemplate  = swig.renderFile('doctemplates/page.html', {
	    	page:page
		});
    	
    	fs.writeFile(destination+'/'+page.name+'.html', pageRenderedTemplate, updateCount);
    	// Grunt.log.writeln('tags ', page.tags);

    };

    pages.forEach(renderPage);
};

var runRiotConfig = function(fileList, callback){
	
	 
	var count = 0;

	var updateCount = function(){
		count++;
		if(count == fileList.length){
			renderHtml(callback);
		}
	};

	var ParsedCallback = function(err, fileDetaiils, filename){
       Grunt.log.writeln('fileDetaiils', fileDetaiils, err);
       addPages(fileDetaiils[0].tags, filename);
	   updateCount();
	};

	fileList.forEach(function(file){
		parse.file(file, function(err, fileDetaiils){
			ParsedCallback(err, fileDetaiils, file);
		});

	});
};

module.exports = function(grunt) {

	Grunt = grunt;

    // do some stuff with `grunt`
    grunt.registerMultiTask('riotdocs', 'Generates RIOT Docs', function() {
    	var done = this.async();
    	switch (this.target) {
            case "run":
            	var source = grunt.config('riotdocs').run.source;
            	// grunt.log.writeln('Starting up the riotdocs run task! with source =', source);
            	var fileList = grunt.file.expand(this.data.files, this.data.files.src)
            	// grunt.log.writeln('fileList', fileList);
     			
     			runRiotConfig(fileList, function(){
     				done.apply();
     			});

                break;
        }

     // 	
    });
    

};