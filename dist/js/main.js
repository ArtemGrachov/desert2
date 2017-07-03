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
                $(this).find('.slider-item').first()
                    .addClass('slider-item_active');
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
                slideNew;

            if (!slideNext.length) slideNext = slider
                .find('.slider-item')
                .first();
            if (!slidePrev.length) slidePrev = slider
                .find('.slider-item')
                .last();

            if (direction == 'prev') {
                slideNew = slidePrev;
            } else {
                slideNew = slideNext;
            }
            _this.smallSlide(slider, slideActive, direction);

            slideActive.fadeOut(300, function() {
                slideNew.fadeIn();
                slideNew.addClass('slider-item_active');
                slideNew.siblings()
                    .removeClass('slider-item_active');

            })
        },
        smallSlide: function(slider, activeSlide, direction = 'none') {
            let slideNext = activeSlide.next(),
                slidePrev = activeSlide.prev();
            if (!slideNext.length) slideNext = slider
                .find('.slider-item')
                .first();
            if (!slidePrev.length) slidePrev = slider
                .find('.slider-item')
                .last();

            let slideAfterNext = slideNext.next(),
                slideAfterPrev = slidePrev.prev();
            if (!slideAfterNext.length) slideAfterNext = slider
                .find('.slider-item')
                .first();
            if (!slideAfterPrev.length) slideAfterPrev = slider
                .find('.slider-item')
                .last();

            let ctrlPrevBgBlock = slider.find('.slider-ctrl-prev')
                .find('.slider-ctrl-bg-block'),
                ctrlNextBgBlock = slider.find('.slider-ctrl-next')
                .find('.slider-ctrl-bg-block'),
                ctrlPrevFirst = slider.find('.slider-ctrl-prev')
                .find('.slider-ctrl__bg_first'),
                ctrlPrevSecond = slider.find('.slider-ctrl-prev')
                .find('.slider-ctrl__bg_second'),
                ctrlNextFirst = slider.find('.slider-ctrl-next')
                .find('.slider-ctrl__bg_first'),
                ctrlNextSecond = slider.find('.slider-ctrl-next')
                .find('.slider-ctrl__bg_second');

            ctrlPrevFirst.css(
                'background-image', `url(${slidePrev.find('.slider__pic').attr('src')})`
            )
            ctrlPrevSecond.css(
                'background-image', `url(${slideAfterPrev.find('.slider__pic').attr('src')})`
            )
            ctrlNextFirst.css(
                'background-image', `url(${slideNext.find('.slider__pic').attr('src')})`
            )
            ctrlNextSecond.css(
                'background-image', `url(${slideAfterNext.find('.slider__pic').attr('src')})`
            )

            if (direction != 'none') {
                if (direction == 'next') {
                    ctrlPrevBgBlock.css({ top: '-100%' });
                    ctrlNextBgBlock.css({ top: 0 });

                    ctrlPrevBgBlock.animate({ top: 0 }, 1000);
                    ctrlNextBgBlock.animate({ top: '-100%' }, 1000);
                } else {
                    ctrlPrevBgBlock.css({ top: 0 });
                    ctrlNextBgBlock.css({ top: '-100%' });

                    ctrlPrevBgBlock.animate({ top: '-100%' }, 1000);
                    ctrlNextBgBlock.animate({ top: 0 }, 1000);
                }
            }

        }
    }
})();

$(document).ready(function() {
    authWindow();
    scrollBottom();
    toggleNav();
    drawCircleChart(110, 20);
    slider.init();
})