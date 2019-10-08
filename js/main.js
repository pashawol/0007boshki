//= components/slick.js

$(document).ready(function () {




    $(".fancybox").fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 600,
        'speedOut': 200,
        'overlayShow': false
    });

    $('.js-show-menu').on('click', function (e) {
        e.preventDefault();
        $('.mask').addClass('active');
        $('.menu').addClass('opened');
        $('body').addClass('fixed')
    });


    $('.js-hide-menu').on('click', function (e) {
        e.preventDefault();
        $('.mask').removeClass('active');
        $('.menu').removeClass('opened');
        $('body').removeClass('fixed');
    });

    $('.mask').on('click', function () {
        $(this).removeClass('active');
        $('.menu').removeClass('opened');
        $('body').removeClass('fixed');
    });

    $('.js-open-popup').on('click', function (e) {
        e.preventDefault();
        var target = $(this).data('target');

        $(target).addClass('opened');

        setTimeout(function () {
            $('.js-name').focus();
        }, 200);
        console.log(target);
    });


   //$('.js-phone').mask('+7 (999) 999-99-99'), { placeholder: '+7 (___) ___-__-__'	};

		// Маска 
		//$(".js-phone").attr("pattern","[+]7[ (][0-9]{3}[) ][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask({"mask": "+7(999)999-99-99"});
		


    $('.js-popup').on('click', function () {
        $(this).removeClass('opened');
    });

    $('.js-popup-content').on('click', function (e) {
        e.stopPropagation();
    });

    $('.js-close-popup').on('click', function () {
        $('.js-popup').removeClass('opened');
    });


    $('.js-page-nav a ').on('click', function (e) {
        e.preventDefault();
        var id = $(this).data('target'),
            currentBlockOffset = $(id).offset().top;
        $('.mask').removeClass('active');
        $('.menu').removeClass('opened');
        $('body').removeClass('fixed');
        $("html, body").animate({
            scrollTop: currentBlockOffset
        }, 500);
    });
    $('.js-show-video').fancybox({
        width: 640,
        height: 400,
        type: 'iframe'
    });

    $('.js-parallax').on('mousemove', function (e) {
        var amountMovedX = (e.pageX * -1 / 64);
        var amountMovedY = (e.pageY * -1 / 64);
        $('.js-mouse-parallax').css("transform", "translate(" + amountMovedX + "px," + amountMovedY + "px)");
    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav',
        appendArrows: '.arrow-wrapper',
        // adaptiveHeight: true
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider-for',
        // dots: true,
        // centerMode: true,
        focusOnSelect: true
      });
});
