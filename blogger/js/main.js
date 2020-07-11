const responsive = {
  0: { items: 1 },
  320: { items: 1 },
  560: { items: 2 },
  960: { items: 3 },
  1200: { items: 4 },
};

$(document).ready(function () {
  $nav = $(".nav");
  $toggleCollapse = $(".toggle-collapse");

  // Click event on toggle menu
  $toggleCollapse.click(function () {
    $nav.toggleClass("collapse");
  });

  // Owl carousel for blog
  $(".owl-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    nav: true,
    navText: [$(".owl-nav .owl-nav-prev"), $(".owl-nav .owl-nav-next")],
    responsive: responsive,
  });

  //   CLick to scroll top
  $(".move-up span").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  //   AOS instance
  AOS.init();
});
