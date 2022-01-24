$('.slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    useCSS: true,
    cssEase: 'ease-in-out',
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow:' <span class="priv_arrow"><img src="./images/brand-slider/arrow-left.svg"/></span>',
    nextArrow:' <span class="next_arrow"><img src="./images/brand-slider/arrow-right.svg"/></span>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
