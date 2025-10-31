module.exports = function (grunt) {
  // ---------- Load plugins ----------
  grunt.loadNpmTasks('grunt-dart-sass');
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Optional: PostCSS (only if installed)
  try { grunt.loadNpmTasks('grunt-postcss'); } catch (e) {}

  grunt.renameTask('dart-sass', 'sass');

  // Optional: safely load autoprefixer (ESM-aware) if present
	let postcssProcessors = [];
	try {
	const ap = require('autoprefixer');
	const autoprefixer = (ap && ap.default) ? ap.default : ap; // ESM or CJS
	if (typeof autoprefixer === 'function') {
		postcssProcessors = [autoprefixer()];
	}
	} catch (e) {
	// autoprefixer not installed; leave processors empty
	}
  // ---------- Config ----------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JS: minify with source maps
    terser: {
      build: {
        options: { sourceMap: true },
        files: { 'assets/js/main.min.js': ['assets/js/*.js'] }
      },
      dev: {
        options: {
          sourceMap: true,
          compress: false,
          mangle: false,
          format: { beautify: true, comments: 'all' }
        },
        files: { 'assets/js/main.js': ['assets/js/*.js'] }
      }
    },

    // SCSS -> CSS (Dart Sass)
    sass: {
      dev: {
        options: {
          implementation: require('sass'),
          sourceMap: true,
          outputStyle: 'expanded'
        },
        files: { 'assets/css/main.css': 'assets/scss/main.scss' }
      },
      build: {
        options: {
          implementation: require('sass'),
          sourceMap: true,
          outputStyle: 'compressed'
        },
        files: { 'assets/css/main.min.css': 'assets/scss/main.scss' }
      }
    },

    // Optional: Autoprefix after Sass (only does anything if autoprefixer is installed)
    postcss: {
      options: {
        map: true,
        processors: postcssProcessors
      },
      dev:   { src: ['assets/css/main.css'] },
      build: { src: ['assets/css/main.min.css'] }
    },

    // Watch
    watch: {
      js: {
        files: ['assets/js/*.js'],
        tasks: ['terser:dev']
      },
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: postcssProcessors.length ? ['sass:dev', 'postcss:dev'] : ['sass:dev']
      }
    }
  });

  // ---------- Tasks (check actually loaded tasks) ----------
// ---------- Tasks (check actually loaded tasks) ----------
const hasPostCSSPlugin = grunt.task.exists('postcss');
const hasPostCSSProcessors = postcssProcessors.length > 0;
const usePostCSS = hasPostCSSPlugin && hasPostCSSProcessors;

const hasSass   = grunt.task.exists('sass');
const hasTerser = grunt.task.exists('terser');

if (!hasSass)   grunt.fail.warn('The "sass" task is missing. Did you install & load "grunt-dart-sass"?');
if (!hasTerser) grunt.fail.warn('The "terser" task is missing. Did you install & load "grunt-terser"?');

grunt.registerTask('build',
  usePostCSS ? ['terser:build', 'sass:build', 'postcss:build']
             : ['terser:build', 'sass:build']
);

grunt.registerTask('dev',
  usePostCSS ? ['terser:dev', 'sass:dev', 'postcss:dev']
             : ['terser:dev', 'sass:dev']
);

  // default: run dev once, then watch
  grunt.registerTask('default', ['dev', 'watch']);
};