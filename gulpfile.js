'use strict';

var gulp=require('gulp');
var less=require('gulp-less');
var css=require('gulp-cssnano');
var js=require('gulp-concat');
var browserSync=require('browser-sync').create();
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');

// 小任务
gulp.task('hello',function(){
	console.log('hello how are you');
});

// 复制
gulp.task('copy',function(){
	gulp.src('src/test.html')
	.pipe(gulp.dest('dist/'));
});

// less转换为css并压缩
gulp.task('less',function(){
	gulp.src('src/less/*.less')
	.pipe(less())
	.pipe(css())
	.pipe(gulp.dest('dist/css/'));
});

// js合并
gulp.task('js',function(){
	gulp.src('src/js/*.js')
	.pipe(js('all.min.js'))
	.pipe(gulp.dest('dist/js/'));
});

// 监视
gulp.task('watch',function(){
	gulp.watch('src/*.html',['copy']);
	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/js/*.js',['js']);
});


//browsersynvc
gulp.task('sync',function(){
	browserSync.init({
		server:{
			baseDir:'./'
		}
	});
});


//图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.stream());
});

//js混淆
gulp.task('uglify',function(){
	gulp.src('src/js/*.js')
		.pipe(js('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'))
		.pipe(browserSync.stream());
});

//less编译压缩合并
gulp.task('doless',function(){
	gulp.src(['src/less/*.less','!src/less/_*.less'])//数组  非
		.pipe(less())
		.pipe(css())
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

//html复制压缩
gulp.task('htmlmin',function(){
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace:true,
			removeComments:true,
			removeAttributeQuotes:true,
			collapseBooleanAttributes:true,
			removeEmptyAttributes:true,
			removeScriptTypeAttributes:true,
			removeLinkTypeAttributes:true,
		}))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

//同步更新
gulp.task('serve',function(){
	browserSync.init({
		server:{
			baseDir:'./dist/',
		},
		port:8080,
	});
	gulp.watch('src/*.html',['htmlmin']);
	gulp.watch('src/less/*.less',['less']);
	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/images/*.*',['image']);
});