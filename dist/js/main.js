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
                let $this = $(this);

                $this.find('.slider-item').first()
                    .addClass('slider-item_active');
                _this.smallSlide($this, $this.find('.slider-item_active'));
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
            _this.smallSlide(slider, slideNew, direction);

            slideActive.fadeOut(300, function() {
                slideNew.fadeIn();
                slideNew.addClass('slider-item_active');
                slideNew.siblings()
                    .removeClass('slider-item_active');

            })
        },
        smallSlide: function(slider, slideActive, direction = 'none') {
            // buttons
            let ctrlPrev = slider.find('.slider-ctrl-prev'),
                ctrlNext = slider.find('.slider-ctrl-next'),
                prevBgFirst = ctrlPrev.find('.slider-ctrl__bg').first(),
                prevBgSecond = ctrlPrev.find('.slider-ctrl__bg').last(),
                nextBgFirst = ctrlNext.find('.slider-ctrl__bg').first(),
                nextBgSecond = ctrlNext.find('.slider-ctrl__bg').last();

            // slides
            let slideNext = slideActive.next(),
                slidePrev = slideActive.prev();

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

            // images
            let imgActive = slideActive.find('.slider__pic').attr('src'),
                imgPrev = slidePrev.find('.slider__pic').attr('src'),
                imgAfterPrev = slideAfterPrev.find('.slider__pic').attr('src'),
                imgNext = slideNext.find('.slider__pic').attr('src'),
                imgAfterNext = slideAfterNext.find('.slider__pic').attr('src');

            // console.log(imgAfterPrev, imgPrev, imgActive, imgNext, imgAfterNext)

            // moving
            if (direction == 'none') {
                prevBgFirst.css({ top: 0 });
                prevBgFirst.css({ 'background-image': `url(${imgPrev})` });
                nextBgFirst.css({ top: 0 });
                nextBgFirst.css({ 'background-image': `url(${imgNext})` });
            } else {
                if (direction == 'next') {
                    // background-image
                    prevBgFirst.css({ 'background-image': `url(${imgPrev})` });
                    prevBgSecond.css({ 'background-image': `url(${imgAfterPrev})` });
                    nextBgFirst.css({ 'background-image': `url(${imgActive})` });
                    nextBgSecond.css({ 'background-image': `url(${imgNext})` });

                    // animation
                    prevBgFirst.css({ top: '-100%' });
                    prevBgSecond.css({ top: 0 });
                    nextBgFirst.css({ top: 0 });
                    nextBgSecond.css({ top: '100%' })

                    prevBgFirst.animate({ top: 0 }, 1000);
                    prevBgSecond.animate({ top: '100%' }, 1000);
                    nextBgFirst.animate({ top: '-100%' }, 1000);
                    nextBgSecond.animate({ top: 0 }, 1000);

                } else {
                    // background-image
                    prevBgFirst.css({ 'background-image': `url(${imgActive})` });
                    prevBgSecond.css({ 'background-image': `url(${imgPrev})` });
                    nextBgFirst.css({ 'background-image': `url(${imgNext})` });
                    nextBgSecond.css({ 'background-image': `url(${imgAfterNext})` });

                    // animation
                    prevBgFirst.css({ top: 0 });
                    prevBgSecond.css({ top: '100%' });
                    nextBgFirst.css({ top: '-100%' });
                    nextBgSecond.css({ top: 0 })

                    prevBgFirst.animate({ top: '-100%' }, 1000);
                    prevBgSecond.animate({ top: 0 }, 1000);
                    nextBgFirst.animate({ top: 0 }, 1000);
                    nextBgSecond.animate({ top: '100%' }, 1000);
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