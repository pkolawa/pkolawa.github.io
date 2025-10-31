module.exports = function (grunt) {
  const path = require('path');
  const sass = require('sass');

  const postcssLib = (() => {
    try {
      return require('postcss');
    } catch (e) {
      return null;
    }
  })();

  // ---------- Load plugins ----------
  grunt.loadNpmTasks('grunt-terser');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Optional: safely load autoprefixer (ESM-aware) if present
  let postcssProcessors = [];
  if (postcssLib) {
    try {
      const ap = require('autoprefixer');
      const autoprefixer = (ap && ap.default) ? ap.default : ap; // ESM or CJS
      if (typeof autoprefixer === 'function') {
        postcssProcessors = [autoprefixer()];
      }
    } catch (e) {
      // autoprefixer not installed; leave processors empty
    }
  }

  const jsSources = [
    'assets/js/**/*.js',
    '!assets/js/main.js',
    '!assets/js/main.min.js'
  ];
  const hasJsSources = () => grunt.file.expand({ filter: 'isFile' }, jsSources).length > 0;
  // ---------- Config ----------
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // JS: minify with source maps
    terser: {
      build: {
        options: { sourceMap: true },
        files: { 'assets/js/main.min.js': jsSources }
      },
      dev: {
        options: {
          sourceMap: true,
          compress: false,
          mangle: false,
          format: { beautify: true, comments: 'all' }
        },
        files: { 'assets/js/main.js': jsSources }
      }
    },

    // Sass -> CSS (modern Dart Sass API)
    sass: {
      dev: {
        options: {
          sourceMap: true,
          style: 'expanded'
        },
        files: { 'assets/css/main.css': 'assets/scss/main.scss' }
      },
      build: {
        options: {
          sourceMap: true,
          style: 'compressed'
        },
        files: { 'assets/css/main.min.css': 'assets/scss/main.scss' }
      }
    },

    // Optional: Autoprefix after Sass (only does anything if autoprefixer is installed)
    postcss: {
      options: {
        map: true
      },
      dev:   { src: ['assets/css/main.css'] },
      build: { src: ['assets/css/main.min.css'] }
    },

    // Watch
    watch: {
      js: {
        files: jsSources,
        tasks: ['js:dev']
      },
      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: postcssProcessors.length ? ['sass:dev', 'postcss:dev'] : ['sass:dev']
      }
    }
  });

  // ---------- Custom task implementations ----------
  grunt.registerMultiTask(
    'sass',
    'Compile Sass using the modern Dart Sass JS API.',
    function compileSassTask() {
      const done = this.async();
      const options = this.options({
        sourceMap: false,
        style: 'expanded',
        loadPaths: []
      });

      const style = options.style === 'compressed' ? 'compressed' : 'expanded';
      const includeSources = options.sourceMapIncludeSources !== false;
      const loadPaths = Array.isArray(options.loadPaths) ? options.loadPaths : [];

      (async () => {
        for (const file of this.files) {
          const src = file.src.find((filepath) => {
            if (!grunt.file.exists(filepath)) return false;
            return path.basename(filepath)[0] !== '_';
          });

          if (!src) {
            grunt.log.warn(`No Sass entry file found for destination "${file.dest}".`);
            continue;
          }

          const result = await sass.compileAsync(src, {
            style,
            sourceMap: Boolean(options.sourceMap),
            sourceMapIncludeSources: includeSources,
            loadPaths
          });

          grunt.file.write(file.dest, result.css);
          grunt.log.ok(`File ${file.dest} created.`);

          if (options.sourceMap && result.sourceMap) {
            const mapTarget = typeof options.sourceMap === 'string'
              ? options.sourceMap
              : `${file.dest}.map`;
            const mapContent = typeof result.sourceMap === 'string'
              ? result.sourceMap
              : JSON.stringify(result.sourceMap);
            grunt.file.write(mapTarget, mapContent);
            grunt.log.ok(`File ${mapTarget} created.`);
          }
        }
      })()
        .then(() => done())
        .catch((error) => {
          grunt.log.error(error);
          done(false);
        });
    }
  );

  grunt.registerMultiTask(
    'postcss',
    'Process CSS with PostCSS plugins.',
    function postcssTask() {
      const done = this.async();

      if (!postcssLib || !postcssProcessors.length) {
        grunt.log.ok('Skipping postcss task (no processors configured).');
        done();
        return;
      }

      const options = this.options({ map: true });
      const mapEnabled = Boolean(options.map);

      (async () => {
        for (const file of this.files) {
          const sources = file.src.filter((filepath) => {
            if (grunt.file.exists(filepath)) return true;
            grunt.log.warn(`Source file "${filepath}" not found.`);
            return false;
          });

          if (!sources.length) {
            continue;
          }

          for (const src of sources) {
            const destination = file.dest || src;
            const css = grunt.file.read(src);
            const result = await postcssLib(postcssProcessors).process(css, {
              from: src,
              to: destination,
              map: mapEnabled ? { inline: false, annotation: true } : false
            });

            grunt.file.write(destination, result.css);
            grunt.log.ok(`File ${destination} processed.`);

            if (mapEnabled && result.map) {
              const mapTarget = `${destination}.map`;
              grunt.file.write(mapTarget, result.map.toString());
              grunt.log.ok(`File ${mapTarget} created.`);
            }
          }
        }
      })()
        .then(() => done())
        .catch((error) => {
          grunt.log.error(error);
          done(false);
        });
    }
  );

  // ---------- Tasks (check actually loaded tasks) ----------
  const hasPostCSSPlugin = grunt.task.exists('postcss');
  const hasPostCSSProcessors = postcssProcessors.length > 0;
  const usePostCSS = hasPostCSSPlugin && hasPostCSSProcessors;

  const hasSass   = grunt.task.exists('sass');
  const hasTerser = grunt.task.exists('terser');

  if (!hasSass)   grunt.fail.warn('The "sass" task is missing. Check the custom Sass task registration.');
  if (!hasTerser) grunt.fail.warn('The "terser" task is missing. Did you install & load "grunt-terser"?');

  const runTerserIfSources = (target) => function terserMaybe() {
    if (!hasJsSources()) {
      grunt.log.ok(`Skipping terser:${target} (no JS sources matched).`);
      return;
    }
    grunt.task.run(`terser:${target}`);
  };

  grunt.registerTask('js:build', runTerserIfSources('build'));
  grunt.registerTask('js:dev', runTerserIfSources('dev'));

  const buildPipeline = usePostCSS
    ? ['js:build', 'sass:build', 'postcss:build']
    : ['js:build', 'sass:build'];

  const devPipeline = usePostCSS
    ? ['js:dev', 'sass:dev', 'postcss:dev']
    : ['js:dev', 'sass:dev'];

  grunt.registerTask('build', buildPipeline);
  grunt.registerTask('dev', devPipeline);

  // default: run dev once, then watch
  grunt.registerTask('default', ['dev', 'watch']);
};
