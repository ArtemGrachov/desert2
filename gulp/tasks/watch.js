module.exports = function() {
    $.gulp.task('watch', function() {
        $.gulp.watch($.cfg.app + 'sass/**/*.scss', ['sass', $.browserSync.reload]);
        $.gulp.watch($.cfg.app + 'pug/**/*.pug', ['pug', $.browserSync.reload]);
        $.gulp.watch($.cfg.app + 'js/**/*.js', ['scripts', $.browserSync.reload]);
    })
}