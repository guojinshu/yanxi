var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    gulp = require('gulp'),
    server = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat');
gulp.task('server', ['scss'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8000,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
})
gulp.task('scss', function() {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('src/css'))
})
gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', ['scss'])
})
gulp.task('default', ['server', 'watch'])