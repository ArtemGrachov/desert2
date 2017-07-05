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
            navToggle = $('.nav-toggle'),
            navItems = $('.nav__item');

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
            console.log(navItems.length);
            for (let i = 0; i < navItems.length; i++) {
                $(navItems[i]).css('opacity', 0);
                setTimeout(function() {
                    $(navItems[i]).animate({ 'opacity': 1 }, 200);
                }, 200 * i)
            }

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
    let flag = true,
        toggleSpeed = 500;
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
            if (flag) {
                let _this = this,
                    slideActive = slider.find('.slider-item_active'),
                    slideNext = slideActive.next(),
                    slidePrev = slideActive.prev(),
                    slideNew;
                flag = false;

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

                slideActive.fadeOut(toggleSpeed, function() {
                    slideNew.fadeIn();
                    slideNew.addClass('slider-item_active');
                    slideNew.siblings()
                        .removeClass('slider-item_active');
                    flag = true;
                })
            }
        },
        smallSlide: function(slider, slideActive, direction = 'none') {
            // buttons
            let ctrlPrev = slider.find('.slider-ctrl-prev'),
                ctrlNext = slider.find('.slider-ctrl-next'),
                prevBgFirst = ctrlPrev.find('.slider-ctrl__bg').first(),
                prevBgSecond = ctrlPrev.find('.slider-ctrl__bg').last(),
                nextBgFirst = ctrlNext.find('.slider-ctrl__bg').first(),
                nextBgSecond = ctrlNext.find('.slider-ctrl__bg').last(),
                prevBgFirstImg = prevBgFirst.find('.slider-ctrl__img'),
                prevBgSecondImg = prevBgSecond.find('.slider-ctrl__img'),
                nextBgFirstImg = nextBgFirst.find('.slider-ctrl__img'),
                nextBgSecondImg = nextBgSecond.find('.slider-ctrl__img');

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


            // moving
            if (direction == 'none') {
                prevBgFirst.css({ top: 0 });
                prevBgFirstImg.attr('src', imgPrev);
                nextBgFirst.css({ top: 0 });
                nextBgFirstImg.attr('src', imgNext);
            } else {
                if (direction == 'next') {
                    // image
                    prevBgFirstImg.attr('src', imgPrev);
                    prevBgSecondImg.attr('src', imgAfterPrev);
                    nextBgFirstImg.attr('src', imgActive);
                    nextBgSecondImg.attr('src', imgNext);

                    // animation
                    prevBgFirst.css({ top: '-100%' });
                    prevBgSecond.css({ top: 0 });
                    nextBgFirst.css({ top: 0 });
                    nextBgSecond.css({ top: '100%' })

                    prevBgFirst.animate({ top: 0 }, toggleSpeed);
                    prevBgSecond.animate({ top: '100%' }, toggleSpeed);
                    nextBgFirst.animate({ top: '-100%' }, toggleSpeed);
                    nextBgSecond.animate({ top: 0 }, toggleSpeed);

                } else {
                    // image
                    prevBgFirstImg.attr('src', imgActive);
                    prevBgSecondImg.attr('src', imgPrev);
                    nextBgFirstImg.attr('src', imgNext);
                    nextBgSecondImg.attr('src', imgAfterNext);

                    // animation
                    prevBgFirst.css({ top: 0 });
                    prevBgSecond.css({ top: '100%' });
                    nextBgFirst.css({ top: '-100%' });
                    nextBgSecond.css({ top: 0 })

                    prevBgFirst.animate({ top: '-100%' }, toggleSpeed);
                    prevBgSecond.animate({ top: 0 }, toggleSpeed);
                    nextBgFirst.animate({ top: 0 }, toggleSpeed);
                    nextBgSecond.animate({ top: '100%' }, toggleSpeed);
                }
            }

        }
    }
})();

let blogMenu = function() {
    if ($('.blog').length) {
        let sidebar = $('.blog-sidebar'),
            blogNav = $('.blog-nav'),
            articles = $('.articles-item'),
            articlesTop = [],
            navPos = 0;

        for (let i = 0; i < articles.length; i++) {
            articlesTop.push($(articles[i]).offset().top);
        }

        $(document).on('scroll', function() {
            let scrollTop = $(window).scrollTop();

            for (let i = 0; i < articlesTop.length; i++) {
                if (articlesTop[i] < scrollTop + $(window).height() / 2) {
                    navPos = i;
                    $('.blog-nav__link_active').removeClass('blog-nav__link_active');
                    $('.blog-nav__link').eq(i).addClass('blog-nav__link_active');
                }
            }

            if (scrollTop > sidebar.offset().top) {
                blogNav.addClass('blog-nav_fixed');
            } else {
                blogNav.removeClass('blog-nav_fixed');
            }
        })

        $('.blog-nav__link').on('click', function(e) {
            e.preventDefault();
            let articleIndex = $(this).closest('.blog-nav__item').index(),
                articleTop = $('.articles-item').eq(articleIndex).offset().top;
            $('body, html').animate({ scrollTop: articleTop - 70 }, 1500);
        })
    }

}

$(document).ready(function() {
    authWindow();
    scrollBottom();
    toggleNav();
    drawCircleChart(110, 20);
    slider.init();
    blogMenu();
})