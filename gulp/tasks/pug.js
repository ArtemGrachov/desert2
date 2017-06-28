module.exports = function() {
    $.gulp.task('pug', function() {
        return $.gulp.src($.cfg.app + 'pug/pages/**/*.pug')
            .pipe($.gp.pug())
            .pipe($.gp.htmlBeautify())
            .pipe($.gulp.dest($.cfg.dist))
    })
}