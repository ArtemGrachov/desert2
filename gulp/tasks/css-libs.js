module.exports = function() {
    $.gulp.task('css-libs', function() {
        return $.gulp.src($.path.cssLibs)
            .pipe($.gp.concat('libs.min.css'))
            .pipe($.gp.csso())
            .pipe($.gulp.dest($.cfg.dist + '/css'))
    })
}