var authWindow = function() {
    let showGreet = $('.show-greet'),
        showAuth = $('.show-auth');


    showAuth.on('click', function(e) {
        e.preventDefault();
        $('.window').toggleClass('window_rotate');
        showAuth.toggleClass('btn-auth_disabled')
    })

    showGreet.on('click', function(e) {
        e.preventDefault();
        $('.window').toggleClass('window_rotate');
        showAuth.toggleClass('btn-auth_disabled')
    })
}
$(document).ready(function() {
    authWindow();
})