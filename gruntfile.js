/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function(grunt) {

	'use strict';

	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['server.js', 'config/**/*.js', 'app/**/*.js'],
		clientViews: ['public/www/modules/**/views/**/*.html'],
		clientJS: ['public/www/modules/**/*.js'],
		clientLess: ['public/build/less/*.less', 'public/build/less/skins/*.less', 'public/www/js/app.js'],
		mochaTests: ['app/tests/**/*.js']
	};

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
					livereload: true
				}
			},
			clientJS: {
				files: watchFiles.clientJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			clientLess: {
				files: watchFiles.clientLess,
				tasks: ['less', 'uglify'],
				options: {
					livereload: true
				}
			}
		},

		// 'less'-task configuration
		// This task will compile all less files upon saving to create both AdminLTE.css and AdminLTE.min.css
		less: {
			// Development not compressed
			development: {
				options: {
					// Whether to compress or not
					compress: false
				},
				files: {
					// compilation.css  :  source.less
					'public/www/css/AdminLTE.css': 'public/build/less/AdminLTE.less',

					//Non minified skin files
					'public/www/css/skins/_all-skins.css': 'public/build/less/skins/_all-skins.less'
				}
			},

			// Production compresses version
			production: {
				options: {
					// Whether to compress or not
					compress: true
				},
				files: {
					// compilation.css  :  source.less
					'public/www/css/AdminLTE.min.css': 'public/build/less/AdminLTE.less',

					// Skins minified
					'public/www/css/skins/_all-skins.min.css': 'public/build/less/skins/_all-skins.less'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/www/app.min.css': '<%= applicationCSSFiles %>',
					'public/www/vendor.min.css': '<%= vendorCSSFiles %>'
				}
			}
		},

		// Uglify task info. Compress the js files.
		uglify: {
			options: {
				mangle: true,
				preserveComments: 'some'
			},
			my_target: {
				files: {
					'public/www/js/app.min.js': ['public/www/js/app.js']
				}
			}
		},

		// build the documentation files
		includes: {
			build: {
				src: ['*.html'], // Source files
				dest: 'public/documentation/', // Destination directory
				flatten: true,
				cwd: 'public/documentation/public/build',
				options: {
					silent: true,
					includePath: 'public/documentation/public/build/include'
				}
			}
		},

		// Optimize images
		image: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'public/build/img/',
					src: ['**/*.{png,jpg,gif,svg,jpeg}'],
					dest: 'public/www/img/'
				}]
			}
		},

		// Validate JS code
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			},
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Validate JS code
		jscs: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					config: '.jscsrc'
				}
			}
		},
		concat: {
			production: {
				options: {
					stripBanners: true
				},
				files: {
					'public/www/vendor.min.js': '<%= vendorJavaScriptFiles %>'
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
					hidden: []
				}
			}
		},
		ngAnnotate: {
			production: {
				files: {
					'public/www/js/app.js': '<%= applicationJavaScriptFiles %>'
				}
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
					{
						expand: true,
						flatten: true,
						src: ['public/lib/bootstrap/fonts/*'],
						dest: 'public/www/fonts/'
					}, {
						expand: true,
						flatten: true,
						src: ['public/lib/famfamfam-flags/dist/gif/*'],
						dest: 'public/www/img/flags/'
					}, {
						expand: true,
						flatten: true,
						src: ['public/lib/fontawesome/fonts/*'],
						dest: 'public/www/fonts/'
					}, {
						expand: true,
						flatten: true,
						src: ['public/www/modules/core/css/patterns/*'],
						dest: 'public/www/css/patterns/'
					}, {
						expand: true,
						cwd: 'public/www/modules/core/img',
						src: ['**/*'],
						dest: 'public/www/img'
					}
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
		},

		// Delete images in public/build directory
		// After compressing the images in the public/build/img dir, there is no need
		// for them
		clean: {
			build: ['public/build/img/*']
		}
	});

	// Load all grunt tasks

	// LESS Compiler
	grunt.loadNpmTasks('grunt-contrib-less');

	// Watch File Changes
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Compress JS Files
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Include Files Within HTML
	grunt.loadNpmTasks('grunt-includes');

	// Optimize images
	grunt.loadNpmTasks('grunt-image');

	// Validate JS code
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Delete not needed files
	grunt.loadNpmTasks('grunt-contrib-clean');

	// JSCS
	grunt.loadNpmTasks('grunt-jscs');

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		require('./config/init')();
		var config = require('./config/config');
		grunt.config.set('vendorJavaScriptFiles', config.assets.lib.js);
		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('vendorCSSFiles', config.assets.lib.css);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['jshint', 'jscs']);

	// Build task(s).
	grunt.registerTask('build', ['env:build', 'lint', 'loadConfig', 'ngAnnotate', 'less', 'image', 'uglify', 'cssmin',
		'concat', 'copy'
	]);

	// Test task.
	grunt.registerTask('test', ['env:test', 'lint', 'mochaTest'/*, 'karma:unit'*/]);
};
