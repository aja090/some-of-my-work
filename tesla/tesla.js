$(".js-sidebar--li").click(function (e) {
    e.preventDefault();
    var target = $(this).data("target");

    $(".js-sidebar--li").removeClass("active");
    $(".js-tab-slider").removeClass("active");

    $(this).addClass("active");
    $(".js-tab-slider#" + target).addClass("active");

});

$(".js-menu").click( function (e) {
    e.preventDefault();

    $(".js-menu--modal").toggleClass("active");

});