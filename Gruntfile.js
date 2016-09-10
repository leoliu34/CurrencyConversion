module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: ['src/**/*.js'],
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
  		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
  	grunt.loadNpmTasks('grunt-contrib-jshint');
  	grunt.loadNpmTasks('grunt-contrib-watch');
  	grunt.loadNpmTasks('grunt-contrib-concat');
  	grunt.loadNpmTasks('grunt-contrib-sass');
  	grunt.loadNpmTasks('grunt-contrib-copy');

  	grunt.registerTask('default', ['jshint', 'copy', 'sass', 'concat', 'uglify']);
};