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
        showAuth.toggleClass('btn-auth_disabled');
        $('.input-error').remove();

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
                </svg>
                <div class="chart__name">${chartName}</div>
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

let blogMenu = (function() {
    return {
        init: function() {
            let _this = this;

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
                        if (articlesTop[i] < scrollTop + $(window).height() / 3) {
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


                $('.blog-nav__toggle').on('click', function() {
                    _this.activeMenu();
                })
            }
        },
        activeMenu: function() {
            let navMenu = $('.blog-nav'),
                body = $('body'),
                speed = 500;

            if (navMenu.hasClass('blog-nav_active')) {
                navMenu.animate({
                    'left': '-100%'
                }, speed, function() {
                    navMenu.removeClass('blog-nav_active');
                    navMenu.css('left', '')
                });
            } else {
                navMenu.addClass('blog-nav_active');
                navMenu.animate({
                    'left': '0'
                }, speed);
            }
        }
    }
})();

let formValidation = (function() {
    return {
        init: function() {
            let _this = this;

            $('input').focusout(function() {
                let $this = $(this);
                if (_this.checkInput(this)) {
                    ($this).removeClass('error');
                } else {
                    $this.addClass('error');
                }
            })
            $('textarea').focusout(function() {
                let $this = $(this);
                if (_this.checkInput(this)) {
                    ($this).removeClass('error');
                } else {
                    $this.addClass('error');
                }
            })
        },
        checkInput: function(input) {
            let $input = $(input),
                $inputText = $input.val();

            if ($input.is('textarea')) {
                if ($inputText.length > 0) return true
                else return false;
            }

            switch ($input.attr('type')) {
                case 'text':
                case 'password':
                    if ($inputText.length > 0) return true
                    else return false;
                case 'email':
                    if (validateEmail($inputText)) return true
                    else return false;
                default:
                    return true;
            }
        }
    }
})()

let controlForm = (function() {
    return {
        init: function() {
            let $form = $('form');

            if ($form.length) {
                $('#reset').on('click', function(e) {
                    e.preventDefault();
                    let $this = $(this),
                        $form = $this.closest('form');
                    $form[0].reset();
                    $form.find('.input-error').remove();
                    $form.find('input').removeClass('error');
                    $form.find('textarea').removeClass('error');
                })
            }
        }
    }
})();

let feedBack = (function() {
    return {
        init: function() {
            let _this = this,
                $feedbackForm = $('.feedback_window');
            if ($feedbackForm.length) {
                $('#send_feedback').on('click', function(e) {
                    e.preventDefault();
                    $feedbackForm.find('.input-error').remove();
                    if (_this.checkName($feedbackForm) && _this.checkEmail($feedbackForm) && _this.checkMessage($feedbackForm)) _this.sendMessage();
                })
            }
        },
        checkName: function(form) {
            let name = form.find('input[name="name"]'),
                regNumbers = /\d/;
            if (name.val().length > 0 &&
                regNumbers.exec(name.val()) === null) {
                return true;
            } else {
                inputError('Введите корректное имя!', name);
                return false;
            }
        },
        checkEmail: function(form) {
            let email = form.find('input[name="email"]');
            if (validateEmail(email.val())) {
                return true;
            } else {
                inputError('Введите корректный Email!', email);
                return false;
            }
        },
        checkMessage: function(form) {
            let msg = form.find('textarea[name="message"]'),
                badWords = ['aaa', 'bbb', 'ccc'];
            if (msg.val().length > 0) {
                for (i in badWords) {
                    if (msg.val().indexOf(badWords[i]) > -1) {
                        inputError('Введите корректный текст!', msg);
                        return false;
                    }
                }
                return true;
            } else {
                inputError('Введите текст!', msg);
                return false;
            }
        },
        sendMessage: function() {
            alertWindow('Сообщение отправлено');
            // here should be server request
        }
    }
})();

let checkLogin = (function() {
    return {
        init: function() {
            let _this = this;
            if ($('input[name="login"').length) {
                $('#login').on('click', function(e) {
                    e.preventDefault();
                    $('.input-error').remove();
                    if (_this.checkLogin() && _this.checkPassword() && _this.checkRobot()) _this.login();
                })
            }
        },
        checkLogin: function() {
            let login = $('input[name="login"]');
            if (login.val().length > 0) {
                return true;
            } else {
                inputError('Введите логин!', login);
                return false
            }
        },
        checkPassword: function() {
            let password = $('input[name="password"]');
            if (password.val().length > 0) {
                return true;
            } else {
                inputError('Введите пароль!', password);
                return false;
            }
        },
        checkRobot: function() {
            let humanCheck = $('#checkHuman'),
                humanRadio = $('#isHuman');

            if (humanCheck.is(':checked') && humanRadio.is(':checked')) {
                return true;
            } else {
                alertWindow('Подтвердите, что вы человек!');
                return false;
            }
        },
        login: function() {
            alertWindow('Добро пожаловать!');
            // here should be authorization
        }
    }
})();

let alertWindow = function(message) {
    $('body').append(`<div class="alert-window" style="display: none"><div class="alert-window__message">${message}</div><a class="btn" href="#" id="alert-window-close">Закрыть</a></div>`);
    $('.alert-window').fadeIn();
    $('#alert-window-close').on('click', function(e) {
        e.preventDefault();
        let $alert = $(this).closest('.alert-window');
        $alert.fadeOut(300, function() {
            $('.alert-window').remove();
        });
    })
}

let inputError = function(errorText, element) {
    let err = $(`<div class="input-error">${errorText}</div>`).insertAfter(element);
    err.css({ 'top': element.offset().top, 'left': element.offset().left });
}

let validateEmail = function(email) {
    if (email.length > 0 &&
        email.indexOf('@') > 0 &&
        email.indexOf('.') > email.indexOf('@') + 1 &&
        email.lastIndexOf('.') < email.length - 1) {
        return true
    } else {
        return false;
    }
}

let preloader = (function() {
    return {
        init: function() {
            let _this = this,
                imgList = [];
            $('*').each(function() {
                let $this = $(this),
                    background = $this.css('background-image'),
                    img = $this.is('img');

                if (background != 'none') {
                    imgList.push(
                        background.replace('url("', '')
                        .replace('")', '')
                    );

                    if (img) {
                        imgList.push($this.attr('src'));
                    }
                }
            })

            let percents = 1;
            for (i in imgList) {
                let image = $('<img>', {
                    attr: {
                        src: imgList[i]
                    }
                })

                image.on('load', function() {
                    _this.setPercents(imgList.length, percents);
                    percents++;
                })
            }
        },
        setPercents: function(total, current) {
            let percent = Math.ceil(current / total * 100),
                $preloader = $('.preloader');
            $preloader.find('.preloader__info').text(`${percent}%`);
            if (percent >= 100) {
                $preloader.fadeOut();
            }
        }
    }
})();

let parallax = (function() {
    return {
        init: function() {
            _this = this;
            if ($('header').length) {
                _this.image($('header'));
                $(window).on('scroll', function() {
                    _this.image($('header'));
                })
            }
            if ($('.works-body').length) {
                _this.image($('.works-body'));
                $(window).on('scroll', function() {
                    _this.image($('.works-body'));
                })
            }
        },
        image: function(block) {
            let scrollTop = $(window).scrollTop(),
                coords = `left ${scrollTop / 50}px`;
            block.css('background-position', coords);
        }
    }
})();

let aboutMap = function() {
    if ($('#map').length) {
        let mapCenter = new google.maps.LatLng(48.69870431365383, 26.572585701942444),
            mapOptions = {
                center: mapCenter,
                zoom: 18,
                scrollwheel: false,
                disableDefaultUI: true,
                styles: [
                    { elementType: 'all', stylers: [{ "hue": "#cd8920" }] }
                ]
            }

        let map = new google.maps.Map(document.getElementById("map"), mapOptions),
            markerCenter = new google.maps.LatLng(48.698314844389024, 26.57563805580139),
            marker = new google.maps.Marker({
                position: markerCenter,
                icon: {
                    url: 'img/misc/map_marker.svg',
                    scaledSize: new google.maps.Size(42, 56),
                }
            });
        marker.setMap(map);
    }
};

$(document).ready(function() {
    preloader.init();
    authWindow();
    scrollBottom();
    toggleNav();
    aboutMap();
    drawCircleChart(110, 20);
    formValidation.init();
    parallax.init();
    slider.init();
    blogMenu.init();
    controlForm.init();
    feedBack.init();
    checkLogin.init();
})