const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('compile-sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream())

});

gulp.task();