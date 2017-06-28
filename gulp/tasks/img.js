module.exports = function() {
    $.gulp.task('img', function() {
        return $.gulp.src($.cfg.app + 'img/**/*')
            .pipe($.gulp.dest($.cfg.dist + 'img/'))
    })
}