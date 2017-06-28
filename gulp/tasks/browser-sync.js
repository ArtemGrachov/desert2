module.exports = function() {
    $.gulp.task('browser-sync', function() {
        $.browserSync.init({
            server: {
                baseDir: $.cfg.dist
            }
        });
    })
}