module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: [
					'src/**/*.js',
					'!src/**/*spec.js'],
				dest: 'app/<%= pkg.name %>.js',
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'app/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint: {
	    	// define the files to lint
	    	files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
	  		// configure JSHint
	  		options: {
	    	// more options here if you want to override JSHint defaults
	    		globals: {
	      			console: true,
	      			module: true,
	    		},
	    		esversion: 6
	  		}
		},
		watch: {
      		files: ['<%= jshint.files %>'],
      		tasks: ['jshint']
    	},
    	sass: {                              // Task
    		dist: {                            // Target
      			files: [{                         // Dictionary of files
        			expand: true,
        			cwd: 'src/scss/',
        			src: ['*.scss'],
        			dest: 'app/',
        			ext: '.css'
      			}]
    		}
  		},
  		copy: {
  			main: {
  				files: [
  				{expand: true, flatten: true, src: ['src/templates/*'], dest: 'app/templates/', filter: 'isFile'}
  				]
  			}
  		},
  		karma: {  
  			unit: {
  				options: {
  					frameworks: ['jasmine'],
  					singleRun: false,
  					browsers: ['PhantomJS'],
  					files: [
  					'node_modules/angular/angular.js',
  					'node_modules/angular-mocks/angular-mocks.js',
  					'app/homedepotconvert.js',
  					'src/tests/*.js'
  					]
  				}
  			}
  		},
  		ngdocs: {
        options: {
          dest: 'docs',
          scripts: ['../node_modules/angular/angular.js',
                    '../node_modules/angular-animate/angular-animate.js',
                    '../node_modules/angular-aria/angular-aria.js',
                    '../node_modules/angular-material/angular-material.js'],
          title: 'Currency Conversion Documentation',
          html5Mode: false
        },
  			api: {
          src: ['src/scripts/*.js'],
          title: 'API Documentation'
        }
  		},
      clean: ['docs','app'],
      connect: {
        options: {
          port: 6789,
          keepalive: true
        },
        server: {}
      }
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['clean', 'jshint', 'copy', 'sass', 'concat', 'uglify', 'ngdocs', 'connect']);
	grunt.registerTask('test', ['clean', 'jshint', 'copy', 'sass', 'concat', 'uglify', 'ngdocs', 'karma']);
};