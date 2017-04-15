module.exports = function(grunt){

   grunt.initConfig({

	   pgk: grunt.file.readJSON('package.json'),
	   uglify: {
		   build : {
			   src: 'src/js/*.js',
			   dest: 'js/scripts.min.js',
		   },
		   dev : {
			   options : {
				   beautify: true,
				   mangle: false,
				   compress: false,
				   preserveComments: 'all'
			   },
			   src: 'src/js/*.js',
			   dest: 'js/scripts.min.js'
		   }
	   },
	   watch : {
		   js : {
			   files: ['src/js/*.js'],
			   tasks: ['uglify:dev']
		   },
		   css : {
			   files: ['src/scss/**/*.scss'],
			   tasks: ['sass:dev']
		   }
	   },
	   sass : {
		   dev : {
			   options : {
				   outputStyle: 'expanded'
			   },
			   files : {
				   'main.css' : 'scss/main.scss'
			   }
		   },
		   build : {
			   options: {
				   outputStyle: 'compressed'
			   },
			   files : {
				   'main.css' : 'scss/main.scss'
			   }
		   }
	   }
   });

   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-sass');

   grunt.registerTask('default', ['uglify:build']);
   grunt.registerTask('build', ['uglify:build']);
   grunt.registerTask('dev', ['uglify:dev', 'sass:dev']);
}
