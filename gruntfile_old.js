'use strict';

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css'],
		mochaTests: ['app/tests/**/*.js']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientViews: {
				files: watchFiles.clientViews,
				options: {
					livereload: true,
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientCSS: {
				files: watchFiles.clientCSS,
				tasks: ['csslint'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc',
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		uglify: {
			production: {
				options: {
					mangle: false
				},
				files: {
					'public/dist/application.min.js': 'public/dist/application.js'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/css/vendor.min.css': '<%= vendorCSSFiles %>',
					'public/dist/css/application.min.css': '<%= applicationCSSFiles %>'

				}
			}
		},
		concat: {
			production: {
				options: {
					stripBanners: true
				},
				files: {
					'public/dist/vendor.min.js': '<%= vendorJavaScriptFiles %>'
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 1337,
					'web-host': 'localhost',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		ngAnnotate: {
			production: {
				files: {
					'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
				}
			}
		},
		ngtemplates: {
			options: {
				htmlmin: {
					collapseWhitespace: true,
					removeComments: true
				},
				url: function (url) {
					return url.replace('public', 'assets');
				},
				prefix: '/'
			},
			'dblApp': {
				src: 'public/modules/**/**.html',
				dest: 'public/dist/templates.js'
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			},
			build: {
				NODE_ENV: 'build'
			},
			secure: {
				NODE_ENV: 'secure'
			}
		},
		copy: {
			main: {
				files: [
					// flattens results to a single level
					{expand: true, flatten: true, src: ['public/lib/bootstrap/fonts/*'], dest: 'public/dist/fonts/'},
					{expand: true, flatten: true, src: ['public/lib/fontawesome/fonts/*'], dest: 'public/dist/fonts/'},
					{expand: true, flatten: true, src: ['public/modules/core/css/patterns/*'], dest: 'public/dist/css/patterns/'},
					{expand: true, cwd: 'public/modules/core/img', src: ['**/*'], dest: 'public/dist/img'}
				],
			},
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		require('./config/init')();
		var config = require('./config/config');
		grunt.config.set('vendorJavaScriptFiles', config.assets.lib.js);
		grunt.config.set('vendorCSSFiles', config.assets.lib.css);
		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint'/*, 'csslint'*/]);

	// Build task(s).
	grunt.registerTask('build', ['env:build', 'lint', 'loadConfig', 'ngAnnotate','ngtemplates', 'uglify', 'cssmin','concat','copy']);

	// Test task.
	grunt.registerTask('test', ['env:test', 'lint', 'mochaTest', 'karma:unit']);
};
