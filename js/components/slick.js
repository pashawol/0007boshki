$(function () {

    "use strict";

    /**
     * Slick.js
     * Docs: https://github.com/kenwheeler/slick
     */

    var slider_1 = $(".js-products-slider");

    if (slider_1.length > 0) {
        slider_1.slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            //            autoplay: true,
            //            autoplaySpeed: 5000,
            swipeToSlide: true,
            arrows: true,

            responsive: [
                {
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 2
                    }
                            },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]

        });
    }

    var slider_2 = $(".js-product-slider");

    if (slider_2.length > 0) {
        slider_2.slick({
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            //            autoplay: true,
            //            autoplaySpeed: 5000,
            swipeToSlide: true,
            arrows: true,
            responsive: [
                {
                    breakpoint: 1150,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                    }
                            },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }





});
