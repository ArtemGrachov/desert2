module.exports = function() {
    $.gulp.task('fonts', function() {
        return $.gulp.src($.cfg.app + 'fonts/**/*')
            .pipe($.gulp.dest($.cfg.dist + 'fonts/'))
    })
}