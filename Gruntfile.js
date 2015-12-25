module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			option: {
				stripBanners: true,
				banner: '/*| <%-pkg.name%>-<%-pkg.version%>.js <%- grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/test.js',
				dest: 'build/<%-pkg.name%>-<%-pkg.version%>.js.min.js'
			}
		},

		jshint:{
			build:[ 'Gruntfile.js', 'src/*.js'],
			options:{
				jshintrc: '.jshintrc'
			}
		},

		csslint:{
			options: {
			    csslintrc: '.csslintrc'
			},
			strict: {
			    options: {
			      csslintrc: '.csslintrc'
			    },
			    src: ['src/*.css']
			},
			lax: {
			    options: {
			      csslintrc: '.csslintrc'
			    },
			    src: ['src/*.css']
			}
		},

		//watch将监控src文件夹下所有js文件和css文件的变化，一旦变化，则立即执行jshint和uglify两个插件功能。
		watch:{
			build: {
				files:['src/*.js', 'src/*.css'],
				tasks: ['jshint','uglify','csslint'],
				option : {spawn: false}
			}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-jshint'); //JS语法检查  npm install grunt-contrib-jshint --save-dev
	grunt.loadNpmTasks('grunt-contrib-uglify'); //压缩JAVASCRIPT工具  npm install grunt-contrib-uglify --save-dev
	grunt.loadNpmTasks('grunt-contrib-csslint'); //CSS语法检查  npm install grunt-contrib-csslint --save-dev
	grunt.loadNpmTasks('grunt-contrib-watch'); //自动运行  npm install grunt-contrib-watch --save-dev  crt+c 退出watching

	grunt.registerTask('default', ['jshint','uglify','csslint', 'watch']);  // npm install grunt --save-dev
};