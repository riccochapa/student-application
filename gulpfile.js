var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var wait = require('gulp-wait');

gulp.task('css', function() {
    gulp.src('public/**/*.css').pipe(livereload());
});

gulp.task('js', function() {
    gulp.src('public/**/*.js').pipe(livereload());
});

gulp.task('jade', function() {
    gulp.src('views/**/*.jade').pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch('public/**/*.css', ['css']);
    gulp.watch('public/**/*.js', ['js']);
    gulp.watch('views/**/*.jade', ['jade']);
});

gulp.task('start', function() {
    livereload.listen();

    nodemon({
        script: 'server.js', // file that starts server
        ext: 'js', // which files to restart server
        env: {
            'NODE_ENV': 'development'
        } // environment variables
    }).on('start', function() {
        gulp.src('server.js')
            .pipe(wait(500)) // prevent browser 'offline'
            .pipe(livereload());
    });

});

gulp.task('default', ['start', 'watch']);
