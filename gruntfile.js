module.exports = function(grunt){

   grunt.initConfig({

	   pgk: grunt.file.readJSON('package.json'),
	   uglify: {
		   build : {
			   src: 'assets/js/*.js',
			   dest: 'main.js',
		   },
		   dev : {
			   options : {
				   beautify: true,
				   mangle: false,
				   compress: false,
				   preserveComments: 'all'
			   },
			   src: 'assets/js/*.js',
			   dest: 'assets/js/main.js'
		   }
	   },
	   watch : {
		   js : {
			   files: ['src/js/*.js'],
			   tasks: ['uglify:dev']
		   },
		   css : {
			   files: ['assets/scss/*.scss'],
			   tasks: ['sass:dev']
		   }
	   },
	   sass : {
		   dev : {
			   options : {
				   outputStyle: 'expanded'
			   },
			   files : {
				   'assets/css/main.css' : 'assets/scss/main.scss'
			   }
		   },
		   build : {
			   options: {
				   outputStyle: 'compressed'
			   },
			   files : {
				   'assets/css/main.css' : 'assets/scss/main.scss'
			   }
		   }
	   }
   });

   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-sass');

   grunt.registerTask('default', ['uglify:build']);
   grunt.registerTask('build', ['uglify:build', 'sass:build']);
   grunt.registerTask('dev', ['uglify:dev', 'sass:dev']);
}
