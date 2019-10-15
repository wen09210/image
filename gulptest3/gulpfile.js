var gulp = require('gulp'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	image = require('gulp-image'),
	rename = require("gulp-rename"),
	htmlreplace = require('gulp-html-replace'),
	// minifyHTML = require('gulp-minify-html'),
	plumber = require('gulp-plumber'),
	webserver = require('gulp-webserver');
gulp.task('concat', function () {
	return gulp.src('./app/css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('./build/css/'));
});
gulp.task('concatjs', function () {
	return gulp.src(['./app/js/tether.min.js',
			'./app/js/jquery.min.js',
			'./app/js/jqueryUi.js',
			'./app/js/jqueryUiTouch.js',
			'./app/js/bootstrap.min.js',
			'./app/js/bootstrap-datepicker.js',
			'./app/js/main.js'
		])
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./build/js/'));
});
gulp.task('image', function () {
	gulp.src('./app/img/*')
		.pipe(image())
		.pipe(gulp.dest('./build/img/'));
});

gulp.task('minify-css', ['concat'], function () {
	return gulp.src('./build/css/all.css')
		.pipe(minifyCSS({
			keepBreaks: true,
		}))
		.pipe(rename(function (path) {
			path.basename += ".min";
			path.extname = ".css";
		}))
		.pipe(gulp.dest('./build/css/'));
});



gulp.task('html-replace', function () {
	var opts = {
		comments: false,
		spare: false,
		quotes: true
	};
	return gulp.src('./app/*.html')
		.pipe(htmlreplace({
			'css': 'css/all.min.css',
			'js': 'js/all.js'
		}))
		.pipe(gulp.dest('./build/'));
});
// webserver
gulp.task('webserver', function () {
	gulp.src('./app/')
		.pipe(webserver({
			port: 1234,
			livereload: true,
			directoryListing: false,
			open: true,
			fallback: 'index.html'
		}));
});
// 其它不編譯的物件
var objs = ['./app/source/**/**.*'];
gulp.task('others', function () {
	return gulp.src(objs)
		.pipe(plumber())
		.pipe(gulp.dest('./build/'));
});
gulp.task('default', ['html-replace', 'minify-css', 'concatjs', 'image','others']);
