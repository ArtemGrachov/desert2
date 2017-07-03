let authWindow = function() {
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

let scrollBottom = function() {
    $('.view-toggle__btn_down').on('click', function(e) {
        e.preventDefault();
        let scrollPos = $('.header').height();
        $('body, html').animate({ scrollTop: scrollPos }, 1500);
    })
    $('.view-toggle__btn_up').on('click', function(e) {
        e.preventDefault();
        $('body, html').animate({ scrollTop: 0 }, 1500);
    })
}

let toggleNav = function() {
    $('.nav-toggle-btn').on('click', function(e) {
        e.preventDefault();
        let nav = $('.nav'),
            navToggle = $('.nav-toggle');

        if (nav.hasClass('nav_active')) {
            nav.fadeToggle(300, function() {
                nav.removeClass('nav_active');
            });
            navToggle.removeClass('nav-toggle_active');
        } else {
            nav.toggle(0, function() {
                nav.addClass('nav_active');
            });
            navToggle.addClass('nav-toggle_active');
        }
    })
}

let drawCircleChart = function(chartDiam, strokeWidth) {
    let charts = $('.chart'),
        chartRadius = (chartDiam - strokeWidth) / 2,
        charPi = (chartDiam - strokeWidth) * Math.PI;
    for (let i = 0; i < charts.length; i++) {
        let chartName = $(charts[i]).find('.chart__name').html(),
            chartValue = $(charts[i]).find('.chart__value').html(),
            chartPercentage = chartValue * charPi / 100,
            chartHTML = `
                <svg width="${chartDiam}" height="${chartDiam}">
                    <circle transform="rotate(-90)" r="${chartRadius}" cx="-50%" cy="50%" stroke-width="${strokeWidth}"/>
                    <circle transform="rotate(-90)" style="stroke-dasharray: ${chartPercentage }px ${charPi}px;" r="${chartRadius}" cx="-50%" cy="50%" stroke-width="${strokeWidth}"/>
                    <text x="50%" fill="currentColor" y="50%" text-anchor="middle" dominant-baseline="middle">${chartName}</text>
                </svg>
            `
        $(charts[i]).html(chartHTML);
    }
}

let slider = (function() {

    return {
        init: function() {
            let _this = this;

            $('.slider').each(function() {
                $(this).find('.slider-item').first().addClass('slider-item_active');
            });

            $('.slider-ctrl__link_prev').on('click', function(e) {
                e.preventDefault();
                let $this = $(this),
                    slider = $this.closest('.slider');
                _this.moveSlide(slider, 'prev');
            });

            $('.slider-ctrl__link_next').on('click', function(e) {
                e.preventDefault();
                let $this = $(this),
                    slider = $this.closest('.slider');
                _this.moveSlide(slider, 'next');
            });
        },
        moveSlide: function(slider, direction) {
            let _this = this,
                slideActive = slider.find('.slider-item_active'),
                slideNext = slideActive.next(),
                slidePrev = slideActive.prev(),
                sliderCtrlPrev = slider.find('.slider-ctrl-prev'),
                sliderCtrlNext = slider.find('.slider-ctrl-next'),
                slideNew;

            if (!slideNext.length) slideNext = slider.find('.slider-item').first();
            if (!slidePrev.length) slidePrev = slider.find('.slider-item').last();

            if (direction == 'prev') {
                slideNew = slidePrev;
            } else {
                slideNew = slideNext;
            }

            slideActive.fadeOut(300, function() {
                slideNew.fadeIn();
                slideNew.addClass('slider-item_active');
                slideNew.siblings().removeClass('slider-item_active');

            })
        }
    }

    // let sliderList = $('.slider-list'),
    //     activeSlide = $('.slider-item_active'),
    //     nextSlide = activeSlide.next(),
    //     prevSlide = activeSlide.prev(),
    //     ctrlPrev = $('.slider-ctrl-prev'),
    //     ctrlNext = $('.slider-ctrl-next'),
    //     newSlide;

    // if (!nextSlide.length) {
    //     nextSlide = sliderList.find('.slider-item').first();
    // }
    // if (!prevSlide.length) {
    //     prevSlide = sliderList.find('.slider-item').last();
    // }

    // if ($(this).parent().hasClass('slider-ctrl-prev')) {
    //     newSlide = prevSlide;
    // } else {
    //     newSlide = nextSlide;
    // }

    // newSlide.addClass('slider-item_active');
    // newSlide.siblings().removeClass('slider-item_active');

    // let newPrev = newSlide.prev(),
    //     newNext = newSlide.next();

    // if (!newNext.length) {
    //     newNext = sliderList.find('.slider-item').first();
    // }
    // if (!newPrev.length) {
    //     newPrev = sliderList.find('.slider-item').last();
    // }

    // let newPrevImg = newPrev.find('.slider__pic').attr('src'),
    //     newNextImg = newNext.find('.slider__pic').attr('src');
    // console.log(newPrevImg, newNextImg);
    // ctrlPrev.css('background-image', `url(${newPrevImg})`);
    // ctrlNext.css('background-image', `url(${newNextImg})`);


})();

$(document).ready(function() {
    authWindow();
    scrollBottom();
    toggleNav();
    drawCircleChart(110, 20);
    slider.init();
})